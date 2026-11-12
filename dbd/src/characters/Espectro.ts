import { Assassino } from '../models/Assassino';

export class Espectro extends Assassino {
    public descricaoHabilidade = "Sino Espectral: Move-se mais rápido.";

    constructor(x: number, y: number) {
        super("Espectro", " 👻 ", x, y);
    }

    public perseguir(alvoX: number, alvoY: number, mapaTamanho: number): void {
        if (!this.ativo) return;
        
        if (this.x < alvoX) this.x++;
        else if (this.x > alvoX) this.x--;

        if (this.y < alvoY) this.y++;
        else if (this.y > alvoY) this.y--;

        this.x = Math.max(0, Math.min(mapaTamanho - 1, this.x));
        this.y = Math.max(0, Math.min(mapaTamanho - 1, this.y));
    }

    public usarHabilidade(): string {
        return `${this.nome} entrou no Reino das Sombras (Invisível)!`;
    }
}