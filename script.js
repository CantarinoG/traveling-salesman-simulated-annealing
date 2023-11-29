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

let numeroCidades = 10
let cidades = criarCoordenadas(numeroCidades) //Coordenadas geradas aleatoriamente para o nosso problema
let solucaoInicial = criarSolucaoInicial(numeroCidades) 
