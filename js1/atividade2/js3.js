function getJogadaDoJogador() {
    const jogada = parseInt(prompt("Escolha sua jogada:\n1 - Papel\n2 - Pedra\n3 - Tesoura"));

    if ([1, 2, 3].includes(jogada)) {
        return jogada;
    } else {
        console.log("Opção inválida! O jogo acabou.");
        return null;
    }
}

function getJogadaDoComputador() {
    return Math.floor(Math.random() * 3) + 1;
}

function determinarVencedor(jogadaJogador, jogadaComputador) {
    const jogadas = ["", "Papel", "Pedra", "Tesoura"];
    console.log(`Você jogou: ${jogadas[jogadaJogador]}`);
    console.log(`O computador jogou: ${jogadas[jogadaComputador]}`);

    if (jogadaJogador === jogadaComputador) {
        return "Empate";
    } else if (
        (jogadaJogador === 1 && jogadaComputador === 3) ||
        (jogadaJogador === 2 && jogadaComputador === 1) ||
        (jogadaJogador === 3 && jogadaComputador === 2)
    ) {
        return "Jogador";
    } else {
        return "Computador";
    }
}

function iniciarJogo() {
    let pontuacao = 0;

    while (true) {
        const jogadaJogador = getJogadaDoJogador();
        if (jogadaJogador === null) break;

        const jogadaComputador = getJogadaDoComputador();
        const vencedor = determinarVencedor(jogadaJogador, jogadaComputador);

        if (vencedor === "Empate") {
            console.log("A rodada empatou!");
        } else if (vencedor === "Jogador") {
            console.log("Você ganhou!");
            pontuacao++;
        } else {
            console.log("Você perdeu! O jogo acabou.");
            break;
        }
    }

    console.log(`Sua pontuação total foi de ${pontuacao}.`);
}