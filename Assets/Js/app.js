document.addEventListener("DOMContentLoaded", function() {
    var header = document.getElementById("header"),
        intro = document.getElementById("intro"),
        introH = intro.clientHeight,
        scrollOffset = window.pageYOffset || document.documentElement.scrollTop,
        burger = document.getElementById("burger"),
        nav = document.getElementById("nav");

    checkScroll(scrollOffset);

    window.addEventListener("scroll", function() {
        scrollOffset = window.pageYOffset || document.documentElement.scrollTop;
        checkScroll(scrollOffset);
    });

    burger.addEventListener("click", function() {
        nav.classList.toggle("active");
    });

    function checkScroll(scrollOffset) {
        if (scrollOffset >= introH) {
            header.classList.add("fixed");
        } else {
            header.classList.remove("fixed");
        }
    }
});