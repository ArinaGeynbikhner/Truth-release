document.addEventListener("DOMContentLoaded", function () {
    // массив для скролла
    const pairs = [
        [".building1", ".center"],
        [".building2", ".tunnel1-6-08"],
        [".building3", ".tunnel1-9-07"],
        [".building4", ".tunnel1-10-06"],
        [".building6", ".tunnel2-3-01"],
        [".building7", ".tunnel2-5-06"],
        [".building8", ".tunnel2-8-10"],
        [".building9", ".tunnel3-1-02"],
        [".building24", ".tunnel3-3-06"],
        [".building10", ".tunnel3-6-08"],
        [".building11", ".tunnel3-9-10"],
        [".building12", ".tunnel4-2-03"],
        [".building13", ".tunnel4-5-07"],
        [".building14", ".tunnel5-2-03"],
        [".building15", ".tunnel5-6-08"],
        [".building16", ".tunnel5-7-10"],
        [".building17", ".tunnel6-6-03"],
        [".building18", ".tunnel6-9-09"],
        [".building23", ".tunnel6-10-10"],
        [".building20", ".tunnel7-1-02"],
        [".building21", ".tunnel7-3-10"],
        [".building22", ".tunnel7-6-10"],
        [".building19", ".tunnel8-6-10"]
    ];

    // массив для независимой анимации
    const independentPairs = [
        [".building1", ".center"],
        [".building2", ".tunnel1-6-08"],
        [".building3", ".tunnel1-9-07"],
        [".building4", ".tunnel1-10-06"],
        [".building6", ".tunnel2-3-01"],
        [".building7", ".tunnel2-5-06"],
        [".building8", ".tunnel2-8-10"],
        [".building9", ".tunnel3-1-02"],
        [".building24", ".tunnel3-3-06"],
        [".building10", ".tunnel3-6-08"],
        [".building11", ".tunnel3-9-10"],
        [".building12", ".tunnel4-2-03"],
        [".building13", ".tunnel4-5-07"],
        [".building14", ".tunnel5-2-03"],
        [".building15", ".tunnel5-6-08"],
        [".building16", ".tunnel5-7-10"],
        [".building17", ".tunnel6-6-03"],
        [".building18", ".tunnel6-9-09"],
        [".building23", ".tunnel6-10-10"],
        [".building20", ".tunnel7-1-02"],
        [".building21", ".tunnel7-3-10"],
        [".building22", ".tunnel7-6-10"],
        [".building19", ".tunnel8-6-10"]
    ];

    let currentIndex = 0; // индекс для скролл-анимации (полный массив)
    let scrolled = false; // флаг, что уже был скролл
    let fadeTimeouts = []; // массив для хранения ID таймаутов независимой анимации

    // независимая анимация
    function addIndependentFadeAnimation() {
        independentPairs.forEach((pair, index) => {
            const timeoutId = setTimeout(() => {
                if (!scrolled) { // если ещё не начат скролл
                    const [building, tunnel] = pair;
                    const buildingElement = document.querySelector(building);
                    const tunnelElement = document.querySelector(tunnel);
                    if (buildingElement && tunnelElement) {
                        buildingElement.classList.add("fadeInOut");
                        tunnelElement.classList.add("fadeInOut");
                    }
                }
            }, index * 1000); 
            fadeTimeouts.push(timeoutId);
        });
    }

    function stopIndependentFadeOnScroll() {
        const stopFunction = () => {
            if (!scrolled) {
                scrolled = true;
                fadeTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
                fadeTimeouts = [];
                independentPairs.forEach(pair => {
                    pair.forEach(selector => {
                        const element = document.querySelector(selector);
                        if (element) {
                            element.classList.remove("fadeInOut");
                        }
                    });
                });
            }
        };

        window.addEventListener("scroll", stopFunction, { once: true });
        document.addEventListener("wheel", stopFunction, { once: true });
    }

    function showNextPair() {
        if (currentIndex < pairs.length) {
            const [building, tunnel] = pairs[currentIndex];
            const buildingElement = document.querySelector(building);
            const tunnelElement = document.querySelector(tunnel);
            if (buildingElement) buildingElement.classList.add("show");
            if (tunnelElement) tunnelElement.classList.add("show");
            currentIndex++;
        }
    }

    function hidePreviousPair() {
        if (currentIndex > 0) {
            currentIndex--;
            const [building, tunnel] = pairs[currentIndex];
            const buildingElement = document.querySelector(building);
            const tunnelElement = document.querySelector(tunnel);
            if (buildingElement) buildingElement.classList.remove("show");
            if (tunnelElement) tunnelElement.classList.remove("show");
        }
    }

    function handleScroll(event) {
        if (event.deltaY > 0) {
            showNextPair(); 
        } else if (event.deltaY < 0) {
            hidePreviousPair(); 
        }
    }

    // запуск независимой анимацию сразу после загрузки
    addIndependentFadeAnimation();

    // останавка независимой анимации при первом скролле
    stopIndependentFadeOnScroll();

    document.addEventListener("wheel", handleScroll);
});
