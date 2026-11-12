import { Sobrevivente } from '../models/Sobrevivente';

export class Claudette extends Sobrevivente {
    public descricaoHabilidade = "Botânica: Kits de cura recuperam mais vida.";

    constructor(x: number, y: number) {
        super("Claudette", x, y);
    }

    public usarHabilidade(): string {
        return `${this.nome} usou Conhecimento Botânico! Eficiência de cura maximizada.`;
    }
}