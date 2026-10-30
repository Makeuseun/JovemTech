const input = require("prompt-sync")();

let numero = Number(input("Digite um número: "));

console.log(`Sucessor: ${numero + 1}\nAntecessor: ${numero - 1}`);