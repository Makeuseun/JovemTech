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
    public sprintBurstAtivo = false;
    public sprintBurstUsado = false;
    public claudetteCuraUsada = false;
    public espectroHabilidadeAtiva = false;

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

    public usarHabilidadeSobrevivente(): string {
        if (this.sobrevivente instanceof Meg) {
            if (this.sprintBurstUsado) {
                return 'Você já usou Sprint Burst nesta partida!';
            }
            this.sprintBurstAtivo = true;
            this.sprintBurstUsado = true;
            return `${this.sobrevivente.nome} usou Sprint Burst! Os assassinos ficarão mais lentos para o restante da partida.`;
        }

        if (this.sobrevivente instanceof Claudette) {
            if (this.claudetteCuraUsada) {
                return 'Você já usou Conhecimento Botânico nesta partida!';
            }
            this.claudetteCuraUsada = true;
            return this.sobrevivente.usarHabilidade();
        }

        return this.sobrevivente.usarHabilidade();
    }

    public executarTurnoAssassinos(): void {
        this.espectroHabilidadeAtiva = !this.espectroHabilidadeAtiva;

        this.assassinos.forEach(assassino => {
            if (!assassino.ativo) return;

            assassino.perseguir(
                this.sobrevivente.x,
                this.sobrevivente.y,
                this.tamanhoMapa,
                this.sprintBurstAtivo,
                this.espectroHabilidadeAtiva
            );

            if (assassino.x === this.sobrevivente.x && assassino.y === this.sobrevivente.y) {
                this.sobrevivente.vida -= 20;
                this.mensagemStatus = `⚠️ ${assassino.nome} (${assassino.descricaoHabilidade}) te atingiu! (-20 vida)`;
                
                if (this.sobrevivente.vida <= 0) {
                    this.mensagemStatus = '💀 VOCÊ MORREU!';
                }
            }
        });
    }

    public moverSobrevivente(direcao: string): boolean {
        let novoX = this.sobrevivente.x;
        let novoY = this.sobrevivente.y;

        if (direcao === 'w') novoY--;
        if (direcao === 's') novoY++;
        if (direcao === 'a') novoX--;
        if (direcao === 'd') novoX++;

        if (novoX < 0 || novoX >= this.tamanhoMapa || novoY < 0 || novoY >= this.tamanhoMapa) {
            this.mensagemStatus = 'Parede invisível!';
            return false;
        }

        this.sobrevivente.x = novoX;
        this.sobrevivente.y = novoY;

        let genIndex = this.geradores.findIndex(g => g.x === this.sobrevivente.x && g.y === this.sobrevivente.y && g.ativo);
        if (genIndex !== -1) {
            this.geradores[genIndex].ativo = false;
            this.geradoresRestantes--;
            this.mensagemStatus = `💡 Gerador consertado! Faltam ${this.geradoresRestantes}.`;
            if (this.geradoresRestantes === 0) {
                this.mensagemStatus = '🎉 VITÓRIA! Você consertou todos os geradores e escapou!';
                return true;
            }
        } else {
            let kitIndex = this.kitsCura.findIndex(k => k.x === this.sobrevivente.x && k.y === this.sobrevivente.y && k.ativo);
            if (kitIndex !== -1) {
                this.kitsCura[kitIndex].ativo = false;
                const curaQuantidade = this.sobrevivente instanceof Claudette ? 50 : 30;
                this.sobrevivente.vida = Math.min(100, this.sobrevivente.vida + curaQuantidade);
                this.mensagemStatus = `🩹 Kit usado! Vida recuperada (+${curaQuantidade}).`;
            } else {
                this.mensagemStatus = 'Você se moveu...';
            }
        }

        return true;
    }

    public atacarAssassinos(): boolean {
        let acertou = false;
        this.assassinos.forEach(assassino => {
            if (assassino.ativo && this.sobrevivente.atacar(assassino)) {
                acertou = true;
                if (assassino.vida <= 0) {
                    assassino.ativo = false;
                    this.mensagemStatus = `💥 Você destruiu o ${assassino.nome}!`;
                } else {
                    this.mensagemStatus = `⚔️ Você feriu o ${assassino.nome}! Vida dele: ${assassino.vida}`;
                }
            }
        });
        if (!acertou) {
            this.mensagemStatus = 'Você bateu no ar!';
        }
        return acertou;
    }

    public jogoTerminado(): boolean {
        if (this.sobrevivente.vida <= 0) return true;
        if (this.geradoresRestantes === 0) return true;
        return false;
    }

    public resultadoJogo(): string {
        if (this.geradoresRestantes === 0) return '🎉 VITÓRIA! Você consertou todos os geradores e escapou!';
        if (this.sobrevivente.vida <= 0) return '💀 VOCÊ MORREU!';
        return '';
    }
}