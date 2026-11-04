let matriz4x4 = [ [0,1,2,3], [4,5,6,7], [8,9,10,11], [12,13,14,15] ];
let matriz3x3 = [ [0,1,2], [3,4,5], [6,7,8] ];
let matriz2x2 = [ [0,1], [2,3] ];

let soma = 0;
let pares = 0;
let impares = 0;
let somaDiagonal = 0;

// Soma da matriz 2x2
for (let i = 0; i < 2; i++) {
  for (let j = 0; j < 2; j++) {
    soma += matriz2x2[i][j];
  }
}

// Contagem de pares e ímpares na matriz 3x3
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if ((matriz3x3[i][j] % 2) === 0) {
      pares++;
    } else {
      impares++;
    }
  }
}

// Soma da diagonal principal da matriz 3x3
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === j) {
      somaDiagonal += matriz3x3[i][j];
    }
  }
}

console.log("=== Exercício 1 ===");
console.table(matriz4x4);

console.log(`
=== Exercício 2 ===
Soma dos elementos da matriz 2x2: ${soma}

=== Exercício 3 ===
Pares na matriz 3x3: ${pares}
Ímpares na matriz 3x3: ${impares}

=== Exercício 4 ===
Soma da diagonal principal da matriz 3x3: ${somaDiagonal}`);