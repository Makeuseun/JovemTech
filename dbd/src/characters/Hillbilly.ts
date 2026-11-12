import { Assassino } from '../models/Assassino';

export class Hillbilly extends Assassino {
    public descricaoHabilidade = "Serra Elétrica: Causa dano crítico.";

    constructor(x: number, y: number) {
        super("Hillbilly", " 🪚 ", x, y);
    }

    public perseguir(alvoX: number, alvoY: number, mapaTamanho: number): void {
        if (!this.ativo) return;

        this.turnoContador++;
        if (this.turnoContador % 2 !== 0) return;

        if (this.x < alvoX) this.x++;
        else if (this.x > alvoX) this.x--;

        if (this.y < alvoY) this.y++;
        else if (this.y > alvoY) this.y--;

        this.x = Math.max(0, Math.min(mapaTamanho - 1, this.x));
        this.y = Math.max(0, Math.min(mapaTamanho - 1, this.y));
    }

    public usarHabilidade(): string {
        return `${this.nome} acelerou a serra elétrica em direção ao alvo!`;
    }
}