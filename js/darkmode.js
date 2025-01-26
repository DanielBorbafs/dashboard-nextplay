const btnLightMode = document.getElementById('btn-darkmode');
const sidebarDark = document.querySelector('.sidebar');
const img_logo = document.getElementById('logo_img')

// Adiciona um evento de clique ao botão
btnLightMode.addEventListener('click', function () {
    // Alterna a classe 'dark-mode' no body e na sidebar
    document.body.classList.toggle('light-mode');
    sidebarDark.classList.toggle('light-mode');

    // Verifica se o Dark Mode está ativo ou não após alternar a classe
    const darkModeAtivo = sidebarDark.classList.contains('light-mode');
    if (darkModeAtivo) {
        img_logo.src = '.././assets/imgs/logo_black.svg'
    } else {
        img_logo.src = '.././assets/imgs/logo_white.svg'
    }
});
