function gerarTabelaMultiplicacao() {
    let conteudo = '';
    for (let i = 1; i <= 10; i++) {
        conteudo += `<div class="coluna">`;
        conteudo += `<div class="titulo">Produtos de ${i}</div>`;

        for (let j = 1; j <= 10; j++) {
            conteudo += `<div class="linha">`;
            conteudo += `<div class="celula">${i} x ${j}</div>`;
            conteudo += `<div class="celula">${i * j}</div>`;
            conteudo += `</div>`;
        }
        conteudo += `</div>`; 
    }
    document.body.innerHTML = conteudo; 
}

gerarTabelaMultiplicacao();
