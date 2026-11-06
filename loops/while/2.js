const input = require("prompt-sync")();

let numero = Number(input("Digite um número: "));

if (!isNaN(numero)) {
  console.log(`Números pares menores que ${numero}:`);
  
  let i = 2;
  
  while (i < numero) {
    console.log(i);
    i += 2;
  }
} else {
  console.log("Digite um número válido.");
}