import { Entidade } from './Entidade';
import { IHabilidadeEspecial } from '../interfaces/IHabilidadeEspecial';
import { Assassino } from './Assassino';

export abstract class Sobrevivente extends Entidade implements IHabilidadeEspecial {
    public abstract descricaoHabilidade: string;

    constructor(nome: string, x: number, y: number) {
        super(nome, x, y, 100);
    }

    public atacar(assassino: Assassino): boolean {
        if (this.x === assassino.x && this.y === assassino.y) {
            assassino.vida -= 40;
            return true;
        }
        return false;
    }

    public abstract usarHabilidade(): string;
}