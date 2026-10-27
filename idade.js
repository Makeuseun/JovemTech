const input = require("prompt-sync")();

let idade = input("Digite sua idade: "); // input do usuario

if (idade >= 18) {
  console.log("Você é maior de idade.")
} else {
  console.log("Você é menor de idade.")
}

/*
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Digite sua idade: ", (resposta) => {
  const idade = Number(resposta);

  if (idade >= 18) {
    console.log("Você é maior de idade.");
  } else {
    console.log("Você é menor de idade.");
  }

  rl.close();
});
*/