function criarCoordenadas(n) { //Esta função gera uma lista com n pares de coordenadas que variam entre 0 e 400
    let lista = [];

    for (let i = 0; i < n; i++) {
        let coordenada = [Math.floor(Math.random() * 401), Math.floor(Math.random() * 401)];
        lista.push(coordenada);
    }

    return lista;
}

function criarSolucaoInicial(n) {
    let solucaoInicial = []
    for (let i = 0; i < n; i++) {
        solucaoInicial.push(i);
    }
    for (let i = 0; i < n; i++) {
        const j = Math.floor(Math.random() * (i + 1));
        [solucaoInicial[i], solucaoInicial[j]] = [solucaoInicial[j], solucaoInicial[i]];
    }
    return solucaoInicial
}

function calcularCusto(solucao, cidades) {
    let custoTotal = 0
    for (let i = 0; i < cidades.length; i++) {
        const cidadeAtual = solucao[i];
        const proxCidade = solucao[(i + 1) % cidades.length]
        const coordenadasAtuais = cidades[cidadeAtual]
        const proxCoordenadas = cidades[proxCidade]
        const diferencaX = coordenadasAtuais[0] - proxCoordenadas[0];
        const diferencaY = coordenadasAtuais[1] - proxCoordenadas[1];
        const distancia = Math.sqrt(diferencaX * diferencaX + diferencaY * diferencaY);
        custoTotal += distancia
    }
    return custoTotal
}

function simulatedAnnealing(cidades, temperatura, taxaResfrio, numeroIteracoes, solucaoInicial) {
    let solucaoAtual = solucaoInicial;
    let melhorSolucao = solucaoInicial.slice();

    for (let iteracao = 0; iteracao < numeroIteracoes; iteracao++) {
        const proxSolucao = gerarSolucaoVizinha(solucaoAtual);
        const custoAtual = calcularCusto(solucaoAtual, cidades);
        const proxCusto = calcularCusto(proxSolucao, cidades);

        if (probAceitacao(custoAtual, proxCusto, temperatura) > Math.random()) {
            solucaoAtual = proxSolucao.slice();
        }

        if (calcularCusto(solucaoAtual, cidades) < calcularCusto(melhorSolucao, cidades)) {
            melhorSolucao = solucaoAtual.slice();
        }

        temperatura *= 1 - taxaResfrio;
    }

    return melhorSolucao;
}

function gerarSolucaoVizinha(solucao) {
    const indices = [];
    while (indices.length < 2) {
        const indiceAleatorio = Math.floor(Math.random() * solucao.length);
        if (!indices.includes(indiceAleatorio)) {
            indices.push(indiceAleatorio);
        }
    }
    const [ind1, ind2] = indices
    const solucaovizinha = solucao.slice();
    [solucaovizinha[ind1], solucaovizinha[ind2]] = [solucaovizinha[ind2], solucaovizinha[ind1]];
    return solucaovizinha;
}

function probAceitacao(custoAtual, proxCusto, temperatura) {
    if (proxCusto < custoAtual) {
        return 1;
    }
    return Math.exp((custoAtual - proxCusto) / temperatura);
}

function plotarCidades(canva, cidades) {
    var c = canva.getContext("2d");
    for (let i = 0; i < cidades.length; i++) {
        c.beginPath();
        c.arc(cidades[i][0], cidades[i][1], 5, 0, 2 * Math.PI); // Draw a circle at the specified coordinates
        c.fillStyle = "blue"; // Set the fill color
        c.fill(); // Fill the circle
        c.closePath();
    }
}

function plotarCaminho(canva, cidades, solucao) {
    var c = canva.getContext("2d");
    for (let i = 0; i < solucao.length; i++) {
        let primeiraCoord = cidades[solucao[i]];
        let segundaCoord = cidades[solucao[(i + 1) % solucao.length]];
        c.beginPath();
        c.moveTo(primeiraCoord[0], primeiraCoord[1]);
        c.lineTo(segundaCoord[0], segundaCoord[1]);
        c.strokeStyle = "blue";
        c.stroke();
    }
}


document.getElementById("btnGerar").onclick = function () {
    let numeroCidades = document.getElementById("numeroCidades").value;
    let cidades = criarCoordenadas(numeroCidades) //Coordenadas geradas aleatoriamente para o nosso problema
    let solucaoInicial = criarSolucaoInicial(numeroCidades)
    let temperaturaInicial = 1000.0
    let taxaResfrio = 0.003
    let numeroIteracoes = document.getElementById("numeroIteracoes").value;
    let melhorRota = simulatedAnnealing(cidades, temperaturaInicial, taxaResfrio, numeroIteracoes, solucaoInicial)

    document.getElementById("btnGerar").disabled = true
    document.getElementById("headerInicial").textContent = `Solução Inicial: (Distância Total: ${Math.round(calcularCusto(solucaoInicial, cidades))})`
    document.getElementById("headerMelhor").textContent = `Melhor Solução: (Distância Total: ${Math.round(calcularCusto(melhorRota, cidades))})`
    plotarCidades(document.getElementById("canvaCoordenadas"), cidades)
    plotarCidades(document.getElementById("canvaInicial"), cidades)
    plotarCidades(document.getElementById("canvaMelhor"), cidades)
    plotarCaminho(document.getElementById("canvaInicial"), cidades, solucaoInicial)
    plotarCaminho(document.getElementById("canvaMelhor"), cidades, melhorRota)
};