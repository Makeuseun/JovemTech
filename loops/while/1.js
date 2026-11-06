const input = require("prompt-sync")();

let numero = Number(input("Digite um número positivo (ou um número negativo/zero para parar): "));

while (!isNaN(numero) && numero > 0) {
  console.log(`Você digitou o número positivo: ${numero}`);
  numero = Number(input("Digite outro número positivo: "));
}

console.log("Você digitou um número não positivo.");