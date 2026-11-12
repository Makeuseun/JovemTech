// Dead by Daylight: Terminal Edition
// TODO: adicionar seleção de sobrevivente e consertar habilidades

import * as readline from 'readline';

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
}

// ==================== INTERFACES ====================

interface IHabilidadeEspecial {
    descricaoHabilidade: string;
    usarHabilidade(): string;
}

// ==================== CLASSES BASE ====================

abstract class Entidade {
    constructor(public nome: string, public x: number, public y: number, public vida: number) {}
}

// Classe base para Sobreviventes
abstract class Sobrevivente extends Entidade implements IHabilidadeEspecial {
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

// Classe base para Assassinos
abstract class Assassino extends Entidade implements IHabilidadeEspecial {
    public ativo: boolean = true;
    public abstract descricaoHabilidade: string;
    protected turnoContador: number = 0;

    constructor(nome: string, public emoji: string, x: number, y: number) {
        super(nome, x, y, 80);
    }

    // Método abstrato
    public abstract perseguir(alvoX: number, alvoY: number, mapaTamanho: number): void;
    
    public abstract usarHabilidade(): string;
}

// ==================== PERSONAGENS CONCRETOS ====================

// Sobreviventes
class Meg extends Sobrevivente {
    public descricaoHabilidade = "Sprint Burst: Move-se duas vezes por ativação.";

    constructor(x: number, y: number) {
        super("Meg", x, y);
    }

    public usarHabilidade(): string {
        return `${this.nome} usou Sprint Burst! Foco e adrenalina aumentados.`;
    }
}

class Claudette extends Sobrevivente {
    public descricaoHabilidade = "Botânica: Kits de cura recuperam mais vida.";

    constructor(x: number, y: number) {
        super("Claudette", x, y);
    }

    public usarHabilidade(): string {
        return `${this.nome} usou Conhecimento Botânico! Eficiência de cura maximizada.`;
    }
}

// Assassinos
class Espectro extends Assassino {
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

class Hillbilly extends Assassino {
    public descricaoHabilidade = "Serra Elétrica: Causa dano crítico.";

    constructor(x: number, y: number) {
        super("Hillbilly", " 🪚 ", x, y);
    }

    public perseguir(alvoX: number, alvoY: number, mapaTamanho: number): void {
        if (!this.ativo) return;

        this.turnoContador++;
        if (this.turnoContador % 2 !== 0) return; // Move a cada 2 turnos

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

// ==================== ESTADO DO JOGO ====================

const TAMANHO_MAPA = 9;

let sobrevivente: Sobrevivente = new Meg(4, 4); 
// let sobrevivente: Sobrevivente = new Claudette(4, 4);

let assassinos: Assassino[] = [
    new Espectro(0, 0),
    new Hillbilly(8, 8)
];

let geradoresRestantes = 4;
let mensagemStatus = `Início! Habilidade (${sobrevivente.nome}): ${sobrevivente.descricaoHabilidade}`;

let geradores = [
    { x: 1, y: 1, ativo: true },
    { x: 7, y: 1, ativo: true },
    { x: 1, y: 7, ativo: true },
    { x: 7, y: 7, ativo: true }
];

let kitsCura = [
    { x: 4, y: 1, ativo: true },
    { x: 4, y: 7, ativo: true }
];

// ==================== RENDERIZAÇÃO ====================

function desenharTela() {
    console.clear();
    console.log("=== DEAD BY DAYLIGHT: TERMINAL EDITION ===");
    console.log(`Sobrevivente: ${sobrevivente.nome} | Vida: ❤️ ${sobrevivente.vida}/100`);
    console.log(`Geradores restantes: 💡 ${geradoresRestantes}`);
    console.log(`Status: ${mensagemStatus}\n`);

    for (let y = 0; y < TAMANHO_MAPA; y++) {
        let linha = "";
        for (let x = 0; x < TAMANHO_MAPA; x++) {
            let simbolo = " . ";

            let gen = geradores.find(g => g.x === x && g.y === y);
            if (gen) {
                simbolo = gen.ativo ? " 💡 " : " ✅ ";
            }

            let kit = kitsCura.find(k => k.x === x && k.y === y && k.ativo);
            if (kit && (!gen || !gen.ativo)) {
                simbolo = " 🩹 ";
            }

            let ass = assassinos.find(a => a.x === x && a.y === y && a.ativo);
            if (ass) {
                simbolo = ass.emoji;
            }

            if (sobrevivente.x === x && sobrevivente.y === y) {
                simbolo = " 🏃 ";
            }

            linha += simbolo;
        }
        console.log(linha);
    }
    console.log("\n[W/A/S/D] Mover | [ESPAÇO] Atacar | [E] Usar Habilidade | [Q] Sair");
}

// ==================== CONTROLES E TURNOS ====================

process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c' || key.name === 'q') {
        process.stdin.setRawMode(false);
        process.exit();
    }

    let acaoRealizada = false;
    let novoX = sobrevivente.x;
    let novoY = sobrevivente.y;

    // Movimento
    if (key.name === 'w') { novoY--; acaoRealizada = true; }
    if (key.name === 's') { novoY++; acaoRealizada = true; }
    if (key.name === 'a') { novoX--; acaoRealizada = true; }
    if (key.name === 'd') { novoX++; acaoRealizada = true; }

    // Habilidade Especial
    if (key.name === 'e') {
        acaoRealizada = true;
        mensagemStatus = sobrevivente.usarHabilidade();
    }

    // Ataque
    if (key.name === 'space') {
        acaoRealizada = true;
        let acertou = false;
        assassinos.forEach(assassino => {
            if (assassino.ativo && sobrevivente.atacar(assassino)) {
                acertou = true;
                if (assassino.vida <= 0) {
                    assassino.ativo = false;
                    mensagemStatus = `💥 Você destruiu o ${assassino.nome}!`;
                } else {
                    mensagemStatus = `⚔️ Você feriu o ${assassino.nome}! Vida dele: ${assassino.vida}`;
                }
            }
        });
        if (!acertou) {
            mensagemStatus = "Você bateu no ar!";
        }
    }

    if (acaoRealizada && key.name !== 'space' && key.name !== 'e') {
        if (novoX >= 0 && novoX < TAMANHO_MAPA && novoY >= 0 && novoY < TAMANHO_MAPA) {
            sobrevivente.x = novoX;
            sobrevivente.y = novoY;

            let genIndex = geradores.findIndex(g => g.x === sobrevivente.x && g.y === sobrevivente.y && g.ativo);
            if (genIndex !== -1) {
                geradores[genIndex].ativo = false;
                geradoresRestantes--;
                mensagemStatus = `💡 Gerador consertado! Faltam ${geradoresRestantes}.`;
                if (geradoresRestantes === 0) {
                    console.clear();
                    console.log("🎉 VITÓRIA! Você consertou todos os geradores e escapou!");
                    process.exit();
                }
            } else {
                let kitIndex = kitsCura.findIndex(k => k.x === sobrevivente.x && k.y === sobrevivente.y && k.ativo);
                if (kitIndex !== -1) {
                    kitsCura[kitIndex].ativo = false;
                    const curaQuantidade = sobrevivente instanceof Claudette ? 50 : 30;
                    sobrevivente.vida = Math.min(100, sobrevivente.vida + curaQuantidade);
                    mensagemStatus = `🩹 Kit usado! Vida recuperada (+${curaQuantidade}).`;
                } else {
                    mensagemStatus = "Você se moveu...";
                }
            }
        } else {
            mensagemStatus = "Parede invisível!";
        }
    }

    assassinos.forEach(assassino => {
        if (assassino.ativo) {
            assassino.perseguir(sobrevivente.x, sobrevivente.y, TAMANHO_MAPA);

            if (assassino.x === sobrevivente.x && assassino.y === sobrevivente.y) {
                sobrevivente.vida -= 20;
                mensagemStatus = `⚠️ ${assassino.nome} (${assassino.descricaoHabilidade}) te atingiu! (-20 vida)`;
                
                if (sobrevivente.vida <= 0) {
                    console.clear();
                    console.log("💀 VOCÊ MORREU!");
                    process.exit();
                }
            }
        }
    });

    desenharTela();
});

desenharTela();
