/*
class Personagem {
  constructor(
    public nome: string,
    public vida: number,
    public nivel: number,
    public classe: string
  ) {}

  pular(): void {
    console.log(`[${this.classe}] ${this.nome} (Nível ${this.nivel}) preparou as pernas...`);
    console.log(`${this.nome} deu um pulo irado! 🚀 (Vida atual: ${this.vida})`);
  }
}

const heroi = new Personagem("Dorrance", 100, 5, "Mago");
heroi.pular();
*/

class Personagem {
  nome: string;
  vidas: number;
  pontos: number;

  constructor(nome: string) {
    this.nome = nome;
    this.vidas = 3;
    this.pontos = 0;
  }

  pular(): void {
    console.log(`${this.nome} pulou!`);
  }
}

const mario = new Personagem("Mario");
const luigi = new Personagem("Luigi");

mario.pular();
luigi.pular();