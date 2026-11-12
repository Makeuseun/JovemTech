import { Entidade } from './Entidade';
import { IHabilidadeEspecial } from '../interfaces/IHabilidadeEspecial';

export abstract class Assassino extends Entidade implements IHabilidadeEspecial {
    public ativo: boolean = true;
    public abstract descricaoHabilidade: string;
    protected turnoContador: number = 0;

    constructor(nome: string, public emoji: string, x: number, y: number) {
        super(nome, x, y, 80);
    }

    public abstract perseguir(alvoX: number, alvoY: number, mapaTamanho: number): void;
    public abstract usarHabilidade(): string;
}