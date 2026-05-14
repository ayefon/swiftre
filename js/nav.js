"use strict";

(function () {
    var toggle = document.querySelector(".menu-toggle");
    var sidebar = document.querySelector(".sidebar");

    if (toggle && sidebar) {
        toggle.addEventListener("click", function () {
            sidebar.classList.toggle("open");
        });

        document.addEventListener("click", function (e) {
            if (sidebar.classList.contains("open") &&
                !sidebar.contains(e.target) &&
                e.target !== toggle) {
                sidebar.classList.remove("open");
            }
        });
    }

    var links = document.querySelectorAll(".sidebar nav a");
    var current = window.location.pathname.split("/").pop() || "index.html";

    for (var i = 0; i < links.length; i++) {
        var href = links[i].getAttribute("href").split("/").pop();
        if (href === current) {
            links[i].classList.add("active");
        }
    }
})();
