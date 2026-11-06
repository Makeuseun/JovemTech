const input = require("prompt-sync")();

let numeros = [];

for (let i = 0; i < 10; i++) {
  let num = Number(input(`Digite o ${i + 1}º número inteiro: `));
  numeros.push(num);
}

console.log("\nNúmeros pares encontrados e suas posições:");
let encontrouPar = false;

for (let i = 0; i < numeros.length; i++) {
  if (numeros[i] % 2 === 0) {
    console.log(`- Número ${numeros[i]} na posição ${i}`);
    encontrouPar = true;
  }
}

if (!encontrouPar) {
  console.log("Nenhum número par foi digitado.");
}