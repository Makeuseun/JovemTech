import { Sobrevivente } from '../models/Sobrevivente';

export class Meg extends Sobrevivente {
    public descricaoHabilidade = "Sprint Burst: Move-se duas vezes por ativação.";

    constructor(x: number, y: number) {
        super("Meg", x, y);
    }

    public usarHabilidade(): string {
        return `${this.nome} usou Sprint Burst! Foco e adrenalina aumentados.`;
    }
}