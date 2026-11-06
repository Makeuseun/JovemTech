const input = require("prompt-sync")();

let numeros = [12, 45, 7, 89, 33, 21];

console.log("Vetor disponível:", numeros);
let numeroBuscado = Number(input("Digite o número que deseja procurar: "));

let posicao = -1;

for (let i = 0; i < numeros.length; i++) {
  if (numeros[i] === numeroBuscado) {
    posicao = i;
    break;
  }
}

if (posicao !== -1) {
  console.log(`O número ${numeroBuscado} foi encontrado na posição ${posicao} do vetor.`);
} else {
  console.log(`O número ${numeroBuscado} não existe no vetor.`);
}