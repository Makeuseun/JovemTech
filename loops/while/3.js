const input = require("prompt-sync")();

let soma = 0;

while (soma < 100) {
  let valor = Number(input("Digite um valor: "));
  
  if (!isNaN(valor)) {
    soma += valor;
    console.log(`Valor somado! A soma atual é: ${soma}`);
  } else {
    console.log("Por favor, digite um número válido.");
  }
}

console.log(`\nA soma final atingiu ou ultrapassou 100, totalizando: ${soma}`);