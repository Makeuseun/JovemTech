const input = require("prompt-sync")();

let idade = input("Digite sua idade: ");
let em = input("Você está no ensino médio? digite 'sim' caso esteja. ");

if (idade <= 17 && em === "sim") {
  console.log("Aprovado para próxima fase");
} else {
  console.log("Não atende aos critérios");
}
