const input = require("prompt-sync")();

let catetos = [];
catetos.push(Number(input("Digite o valor do primeiro cateto: ")));
catetos.push(Number(input("Digite o valor do segundo cateto: ")));

let area;

if (catetos[0] > 0 && catetos[1] > 0) {
  area = (catetos[0] * catetos[1]) / 2;
} else {
  area = 0;
}

console.log(`Para um triângulo retângulo com os catetos ${catetos[0]} e ${catetos[1]}, a área é ${area}.`);