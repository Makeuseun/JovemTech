const input = require("prompt-sync")();

let numeros = [];
let soma = 0;

for (let i = 0; i < 8; i++) {
  numeros[i] = Number(input(`${i + 1}° número real: `));
}

for (let i = 0; i < numeros.length; i++) {
  soma += numeros[i];
}

console.log(`A soma de todos os valores é: ${soma}`);