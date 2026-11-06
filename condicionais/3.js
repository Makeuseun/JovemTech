const input = require("prompt-sync")();

let valorHora = 51.90;
let horasTrabalhadas = Number(input("Digite o número de horas trabalhadas: "));

console.log(`Seu salário é R$ ${horasTrabalhadas * valorHora}`);
