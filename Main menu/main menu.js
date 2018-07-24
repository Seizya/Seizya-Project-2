var scroll = document.getElementById("scroll");

scroll.addEventListener('mouseenter', () => {
    document.getElementById("scroll").className = "hover";
}, false);

scroll.addEventListener('mouseleave', () => {
    document.getElementById("scroll").className = "out";
}, false)