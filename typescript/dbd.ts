// Dead by Daylight: Terminal Edition
// TODO: adicionar novos sobreviventes com novas mecanicas

import * as readline from 'readline';

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
}

// CLASSES
abstract class Entidade {
    constructor(public nome: string, public x: number, public y: number, public vida: number) {}
}

class Sobrevivente extends Entidade {
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
}

class Assassino extends Entidade {
    public ativo: boolean = true;
    private turnoContador: number = 0;

    constructor(nome: string, public emoji: string, x: number, y: number) {
        super(nome, x, y, 80);
    }

    public perseguir(alvoX: number, alvoY: number, mapaTamanho: number) {
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
}

// ESTADO DO JOGO
const TAMANHO_MAPA = 9;
let sobrevivente = new Sobrevivente("Meg", 4, 4);

let assassinos = [
    new Assassino("Espectro", " 👻 ", 0, 0),
    new Assassino("Hillbilly", " 🪚 ", 8, 8)
];

let geradoresRestantes = 4;
let mensagemStatus = "Conserte os geradores e sobreviva.";

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

// RENDERIZAÇÃO
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

            // 1. Verifica Geradores
            let gen = geradores.find(g => g.x === x && g.y === y);
            if (gen) {
                simbolo = gen.ativo ? " 💡 " : " ✅ ";
            }

            // 2. Verifica Kits de Cura
            let kit = kitsCura.find(k => k.x === x && k.y === y && k.ativo);
            if (kit && (!gen || !gen.ativo)) {
                simbolo = " 🩹 ";
            }

            // 3. Verifica Assassinos (Mesmo se passar por cima do gerador, o assassino tem prioridade visual, mas se quiser ver o gerador sob ele, o status avisa)
            let ass = assassinos.find(a => a.x === x && a.y === y && a.ativo);
            if (ass) {
                simbolo = ass.emoji;
            }

            // 4. Sobrevivente tem prioridade máxima
            if (sobrevivente.x === x && sobrevivente.y === y) {
                simbolo = " 🏃 ";
            }

            linha += simbolo;
        }
        console.log(linha);
    }
    console.log("\n[W/A/S/D] Mover | [ESPAÇO] Atacar Assassino | [Q] Sair");
}

// CONTROLES E TURNOS
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

    // Ataque com Barra de Espaço
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
            mensagemStatus = "Você bateu no ar! Nenhum assassino na sua casa.";
        }
    }

    // Valida movimento e interações
    if (acaoRealizada && key.name !== 'space') {
        if (novoX >= 0 && novoX < TAMANHO_MAPA && novoY >= 0 && novoY < TAMANHO_MAPA) {
            sobrevivente.x = novoX;
            sobrevivente.y = novoY;

            // Interação com Gerador
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
            } 
            // Interação com Kit de Cura
            else {
                let kitIndex = kitsCura.findIndex(k => k.x === sobrevivente.x && k.y === sobrevivente.y && k.ativo);
                if (kitIndex !== -1) {
                    kitsCura[kitIndex].ativo = false;
                    sobrevivente.vida = Math.min(100, sobrevivente.vida + 30);
                    mensagemStatus = `🩹 Você usou um kit médico! Vida recuperada (+30).`;
                } else {
                    mensagemStatus = "Você se moveu...";
                }
            }
        } else {
            mensagemStatus = "Parede invisível!";
        }
    }

    // Turno dos assassinos
    assassinos.forEach(assassino => {
        if (assassino.ativo) {
            assassino.perseguir(sobrevivente.x, sobrevivente.y, TAMANHO_MAPA);

            if (assassino.x === sobrevivente.x && assassino.y === sobrevivente.y) {
                sobrevivente.vida -= 20;
                mensagemStatus = `⚠️ ${assassino.nome} te atingiu! (-20 vida). Pressione ESPAÇO para revidar!`;
                
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
