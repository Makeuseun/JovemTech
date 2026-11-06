const input = require("prompt-sync")();

let opcao;

do {
  console.log("\n--- MENU PRINCIPAL ---");
  console.log("1. Exibir saudação");
  console.log("2. Mostrar mensagem motivacional");
  console.log("3. Sair");
  
  opcao = Number(input("Escolha uma opção (1 a 3): "));

  switch (opcao) {
    case 1:
      console.log("\n> Olá! É ótimo ter você por aqui.");
      break;
    case 2:
      console.log("\n> Continue praticando! A programação se aprende fazendo.");
      break;
    case 3:
      console.log("\n> Saindo do programa... Até logo!");
      break;
    default:
      console.log("\n> Opção inválida! Por favor, escolha um número entre 1 e 3.");
  }
} while (opcao !== 3);