/* Digitação */
/*
const text = 'Insights que Impulsionaram o Sucesso da Nextplay'
let index = 0

function type(){
    if(index < text.length){
        document.getElementById('typed-text').innerHTML += text.charAt(index);
        index++
        setTimeout(type, 70)
    }
}

type()
*/

/* contador */

// Variáveis do contador
let currentCount = 0;
const targetCount = 100;
const speed = 50;

// Função que faz a contagem
function countUp() {
  if (currentCount < targetCount) {
    currentCount++;
    document.getElementById('outClientes').textContent = currentCount;
    document.getElementById('outVendas').textContent = currentCount + 15;
    setTimeout(countUp, speed);
  }
}

// Função para observar quando a seção do contador é visível
function startCounting(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      countUp(); // Começa a contagem quando a seção é visível
      observer.disconnect(); // Desconecta o observer após iniciar a contagem
    }
  });
}

// Configura o Intersection Observer
const observer = new IntersectionObserver(startCounting, {
  root: null, // Usa a janela de visualização
  threshold: 1, // Quando 50% da seção for visível, ativa a função
});

// Observa a seção com o contador
const counterSection = document.getElementById('insights');
observer.observe(counterSection);

/* ======== cacula o valor total =============*/

// Carrega o CSV e calcula o total
d3.csv('./data/vendas_por_mês.csv')
  .then((dados) => {
    // Converte os valores de 'preco_unitario' para números e soma
    const total = dados.reduce((acumulador, linha) => {
      return acumulador + parseFloat(linha.preco_unitario);
    }, 0);

    // Exibe o total na página
    d3.select('#valor-total').text(
      `R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
    );
  })
  .catch((error) => {
    console.error('Erro ao carregar o CSV:', error);
    d3.select('#valor-total').text('Erro ao carregar os dados.');
  });
