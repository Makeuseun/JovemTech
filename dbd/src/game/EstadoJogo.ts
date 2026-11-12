import { Sobrevivente } from '../models/Sobrevivente';
import { Assassino } from '../models/Assassino';
import { Meg } from '../characters/Meg';
import { Claudette } from '../characters/Claudette';
import { Espectro } from '../characters/Espectro';
import { Hillbilly } from '../characters/Hillbilly';

export class EstadoJogo {
    public readonly tamanhoMapa = 9;
    public sobrevivente: Sobrevivente = new Meg(4, 4);
    public assassinos: Assassino[] = [
        new Espectro(0, 0),
        new Hillbilly(8, 8)
    ];
    public geradoresRestantes = 4;
    public mensagemStatus = `Início! Habilidade (${this.sobrevivente.nome}): ${this.sobrevivente.descricaoHabilidade}`;

    public geradores = [
        { x: 1, y: 1, ativo: true },
        { x: 7, y: 1, ativo: true },
        { x: 1, y: 7, ativo: true },
        { x: 7, y: 7, ativo: true }
    ];

    public kitsCura = [
        { x: 4, y: 1, ativo: true },
        { x: 4, y: 7, ativo: true }
    ];

    public selecionarSobrevivente(tipo: 'meg' | 'claudette') {
        this.sobrevivente = tipo === 'meg' ? new Meg(4, 4) : new Claudette(4, 4);
        this.mensagemStatus = `Personagem escolhido: ${this.sobrevivente.nome}!`;
    }
}