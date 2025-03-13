// Configurações do gráfico
const largura = 1115;
const altura = 400;
const margem = { top: 50, right: 50, bottom: 50, left: 50 };

// Cria o elemento SVG
const svg = d3
  .select('#grafico')
  .append('svg')
  .attr('width', largura + margem.left + margem.right)
  .attr('height', altura + margem.top + margem.bottom)
  .append('g')
  .attr('transform', `translate(${margem.left},${margem.top})`);

// Escalas para os eixos X e Y
const x = d3.scaleBand().range([0, largura]).padding(0.1);

const y = d3.scaleLinear().range([altura, 0]);

// Tooltip
const tooltip = d3.select('#tooltip');

d3.csv('./data/vendas_por_mês.csv').then((dados) => {
  dados.forEach((d) => {
    d.preco_unitario = +d.preco_unitario;
  });

  const ordemMeses = ['Janeiro', 'Fevereiro', 'Março'];
  dados.sort((a, b) => ordemMeses.indexOf(a.mes) - ordemMeses.indexOf(b.mes));

  x.domain(dados.map((d) => d.mes));
  y.domain([0, d3.max(dados, (d) => d.preco_unitario)]);

  svg
    .append('g')
    .attr('transform', `translate(0,${altura})`)
    .call(d3.axisBottom(x));

  svg.append('g').call(d3.axisLeft(y));

  const linha = d3
    .line()
    .x((d) => x(d.mes) + x.bandwidth() / 2)
    .y((d) => y(d.preco_unitario));

  svg.append('path').datum(dados).attr('class', 'line').attr('d', linha);

  svg
    .selectAll('.ponto')
    .data(dados)
    .enter()
    .append('circle')
    .attr('class', 'ponto')
    .attr('cx', (d) => x(d.mes) + x.bandwidth() / 2)
    .attr('cy', (d) => y(d.preco_unitario))
    .attr('r', 5)
    .attr('fill', 'steelblue')
    .on('mouseover', function (event, d) {
      tooltip.transition().duration(200).style('opacity', 0.9);
      tooltip
        .html(
          `<small>Em ${
            d.mes
          } o lucro foi de:</><br><p>R$ ${d.preco_unitario.toLocaleString()}</p>`
        )
        .style('left', `${event.pageX + 5}px`)
        .style('top', `${event.pageY - 28}px`);
    })
    .on('mouseout', function () {
      tooltip.transition().duration(500).style('opacity', 0);
    });

  // Rótulos
  svg
    .selectAll('.rotulo')
    .data(dados)
    .enter()
    .append('text')
    .attr('class', 'rotulo')
    .attr('x', (d) => x(d.mes) + x.bandwidth() / 2)
    .attr('y', (d) => y(d.preco_unitario) - 10)
    .attr('text-anchor', 'middle')
    .text((d) => `R$ ${d.preco_unitario.toLocaleString()}`);
});
