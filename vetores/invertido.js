const input = require("prompt-sync")();

let numeros = [];

for (let i = 0; i < 10; i++) {
  numeros[i] = Number(input(`${i + 1}° número inteiro: `));
}

let invertido = [];

for (let i = 0; i < numeros.length; i++) {
  invertido[i] = numeros[numeros.length - 1 - i];
}

console.log(`Vetor invertido: ${invertido}`);