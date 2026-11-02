const input = require("prompt-sync")();

let numeros = [];
let pares = 0;
let impares = 0;

for (let i = 0; i < 6; i++) {
  numeros[i] = Number(input(`${i + 1}° número inteiro: `));
}

for (let i = 0; i < numeros.length; i++) {
  if (numeros[i] % 2 == 0) {
    pares++;
  } else {
    impares++;
  }
}

console.log(`Quantidade de números pares: ${pares}`);
console.log(`Quantidade de números ímpares: ${impares}`);