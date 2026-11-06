const input = require("prompt-sync")();

let idades = [];
let somaIdades = 0;

for (let i = 0; i < 8; i++) {
  let idade = Number(input(`Digite a idade da ${i + 1}ª pessoa: `));
  idades.push(idade);
  somaIdades += idade;
}

console.log("\n--- RESULTADOS ---");

// a)
let media = somaIdades / idades.length;
console.log(`a) A média de idade do grupo é: ${media.toFixed(2)} anos.`);

// b)
console.log("\nb) Posições onde as pessoas têm mais de 25 anos:");
let encontrouMais25 = false;
for (let i = 0; i < idades.length; i++) {
  if (idades[i] > 25) {
    console.log(`   - Posição ${i} (idade: ${idades[i]})`);
    encontrouMais25 = true;
  }
}
if (!encontrouMais25) {
  console.log("   Nenhuma pessoa tem mais de 25 anos.");
}

// c)
let maiorIdade = idades[0];
for (let i = 1; i < idades.length; i++) {
  if (idades[i] > maiorIdade) {
    maiorIdade = idades[i];
  }
}
console.log(`\nc) A maior idade digitada foi: ${maiorIdade}`);

// d)
console.log("\nd) Posições onde apareceu a maior idade:");
for (let i = 0; i < idades.length; i++) {
  if (idades[i] === maiorIdade) {
    console.log(`   - Posição ${i}`);
  }
}