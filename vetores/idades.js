const input = require("prompt-sync")();

let idades = [];

for (let i = 0; i < 5; i++) {
  idades[i] = Number(input(`${i + 1}ª idade: `));
}

let maior = idades[0];
let menor = idades[0];

for (let i = 0; i < idades.length; i++) {
  if (idades[i] > maior) {
    maior = idades[i];
  }

  if (idades[i] < menor) {
    menor = idades[i];
  }
}

console.log(`Maior idade: ${maior}`);
console.log(`Menor idade: ${menor}`);