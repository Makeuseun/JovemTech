const input = require("prompt-sync")();

let numero = Number(input("Digite um número real: "));
let sextaParte;

if (!isNaN(numero)) {
  sextaParte = numero / 6;
  console.log(`A sexta parte de ${numero} é ${sextaParte.toFixed(2)}!`);
} else {
  console.log("Digite um número válido.");
}