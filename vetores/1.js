const input = require("prompt-sync")();

let cavalos = Number(input("Digite a quantidade de cavalos comprados: "));
let ferraduras;

if (cavalos > 0) {
  ferraduras = cavalos * 4;
} else {
  ferraduras = 0;
}

console.log(`Para equipar ${cavalos} cavalos, serão necessárias ${ferraduras} ferraduras.`);