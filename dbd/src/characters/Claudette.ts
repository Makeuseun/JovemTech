import { Sobrevivente } from '../models/Sobrevivente';

export class Claudette extends Sobrevivente {
    public descricaoHabilidade = "Botânica: Cura instantânea única por partida e kits recuperam mais vida.";

    constructor(x: number, y: number) {
        super("Claudette", x, y);
    }

    public usarHabilidade(): string {
        const cura = 50;
        this.vida = Math.min(100, this.vida + cura);
        return `${this.nome} usou Conhecimento Botânico! Curou ${cura} de vida (uso único).`;
    }
}