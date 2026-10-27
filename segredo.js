const input = require("prompt-sync")();

let segredo, tentativas, palpite;

segredo = Math.floor(Math.random() * 100) + 1;
tentativas = 0;
while (tentativas < 7) {
    palpite = input("Digite um palpite de 1 a 100 (0 Desiste): ");

    if (palpite == 0) {
        console.log("Você desistiu!")
        return;
    }

    console.log(`${tentativas+1}° palpite: ${palpite}`);

    if (palpite == segredo) {
        console.log("Você encontrou o segredo!");
        return;
    } else {
        console.log("Você errou!");
        if (palpite > segredo) {
            console.log("O segredo é menor que " + palpite);
        } else {
            console.log("O segredo é maior que " + palpite);
        }
    }
    tentativas += 1;
}