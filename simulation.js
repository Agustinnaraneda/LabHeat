const coeficientesK = {
  Metal: 0.03,
  Vidrio: 0.018,
  Ceramica: 0.012,
  Plastico: 0.009,
  Greda: 0.006
};

function calcularTempIdeal(t, T0, Tamb, material) {
  const k = coeficientesK[material] || 0.015;
  return Tamb + (T0 - Tamb) * Math.exp(-k * t);
}

function simularSensorDS(tempReal) {
  const ruido = (Math.random() - 0.5) * 0.2;
  const tempConRuido = tempReal + ruido;
  const paso12Bits = 0.0625;
  return Math.round(tempConRuido / paso12Bits) * paso12Bits;
}

let historialFiltro = [];

function aplicarFiltroMedia(nuevoValor) {
  historialFiltro.push(nuevoValor);
  if (historialFiltro.length > 5) {
    historialFiltro.shift();
  }
  const suma = historialFiltro.reduce((acumulado, val) => acumulado + val, 0);
  return suma / historialFiltro.length;
}

function resetearFiltro() {
  historialFiltro = [];
}