import { Assassino } from '../models/Assassino';

export class Espectro extends Assassino {
    public descricaoHabilidade = "Sino Espectral: Move-se 2 vezes por turno quando ativo.";

    constructor(x: number, y: number) {
        super("Espectro", " 👻 ", x, y);
    }

    public perseguir(alvoX: number, alvoY: number, mapaTamanho: number, lento: boolean = false, habilidadeEspectro: boolean = false): void {
        if (!this.ativo) return;

        // Durante Sprint Burst da Meg: Espectro se move 1 vez a cada 2 turnos
        if (lento) {
            this.moverUmEixo(alvoX, alvoY, mapaTamanho);
            return;
        }

        // Com habilidade própria ativa e sem Sprint Burst: se move 2 vezes por turno
        if (habilidadeEspectro) {
            // Primeira movimentação
            this.moverUmEixo(alvoX, alvoY, mapaTamanho);
            // Segunda movimentação
            this.moverUmEixo(alvoX, alvoY, mapaTamanho);
        } else {
            // Sem habilidade: se move 1 vez por turno
            this.moverUmEixo(alvoX, alvoY, mapaTamanho);
        }
    }

    private moverUmEixo(alvoX: number, alvoY: number, mapaTamanho: number): void {
        const distX = Math.abs(alvoX - this.x);
        const distY = Math.abs(alvoY - this.y);

        // Prioriza o eixo com maior distância para evitar ficar preso em um eixo
        if (distX >= distY && distX > 0) {
            if (this.x < alvoX) this.x++;
            else if (this.x > alvoX) this.x--;
        } else if (distY > 0) {
            if (this.y < alvoY) this.y++;
            else if (this.y > alvoY) this.y--;
        }

        this.x = Math.max(0, Math.min(mapaTamanho - 1, this.x));
        this.y = Math.max(0, Math.min(mapaTamanho - 1, this.y));
    }
}