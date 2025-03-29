document.addEventListener("DOMContentLoaded", function () {
    const circles = document.querySelectorAll(".circle1, .circle2, .circle3, .circle4");

    // создание точек для эквалайзера
    circles.forEach(function (circle) {
        const equalizer = circle.querySelector(".equalizer");
        const dotsGroup = equalizer.querySelector(".dots");
        const dotCount = 64; // Количество точек
        const radius = 45;  // Радиус круга

        // создание точек и добавление их в группу точек
        for (let i = 0; i < dotCount; i++) {
            const angle = (i / dotCount) * Math.PI * 2;
            const x = 50 + radius * Math.cos(angle);
            const y = 50 + radius * Math.sin(angle);

            const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            dot.setAttribute("cx", x);
            dot.setAttribute("cy", y);
            dot.setAttribute("r", "1");
            dot.classList.add("dot");

            // случайная задержка для анимации
            dot.style.animationDelay = `${Math.random() * 1.5}s`;

            dotsGroup.appendChild(dot);
        }
    });

    // анимация эквалайзера при клике
    circles.forEach(circle => {
        circle.addEventListener("click", function () {
            const className = this.classList[0]; 
            console.log(`Клик на ${className}`);

            const equalizer = this.querySelector(".equalizer");
            if (equalizer) {
                equalizer.classList.add("active");
            }
        });
    });
});


