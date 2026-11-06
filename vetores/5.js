const input = require("prompt-sync")();

let quantidades = [];
quantidades.push(Number(input("Digite a quantidade de latas de 350 ml: ")));
quantidades.push(Number(input("Digite a quantidade de garrafas de 600 ml: ")));
quantidades.push(Number(input("Digite a quantidade de garrafas de 2 litros: ")));

let totalLitros = 0;

if (quantidades[0] >= 0 && quantidades[1] >= 0 && quantidades[2] >= 0) {
  let litrosLatas = (quantidades[0] * 350) / 1000;
  let litrosGarrafas600 = (quantidades[1] * 600) / 1000;
  let litrosGarrafas2L = quantidades[2] * 2;

  totalLitros = litrosLatas + litrosGarrafas600 + litrosGarrafas2L;
} else {
  totalLitros = 0;
}

console.log(`No total, o comerciante comprou ${totalLitros} litros de refrigerante.`);