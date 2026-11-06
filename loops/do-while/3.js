const input = require("prompt-sync")();

let resposta;

do {
  let nota = Number(input("Digite a nota do aluno: "));

  if (!isNaN(nota)) {
    console.log(`> Nota registrada com sucesso: ${nota}`);
  } else {
    console.log("> Por favor, digite um valor numérico válido.");
  }

  resposta = input("Deseja cadastrar outra nota? (s para sim / n para não): ").toLowerCase();
  
} while (resposta === 's');

console.log("\nCadastro de notas encerrado.");