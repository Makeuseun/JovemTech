import { Sobrevivente } from '../models/Sobrevivente';

export class Meg extends Sobrevivente {
    public descricaoHabilidade = "Sprint Burst: Diminui a velocidade dos assassinos para o restante da partida (uso único).";

    constructor(x: number, y: number) {
        super("Meg", x, y);
    }

    public usarHabilidade(): string {
        return `${this.nome} usou Sprint Burst! Os assassinos ficarão mais lentos para o restante da partida.`;
    }
}