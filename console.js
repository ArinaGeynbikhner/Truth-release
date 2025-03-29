document.addEventListener("DOMContentLoaded", function () {
    
    const ferstSection = document.querySelector(".my_common_screen");
    const towSection = document.querySelector(".section2");
    const nextSection = document.querySelector(".nextSection");
    const finalSection = document.querySelector(".finalSection");
    const echolocationSection = document.querySelector(".echolocationSection");
    const timerSection= document.querySelector(".timerSection");
  
    
    const yes2 = document.querySelector(".yes2");
    const yes3 = document.querySelector(".yes3");
    const yes4 = document.querySelector(".yes4");
    const yes5 = document.querySelector(".yes5");
    

    const no2 = document.querySelector(".no2");
    const no3 = document.querySelector(".no3");
    const no4 = document.querySelector(".no4");
    const no5 = document.querySelector(".no5");
    
    
    
    // кнопка NO для второй секции
    no2.addEventListener("click", function () {
        towSection.classList.add("hidden"); // скрываем текущую секцию
        ferstSection.classList.remove("hidden"); // показываем новую секцию
    });

    // кнопка YES для второй секции
    

    yes2.addEventListener("click", function () {
        towSection.classList.add("hidden"); // скрываем текущую секцию
        nextSection.classList.remove("hidden"); // показываем новую секцию
    });


    // кнопка NO для третьей секции
    
    
    no3.addEventListener("click", function () {
        nextSection.classList.add("hidden"); // скрываем текущую секцию
        ferstSection.classList.remove("hidden"); // Показываем новую секцию
    });

    // кнопка YES для третьей секции
    
    yes3.addEventListener("click", function () {
        nextSection.classList.add("hidden"); // скрываем текущую секцию
        finalSection.classList.remove("hidden"); // показываем новую секцию
    });

    // кнопка NO для четвертой секции

    no4.addEventListener("click", function () {
        finalSection.classList.add("hidden"); // скрываем текущую секцию
        ferstSection.classList.remove("hidden"); // показываем новую секцию
    });

    // кнопка YES для четвертой секции
    
    // yes4.addEventListener("click", function () {
    //     finalSection.classList.add("hidden"); // скрываем текущую секцию
    //     echolocationSection.classList.remove("hidden"); // показываем новую секцию
    // });

        // Кнопка NO для пятой секции

    no5.addEventListener("click", function () {
        echolocationSection.classList.add("hidden"); // скрываем текущую секцию
        ferstSection.classList.remove("hidden"); // показываем новую секцию
    });

    // кнопка YES для пятой секции
    
    yes5.addEventListener("click", function () {
        echolocationSection.classList.add("hidden"); // скрываем текущую секцию
        timerSection.classList.remove("hidden"); // соказываем новую секцию
    });


    yes4.addEventListener("click", function () {
        finalSection.classList.add("hidden"); // скрываем текущую секцию
        echolocationSection.classList.remove("hidden"); // показываем новую секцию
        setTimeout(() => {
            echolocationSection.classList.add("show"); // добавляем плавное появление
        }, 10);
    });
});
