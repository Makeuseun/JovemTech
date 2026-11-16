import { Assassino } from '../models/Assassino';

export class Hillbilly extends Assassino {
    public descricaoHabilidade = "Serra Elétrica: Causa dano crítico.";
    private turnoContador = 0;

    constructor(x: number, y: number) {
        super("Hillbilly", " 🪚 ", x, y);
    }

    public perseguir(alvoX: number, alvoY: number, mapaTamanho: number, lento: boolean = false): void {
        if (!this.ativo) return;

        this.turnoContador++;

        if (lento) {
            // Com Sprint Burst: se move 1 vez a cada 2 turnos
            if (this.turnoContador % 2 !== 0) return;
        }

        // Sem Sprint Burst: se move 1 vez por turno
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