document.addEventListener("DOMContentLoaded", function () {   
    const timerSection = document.querySelector(".timerSection");  
    const echolocationSection = document.querySelector(".echolocationSection");  
    const circles = document.querySelectorAll(".circle1, .circle2, .circle3, .circle4");  
    const equalizers = document.querySelectorAll(".equalizer"); 
    const textBlockMap2 = document.querySelector(".text-block-map2"); 

    const audioFiles = {
        circle1: new Audio("assets/sound1.mp3"),
        circle2: new Audio("assets/sound2.mp3"),
        circle3: new Audio("assets/sound3.mp3"),
        circle4: new Audio("assets/sound4.mp3")
    };

    Object.keys(audioFiles).forEach(key => {
        audioFiles[key].addEventListener("canplaythrough", function () {
            console.log(`${key} загружен`);
        });
        audioFiles[key].addEventListener("error", function () {
            console.error(`Ошибка загрузки ${key}`);
        });
    });

    if (timerSection) {
        timerSection.classList.add("hidden");
        console.log("Секция timerSection скрыта при загрузке");
    }

    // запуск аудио при клике на кружок
    circles.forEach(circle => {
        circle.addEventListener("click", function () {
            console.log("Клик на круг:", this.classList[0]);

            if (textBlockMap2) {
                textBlockMap2.style.display = "none";  
                console.log("text-block-map2 скрыт");
            }

            // проигрыш звука
            const className = this.classList[0]; 
            const audio = audioFiles[className];
            if (audio) {
                audio.volume = 0.4;
                audio.play().catch(error => console.error("Ошибка воспроизведения:", error));
            }

            // показ эквалайзера для кружка
            const equalizer = this.querySelector(".equalizer");
            if (equalizer) {
                equalizer.classList.add("active");
            }
        });
    });

    function hideCirclesAndEqualizers() {
        circles.forEach(circle => {
            circle.style.display = "none";
        });

        equalizers.forEach(equalizer => {
            equalizer.classList.remove("active");
        });

        console.log("Все кружочки и эквалайзеры скрыты.");
    }

});

