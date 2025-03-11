let dados = [];  // Array para armazenar os dados do CSV
let paginaAtual = 1;  // Página atual
const itensPorPagina = 10;  // Número de itens por página

// Função para carregar os dados do CSV
d3.csv("top_produtos.csv").then(carregados => {
    dados = carregados;
    atualizarTabela();  // Exibe a primeira página
}).catch(error => {
    console.error("Erro ao carregar o CSV:", error);
});

// Função para atualizar a tabela com os dados da página atual
function atualizarTabela() {
    const tabela = d3.select("#tabela tbody");
    tabela.html("");  // Limpa a tabela

    // Calcula os índices dos itens da página atual
    const inicio = (paginaAtual - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;
    const dadosPagina = dados.slice(inicio, fim);

    // Preenche a tabela com os dados da página atual
    dadosPagina.forEach(d => {
        const linha = tabela.append("tr");
        linha.append("td").text(d.produto_id);
        linha.append("td").text(d.nome);
        linha.append("td").text(`R$ ${parseFloat(d.total_vendas).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
    });

    // Atualiza a informação da página
    const totalPaginas = Math.ceil(dados.length / itensPorPagina);
    d3.select("#info-pagina").text(`Página ${paginaAtual} de ${totalPaginas}`);

    // Habilita/desabilita os botões de navegação
    d3.select("#anterior").property("disabled", paginaAtual === 1);
    d3.select("#proximo").property("disabled", paginaAtual === totalPaginas);
}

// Evento para o botão "Anterior"
d3.select("#anterior").on("click", () => {
    if (paginaAtual > 1) {
        paginaAtual--;
        atualizarTabela();
    }
});

// Evento para o botão "Próximo"
d3.select("#proximo").on("click", () => {
    const totalPaginas = Math.ceil(dados.length / itensPorPagina);
    if (paginaAtual < totalPaginas) {
        paginaAtual++;
        atualizarTabela();
    }
});