// Função para criar o gráfico de barras horizontais
function criarGraficoBarras() {
    // Configurações do gráfico
    const largura = 1015;
    const altura = 400;
    const margem = { top: 50, right: 50, bottom: 50, left: 150 };

    // Cria o elemento SVG dentro da div #grafico
    const svg = d3.select("#grafico_categoria")
        .append("svg")
        .attr("width", largura + margem.left + margem.right)
        .attr("height", altura + margem.top + margem.bottom)
        .append("g")
        .attr("transform", `translate(${margem.left},${margem.top})`);

    // Escalas para os eixos X e Y
    const x = d3.scaleLinear()
        .range([0, largura]);

    const y = d3.scaleBand()
        .range([0, altura])
        .padding(0.1);

    // Função para carregar e processar os dados
    d3.csv("vendas_por_categoria.csv").then(dados => {
        // Converte o preço unitário para número
        dados.forEach(d => {
            d.preco_unitario = +d.preco_unitario;
        });

        // Define os domínios das escalas
        x.domain([0, d3.max(dados, d => d.preco_unitario)]);
        y.domain(dados.map(d => d.categoria));

        // Adiciona o eixo X
        svg.append("g")
            .attr("transform", `translate(0,${altura})`)
            .call(d3.axisBottom(x).ticks(5).tickFormat(d => `R$ ${d.toLocaleString()}`))
            .selectAll("text")
            .attr("class", "label");

        // Adiciona o eixo Y
        svg.append("g")
            .call(d3.axisLeft(y))
            .selectAll("text")
            .attr("class", "label");

        // Adiciona as barras ao gráfico
        svg.selectAll(".bar")
            .data(dados)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("y", d => y(d.categoria))
            .attr("height", y.bandwidth())
            .attr("x", 0)
            .attr("width", d => x(d.preco_unitario))
            .on("mouseover", function () {
                d3.select(this).attr("fill", "orange");
            })
            .on("mouseout", function () {
                d3.select(this).attr("fill", "steelblue");
            });

        // Adiciona rótulos aos valores das barras
        svg.selectAll(".rotulo")
            .data(dados)
            .enter()
            .append("text")
            .attr("class", "rotulo")
            .attr("x", d => x(d.preco_unitario) + 5)
            .attr("y", d => y(d.categoria) + y.bandwidth() / 2)
            .attr("dy", "0.35em")
            .text(d => `R$ ${d.preco_unitario.toLocaleString()}`);
    }).catch(error => {
        console.error("Erro ao carregar o CSV:", error);
    });
}

// Chama a função para criar o gráfico
criarGraficoBarras();