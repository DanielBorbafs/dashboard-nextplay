// Função para criar o gráfico de barras horizontais
function criarGraficoBarras() {
  // Configurações do gráfico
  const largura = 1015;
  const altura = 400;
  const margem = { top: 50, right: 50, bottom: 50, left: 150 };

  // Cria o elemento SVG dentro da div #grafico
  const svg = d3
    .select('#grafico_categoria')
    .append('svg')
    .attr('width', largura + margem.left + margem.right)
    .attr('height', altura + margem.top + margem.bottom)
    .append('g')
    .attr('transform', `translate(${margem.left},${margem.top})`);

  // Escalas para os eixos X e Y
  const x = d3.scaleLinear().range([0, largura]);
  const y = d3.scaleBand().range([0, altura]).padding(0.1);

  // Cria um elemento para o tooltip
  const tooltip = d3
    .select('body')
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0)
    .style('position', 'absolute')
    .style('background', '#fff')
    .style('border', '1px solid #ccc')
    .style('padding', '5px')
    .style('border-radius', '5px')
    .style('pointer-events', 'none'); // Impede que o tooltip interfira com interações do mouse

  // Função para carregar e processar os dados
  d3.csv('./data/vendas_por_categoria.csv')
    .then((dados) => {
      // Converte o preço unitário para número
      dados.forEach((d) => {
        d.preco_unitario = +d.preco_unitario;
      });

      // Define os domínios das escalas
      x.domain([0, d3.max(dados, (d) => d.preco_unitario)]);
      y.domain(dados.map((d) => d.categoria));

      // Adiciona o eixo X
      svg
        .append('g')
        .attr('transform', `translate(0,${altura})`)
        .call(
          d3
            .axisBottom(x)
            .ticks(5)
            .tickFormat((d) => `R$ ${d.toLocaleString()}`)
        )
        .selectAll('text')
        .attr('class', 'label');

      // Adiciona o eixo Y
      svg
        .append('g')
        .call(d3.axisLeft(y))
        .selectAll('text')
        .attr('class', 'label');

      // Adiciona as barras ao gráfico
      svg
        .selectAll('.bar')
        .data(dados)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('y', (d) => y(d.categoria))
        .attr('height', y.bandwidth())
        .attr('x', 0)
        .attr('width', (d) => x(d.preco_unitario))
        .attr('fill', 'steelblue') // Define a cor inicial das barras
        .on('mouseover', function (event, d) {
          // Exibe o tooltip ao passar o mouse sobre a barra
          tooltip.transition().duration(200).style('opacity', 0.9);
          tooltip
            .html(
              `Categoria: ${
                d.categoria
              }<br>Valor: R$ ${d.preco_unitario.toLocaleString()}`
            )
            .style('left', `${event.pageX + 5}px`)
            .style('top', `${event.pageY - 28}px`);
          d3.select(this).attr('fill', '#3e5879'); // Muda a cor da barra ao passar o mouse
        })
        .on('mouseout', function () {
          // Oculta o tooltip ao retirar o mouse da barra
          tooltip.transition().duration(500).style('opacity', 0);
          d3.select(this).attr('fill', 'steelblue'); // Restaura a cor da barra
        });
    })
    .catch((error) => {
      console.error('Erro ao carregar o CSV:', error);
    });
}

// Chama a função para criar o gráfico
criarGraficoBarras();
