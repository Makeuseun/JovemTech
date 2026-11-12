import * as readline from 'readline';
import { EstadoJogo } from './game/EstadoJogo';
import { Claudette } from './characters/Claudette';

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
}

const jogo = new EstadoJogo();

function desenharTela() {
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

process.stdin.on('keypress', (str, key) => {
    if ((key.ctrl && key.name === 'c') || key.name === 'q') {
        process.stdin.setRawMode(false);
        process.exit();
    }

    let acaoRealizada = false;
    let novoX = jogo.sobrevivente.x;
    let novoY = jogo.sobrevivente.y;

    if (key.name === 'w') { novoY--; acaoRealizada = true; }
    if (key.name === 's') { novoY++; acaoRealizada = true; }
    if (key.name === 'a') { novoX--; acaoRealizada = true; }
    if (key.name === 'd') { novoX++; acaoRealizada = true; }

    if (key.name === 'e') {
        acaoRealizada = true;
        jogo.mensagemStatus = jogo.sobrevivente.usarHabilidade();
    }

    if (key.name === 'space') {
        acaoRealizada = true;
        let acertou = false;
        jogo.assassinos.forEach(assassino => {
            if (assassino.ativo && jogo.sobrevivente.atacar(assassino)) {
                acertou = true;
                if (assassino.vida <= 0) {
                    assassino.ativo = false;
                    jogo.mensagemStatus = `💥 Você destruiu o ${assassino.nome}!`;
                } else {
                    jogo.mensagemStatus = `⚔️ Você feriu o ${assassino.nome}! Vida dele: ${assassino.vida}`;
                }
            }
        });
        if (!acertou) {
            jogo.mensagemStatus = "Você bateu no ar!";
        }
    }

    if (acaoRealizada && key.name !== 'space' && key.name !== 'e') {
        if (novoX >= 0 && novoX < jogo.tamanhoMapa && novoY >= 0 && novoY < jogo.tamanhoMapa) {
            jogo.sobrevivente.x = novoX;
            jogo.sobrevivente.y = novoY;

            let genIndex = jogo.geradores.findIndex(g => g.x === jogo.sobrevivente.x && g.y === jogo.sobrevivente.y && g.ativo);
            if (genIndex !== -1) {
                jogo.geradores[genIndex].ativo = false;
                jogo.geradoresRestantes--;
                jogo.mensagemStatus = `💡 Gerador consertado! Faltam ${jogo.geradoresRestantes}.`;
                if (jogo.geradoresRestantes === 0) {
                    console.clear();
                    console.log("🎉 VITÓRIA! Você consertou todos os geradores e escapou!");
                    process.exit();
                }
            } else {
                let kitIndex = jogo.kitsCura.findIndex(k => k.x === jogo.sobrevivente.x && k.y === jogo.sobrevivente.y && k.ativo);
                if (kitIndex !== -1) {
                    jogo.kitsCura[kitIndex].ativo = false;
                    const curaQuantidade = jogo.sobrevivente instanceof Claudette ? 50 : 30;
                    jogo.sobrevivente.vida = Math.min(100, jogo.sobrevivente.vida + curaQuantidade);
                    jogo.mensagemStatus = `🩹 Kit usado! Vida recuperada (+${curaQuantidade}).`;
                } else {
                    jogo.mensagemStatus = "Você se moveu...";
                }
            }
        } else {
            jogo.mensagemStatus = "Parede invisível!";
        }
    }

    jogo.assassinos.forEach(assassino => {
        if (assassino.ativo) {
            assassino.perseguir(jogo.sobrevivente.x, jogo.sobrevivente.y, jogo.tamanhoMapa);

            if (assassino.x === jogo.sobrevivente.x && assassino.y === jogo.sobrevivente.y) {
                jogo.sobrevivente.vida -= 20;
                jogo.mensagemStatus = `⚠️ ${assassino.nome} (${assassino.descricaoHabilidade}) te atingiu! (-20 vida)`;
                
                if (jogo.sobrevivente.vida <= 0) {
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