const input = require("prompt-sync")();

let idade = Number(input("Digite sua idade: "));

if (idade >= 60) {
  console.log("Aposentado");
} else {
  console.log("Trabalho Formal");
}
