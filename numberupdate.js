document.addEventListener("DOMContentLoaded", function () {
    const number1 = document.querySelector(".number");
    const number2 = document.querySelector(".number2");
    const number3 = document.querySelector(".number3");
    
    if (number2) number2.textContent = "12";
    if (number3) number3.textContent = "60";

    // функция для уменьшения числа с возможностью сброса
    function updateNumber(element, resetValue) {
        if (element) {
            let currentValue = parseInt(element.textContent, 10);
            
            // уменьшаем число
            currentValue -= 1;

            // если число достигло 0, сбрасываем его в resetValue
            if (currentValue < 0) {
                currentValue = resetValue;
            }

            element.textContent = currentValue;
        }
    }
    setInterval(() => {
        updateNumber(number, 12); // сбрасывается до 12 при достижении 0
        console.log("Число number2 обновлено (каждый час).");
    }, 86400);

    setInterval(() => {
        updateNumber(number2, 23); // Сбрасывается до 12 при достижении 0
        console.log("Число number2 обновлено (каждый час).");
    }, 3600);

    // обновление number3 
    setInterval(() => {
        updateNumber(number3, 59); // сбрасывается до 60 при достижении 0
        console.log("Число number3 обновлено (каждую минуту).");
    }, 60);

    console.log("Таймеры обновления чисел запущены.");
});

