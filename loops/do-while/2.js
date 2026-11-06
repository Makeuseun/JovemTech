const input = require("prompt-sync")();

let numero;

do {
  numero = Number(input("Digite um número: "));

  if (isNaN(numero)) {
    console.log("Por favor, digite um número válido.\n");
  } else if (numero % 5 === 0) {
    console.log(`\nSucesso! O número ${numero} é múltiplo de 5 :D`);
  } else {
    console.log(`O número ${numero} não é múltiplo de 5. Tente novamente.\n`);
  }

} while (isNaN(numero) || numero % 5 !== 0);