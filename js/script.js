const sidebar = document.querySelector('.sidebar');
const btn = document.querySelector('#btn');
logo_img.onclick = function () {
  if (!x.matches) {
    sidebar.classList.toggle('open');
  }
};
btn.onclick = function () {
  if (!x.matches) {
    sidebar.classList.remove('open');
  }
};

function myFunction(x) {
  if (x.matches) {
    sidebar.classList.remove('open');
  }
}

var x = window.matchMedia('(max-width: 700px)');
myFunction(x);
x.addListener(myFunction);
