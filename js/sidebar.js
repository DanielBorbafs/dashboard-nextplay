// Seleciona o elemento da barra lateral (sidebar) e o botão (btn) que será usado para interagir com ela
const sidebar = document.querySelector('.sidebar');
const btn = document.querySelector('#btn');

// Define o comportamento quando o logo (logo_img) for clicado
logo_img.onclick = function () {
    // Verifica se a largura da tela NÃO atende à condição da media query (ou seja, se a largura da tela é maior que 700px)
    if (!x.matches) {
        // Alterna a classe 'open' na barra lateral. Se ela estiver aberta, será fechada; se estiver fechada, será aberta.
        sidebar.classList.toggle('open');
    }
};

// Define o comportamento quando o botão (btn) for clicado
btn.onclick = function () {
    // Verifica se a largura da tela NÃO atende à condição da media query (ou seja, se a largura da tela é maior que 700px)
    if (!x.matches) {
        // Remove a classe 'open' da barra lateral, garantindo que ela será fechada
        sidebar.classList.remove('open');
    }
};

// Função para ser chamada quando houver mudanças no estado da media query
function myFunction(x) {
    // Verifica se a largura da tela é menor ou igual a 700px
    if (x.matches) {
        // Se a largura da tela for menor ou igual a 700px, remove a classe 'open' da barra lateral (fechando-a automaticamente)
        sidebar.classList.remove('open');
    }
}

// Cria uma media query que verifica se a largura da tela é menor ou igual a 700px
var x = window.matchMedia('(max-width: 700px)');

// Chama a função imediatamente após o carregamento da página para garantir que a barra lateral esteja no estado correto (fechada)
myFunction(x);

// Adiciona a função como ouvinte (listener) para mudanças no estado da media query. 
// Sempre que a largura da tela mudar, a função será chamada para atualizar o estado da barra lateral.
x.addListener(myFunction);
