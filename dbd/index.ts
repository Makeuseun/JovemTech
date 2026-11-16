import * as readline from 'readline';
import { EstadoJogo } from './src/game/EstadoJogo';

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
}

let jogo!: EstadoJogo;
let emSelecao = true;

function desenharTelaSelecao() {
    console.clear();
    console.log("=== DEAD BY DAYLIGHT: TERMINAL EDITION ===");
    console.log("");
    console.log("Escolha seu sobrevivente antes de iniciar:");
    console.log("");
    console.log("  [1] Meg  - Sprint Burst: Diminui a velocidade dos assassinos (uso único).");
    console.log("  [2] Claudette - Botânica: Cura instantânea única por partida e kits recuperam mais vida.");
    console.log("");
    console.log("Pressione 1 ou 2 para selecionar. [Q] Sair");
}

function desenharTelaJogo() {
    if (!jogo) return;
    console.clear();
    console.log("=== DEAD BY DAYLIGHT: TERMINAL EDITION ===");
    console.log(`Sobrevivente: ${jogo.sobrevivente.nome} | Vida: ❤️ ${jogo.sobrevivente.vida}/100`);
    console.log(`Geradores restantes: 💡 ${jogo.geradoresRestantes}`);
    console.log(`Status: ${jogo.mensagemStatus}\n`);

    for (let y = 0; y < jogo.tamanhoMapa; y++) {
        let linha = "";
        for (let x = 0; x < jogo.tamanhoMapa; x++) {
            let simbolo = " . ";

            let gen = jogo.geradores.find(g => g.x === x && g.y === y);
            if (gen) {
                simbolo = gen.ativo ? " 💡 " : " ✅ ";
            }

            let kit = jogo.kitsCura.find(k => k.x === x && k.y === y && k.ativo);
            if (kit && (!gen || !gen.ativo)) {
                simbolo = " 🩹 ";
            }

            let ass = jogo.assassinos.find(a => a.x === x && a.y === y && a.ativo);
            if (ass) {
                simbolo = ass.emoji;
            }

            if (jogo.sobrevivente.x === x && jogo.sobrevivente.y === y) {
                simbolo = " 🏃 ";
            }

            linha += simbolo;
        }
        console.log(linha);
    }
    console.log("\n[W/A/S/D] Mover | [ESPAÇO] Atacar | [E] Usar Habilidade | [Q] Sair");
}

function iniciarJogo(tipo: 'meg' | 'claudette') {
    jogo = new EstadoJogo();
    jogo.selecionarSobrevivente(tipo);
    desenharTelaJogo();
}

function processarTecla(key: any): void {
    if ((key.ctrl && key.name === 'c') || key.name === 'q') {
        process.stdin.setRawMode(false);
        process.exit();
    }

    if (emSelecao) {
        if (key.name === '1') {
            emSelecao = false;
            iniciarJogo('meg');
        } else if (key.name === '2') {
            emSelecao = false;
            iniciarJogo('claudette');
        }
        return;
    }

    if (!jogo) return;

    if (key.name === 'w' || key.name === 's' || key.name === 'a' || key.name === 'd') {
        jogo.moverSobrevivente(key.name);
    } else if (key.name === 'e') {
        jogo.mensagemStatus = jogo.usarHabilidadeSobrevivente();
    } else if (key.name === 'space') {
        jogo.atacarAssassinos();
    }

    // Executar turno dos assassinos após qualquer ação válida
    if (key.name !== 'q') {
        jogo.executarTurnoAssassinos();
    }

    // Verificar fim de jogo
    if (jogo.jogoTerminado()) {
        console.clear();
        console.log("=== DEAD BY DAYLIGHT: TERMINAL EDITION ===");
        console.log(jogo.resultadoJogo());
        process.exit();
    }

    desenharTelaJogo();
}

process.stdin.on('keypress', (_str, key) => {
    processarTecla(key);
});

desenharTelaSelecao();