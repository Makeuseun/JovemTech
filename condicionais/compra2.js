const input = require("prompt-sync")();

let totalCompra = Number(input("Digite o valor total da compra: "));
let cartao = String(input("Você tem cartão fidelidade? Digite 'sim' caso tenha. "));

if (totalCompra >= 500 || cartao === "sim") {
  console.log(`Sua compra recebeu 20% de desconto! Custará R$ ${totalCompra * 0.80}`);
} else {
  console.log(`Sua compra não recebeu desconto. Custará R$ ${totalCompra}`);
}