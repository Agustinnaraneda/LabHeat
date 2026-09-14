console.log("Soy un peo humano");

const BotonIniciar = document.getElementById("iniciar");
const BotonDetener = document.getElementById("detener");
const BotonReiniciar = document.getElementById("reiniciar");
const selectMaterial = document.getElementById("material");
const inputTempInicial = document.getElementById("temp-inicial");
const inputTempAmbiente = document.getElementById("temp-ambiente");
const spanTempActual = document.getElementById("temp-actual");
const spanTiempo = document.getElementById("tiempo");

let temperaturaActual = 0;
let reloj = null;
let tiempoTranscurrido = 0;
let segundos = 0;
segundos = segundos + 1;
setInterval(function() {
},1000);

BotonIniciar.addEventListener("click", function() {
    const MaterialSeleccionado = selectMaterial.value;
    const TempInicial = Number(inputTempInicial.value);
    const TempAmbiente = Number(inputTempAmbiente.value);

    reloj = setInterval(function() {
        tiempoTranscurrido = tiempoTranscurrido + 1;
        spanTiempo.textContent = tiempoTranscurrido;
    }, 1000);
    BotonDetener.addEventListener("click", function() {
        clearInterval(reloj);
    });
    BotonReiniciar.addEventListener("click", function() {
        clearInterval(reloj);
        tiempoTranscurrido = 0;
        spanTiempo.textContent = tiempoTranscurrido;
        spanTempActual.textContent = "--";
    });

    

 spanTempActual.textContent = TempInicial;
});

