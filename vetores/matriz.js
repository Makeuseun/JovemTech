const input = require("prompt-sync")();

let matriz = [ [0,0,0,0], [0,0,0,0], [0,0,0,0] ];

matriz[0][2] = Number(input("Digite o valor para matriz[0][2]: "));
matriz[1][2] = Number(input("Digite o valor para matriz[1][2]: "));
matriz[1][3] = Number(input("Digite o valor para matriz[1][3]: "));
matriz[2][1] = Number(input("Digite o valor para matriz[2][1]: "));

console.table(matriz);