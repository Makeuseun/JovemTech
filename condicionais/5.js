const input = require("prompt-sync")();

let nota1 = Number(input("Digite sua primeira nota: "));
let nota2 = Number(input("Digite sua segunda nota: "));
let nota3 = Number(input("Digite sua terceira nota: "));
let media = (nota1 + nota2 + nota3) / 3;
let resultado;

if (media >= 7) {
  resultado = "Aprovado"
} else {
  resultado = "Reprovado"
}

console.log(`Sua média é ${media}, você foi ${resultado}!`);
