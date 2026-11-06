const input = require("prompt-sync")();

let numero;

do {
  numero = Number(input("Digite um número positivo (digite 0 para sair): "));

  if (isNaN(numero)) {
    console.log("Por favor, digite um número válido.\n");
  } else if (numero > 0) {
    console.log(`Você digitou o número positivo: ${numero}\n`);
  } else if (numero < 0) {
    console.log("Número negativo ignorado.\n");
  }

} while (numero !== 0);

console.log("\nVocê digitou 0. Fim do programa!");