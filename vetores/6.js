const input = require("prompt-sync")();

let numeros = [];

for (let i = 0; i < 15; i++) {
  let num = Number(input(`Digite o ${i + 1}º número: `));
  numeros.push(num);
}

console.log("\nVetor completo digitado:");
console.log(numeros);

console.log("\nPosições onde foram digitados valores múltiplos de 10:");
let encontrouMultiplo = false;

for (let i = 0; i < numeros.length; i++) {
  if (numeros[i] % 10 === 0) {
    console.log(`- Posição ${i} (valor: ${numeros[i]})`);
    encontrouMultiplo = true;
  }
}

if (!encontrouMultiplo) {
  console.log("Nenhum múltiplo de 10 foi digitado.");
}