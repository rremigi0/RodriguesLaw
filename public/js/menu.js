var iconMenu = document.getElementById('iconMenu');
var sidebar = document.getElementById('sidebar');
var mainContent = document.getElementById('mainContent');
sidebar.style.left = '-300px';

var w = window.innerWidth;

window.addEventListener("resize", () => {
    w = window.innerWidth;
})

if (w <= 768) {
    sidebar.classList.add('hide')
} else {
    sidebar.classList.remove('hide')
}

function responsiveSidebar () {
    if (w <= 768) {
        if ( sidebar. classList.contains('hide') || sidebar.style.left == '-300px') {
            sidebar.classList.remove('hide')
            sidebar.style.left = '0px';
        } else {
            sidebar.style.left = '-300px';
        }
    } else {
      if (sidebar.style.display == 'none') {
        sidebar.style.display = 'block';
        mainContent.style.width = 'calc( 100% - 300px )';
      } else {
        sidebar.style.display = 'none';
        mainContent.style.width = '100%';
      }
    }
}
    