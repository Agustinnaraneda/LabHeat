const BotonIniciar = document.getElementById("iniciar");
const BotonDetener = document.getElementById("detener");
const BotonReiniciar = document.getElementById("reiniciar");
const BotonExportar = document.getElementById("Exportar");

const carruselMateriales = document.getElementById("carrusel-materiales");
let materialSeleccionado = "Metal";

carruselMateriales.addEventListener("click", function(e) {
  const tarjeta = e.target.closest(".material-card");
  if (!tarjeta) return;

  const material = tarjeta.dataset.material;
  if (!material) return;
  materialSeleccionado = material;

  carruselMateriales.querySelectorAll(".material-card").forEach(function(t) {
    if (t.dataset.material === material) {
      t.classList.add("active");
    } else {
      t.classList.remove("active");
    }
  });
});

const inputTempInicial = document.getElementById("temp-inicial");
const inputTempAmbiente = document.getElementById("temp-ambiente");
const spanTempActual = document.getElementById("temp-actual");
const spanTiempo = document.getElementById("tiempo");
let reloj = null; 
let tiempoTranscurrido = 0;
let datosSimulacion = []; 

const filtroMedia = new FiltroMediaMovil();

const ctx = document.getElementById("grafico-temperatura").getContext("2d");
const grafico = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "DS18B20 (Cruda)",
        data: [],
        borderColor: "red",
        borderWidth: 1.5,
        pointRadius: 2,
        tension: 0.1
      },
      {
        label: "Filtro Media Móvil",
        data: [],
        borderColor: "blue",
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.2
      }
    ]
  },
  options: {
    responsive: true,
    scales: {
      x: { title: { display: true, text: "Tiempo (s)" } },
      y: { title: { display: true, text: "Temperatura (°C)" } }
    }
  }
});

function pasoSimulacion() {
  tiempoTranscurrido = tiempoTranscurrido + 1; 

  const material = materialSeleccionado; 
  const t0 = Number(inputTempInicial.value); 
  const tAmb = Number(inputTempAmbiente.value);

  const tempIdeal = calcularTempIdeal(tiempoTranscurrido, t0, tAmb, material);
  const tempSensor = simularSensorDS(tempIdeal);
  const tempFiltrada = filtroMedia.aplicar(tempSensor);

  spanTiempo.textContent = tiempoTranscurrido;
  spanTempActual.textContent = tempSensor.toFixed(2);

  datosSimulacion.push({
    segundo: tiempoTranscurrido,
    ideal: tempIdeal.toFixed(3),
    cruda: tempSensor.toFixed(3),
    filtrada: tempFiltrada.toFixed(3)
  });

  if (grafico.data.labels.length >= 300) {
    grafico.data.labels.shift();
    grafico.data.datasets.forEach(dataset => dataset.data.shift());
  }

  grafico.data.labels.push(tiempoTranscurrido);
  grafico.data.datasets[0].data.push(tempSensor);
  grafico.data.datasets[1].data.push(tempFiltrada);
  grafico.update();
}

BotonIniciar.addEventListener("click", function() {
  if (reloj !== null) return;

  inputTempInicial.disabled = true;
  inputTempAmbiente.disabled = true;
  carruselMateriales.classList.add("disabled");

  reloj = setInterval(pasoSimulacion, 1000);
});

BotonDetener.addEventListener("click", function() {
  clearInterval(reloj);
  reloj = null;
});

BotonReiniciar.addEventListener("click", function() {
  clearInterval(reloj);
  reloj = null;

  tiempoTranscurrido = 0;
  spanTiempo.textContent = tiempoTranscurrido;
  spanTempActual.textContent = "--";

  datosSimulacion = [];
  filtroMedia.resetear();

  inputTempInicial.disabled = false;
  inputTempAmbiente.disabled = false;
  carruselMateriales.classList.remove("disabled");

  grafico.data.labels = [];
  grafico.data.datasets[0].data = [];
  grafico.data.datasets[1].data = [];
  grafico.update();
});

BotonExportar.addEventListener("click", function() {
  if (datosSimulacion.length === 0) {
    alert("Primero inicia el ensayo para generar lecturas.");
    return;
  }

  let textoCSV = "Tiempo (s),Temp Ideal (C),Sensor DS18B20 (C),Filtrada (C)\n";
  datosSimulacion.forEach(d => {
    textoCSV += `${d.segundo},${d.ideal},${d.cruda},${d.filtrada}\n`;
  });

  const blob = new Blob([textoCSV], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const enlace = document.createElement("a");

  enlace.href = url;
  enlace.download = `ensayo_${materialSeleccionado}.csv`;
  enlace.click();
  URL.revokeObjectURL(url);
});
