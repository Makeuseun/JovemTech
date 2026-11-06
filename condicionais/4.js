const input = require("prompt-sync")();

let nome = String(input("Digite seu nome: "));
let totalCompra = Number(input("Digite o valor total da compra: "));

console.log(`Olá ${nome}, Sua compra recebeu 15% de desconto! Custará R$ ${totalCompra * 0.85}`);
