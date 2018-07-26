var scroll = document.getElementById("scroll");
var clicka = false;
scroll.addEventListener('click', () => {
    clicka = !clicka;
    console.log(clicka)
    if (clicka) {
        document.getElementById("scroll").className = "hover";
    } else {
        document.getElementById("scroll").className = "out";
    }
}, false);

var menu = document.getElementById("menu");
var clickb = false;
menu.addEventListener('click', () => {
    clickb = !clickb;
    console.log(clickb)
    if (clickb) {
        document.getElementById("menu").className = "hover";
        document.getElementById("menus").className = "hover";
    } else {
        document.getElementById("menu").className = "";
        document.getElementById("menus").className = "";
    }
}, false);