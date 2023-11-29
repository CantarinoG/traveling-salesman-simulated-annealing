function criarCoordenadas(n) { //Esta função gera uma lista com n pares de coordenadas que variam entre 0 e 100
    let lista = [];

    for (let i = 0; i < n; i++) {
        let coordenada = [Math.floor(Math.random() * 101), Math.floor(Math.random() * 101)];
        lista.push(coordenada);
    }

    return lista;
}

function criarSolucaoInicial(n) { //Cria uma solução inicial
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

function calcularCusto(solucao, cidades) { //Calcula a distância total da solução
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
    let melhorSolucao = solucaoInicial.slice();

    for (let iteracao = 0; iteracao < numeroIteracoes; iteracao++) {
        const proxSolucao = vizinho(currentSolution);
        const custoAtual = calcularCusto(currentSolution, cidades);
        const proxCusto = calcularCusto(proxSolucao, cidades);

        if (probAceitacao(custoAtual, proxCusto, temperatura) > Math.random()) {
            currentSolution = proxSolucao.slice();
        }

        if (calcularCusto(solucaoInicial, cidades) < calcularCusto(melhorSolucao, cidades)) {
            melhorSolucao = currentSolution.slice();
        }

        temperatura *= 1 - taxaResfrio;
    }

    return melhorSolucao;
}


let numeroCidades = 10
let cidades = criarCoordenadas(numeroCidades) //Coordenadas geradas aleatoriamente para o nosso problema
let solucaoInicial = criarSolucaoInicial(numeroCidades)
let temperaturaInicial = 1000.0
let taxaResfrio = 0.003
let numeroIteracoes = 1000
