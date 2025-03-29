document.addEventListener("DOMContentLoaded", () => {
    let blackHole = document.querySelector(".black-hole");
    let draggables = document.querySelectorAll(".draggable");
    let firstSection = document.querySelector(".my_common_screen");
    let secondSection = document.querySelector(".section2");

    // сохраняем исходное положение блоков
    const initialPositions = new Map();
    draggables.forEach(item => {
        initialPositions.set(item.id, {
            left: item.style.left,
            top: item.style.top,
            parent: item.parentElement,
        });
    });

    draggables.forEach(item => {
        item.addEventListener("mousedown", onDragStart);
        item.addEventListener("touchstart", onDragStart, { passive: false });

        function onDragStart(event) {
            event.preventDefault();
            let isTouch = event.type === "touchstart";
            let startX = isTouch ? event.touches[0].clientX : event.clientX;
            let startY = isTouch ? event.touches[0].clientY : event.clientY;

            let shiftX = startX - item.getBoundingClientRect().left;
            let shiftY = startY - item.getBoundingClientRect().top;

            item.style.position = "absolute";
            item.style.zIndex = 1000;
            document.body.append(item);

            moveAt(startX, startY);

            function moveAt(pageX, pageY) {
                item.style.left = pageX - shiftX + "px";
                item.style.top = pageY - shiftY + "px";
            }

            function onMove(event) {
                let moveX = isTouch ? event.touches[0].clientX : event.clientX;
                let moveY = isTouch ? event.touches[0].clientY : event.clientY;
                moveAt(moveX, moveY);
            }

            function onEnd() {
                document.removeEventListener(isTouch ? "touchmove" : "mousemove", onMove);
                document.removeEventListener(isTouch ? "touchend" : "mouseup", onEnd);

                const holeRect = blackHole.getBoundingClientRect();
                const itemRect = item.getBoundingClientRect();

                if (
                    itemRect.left + itemRect.width / 2 > holeRect.left &&
                    itemRect.left + itemRect.width / 2 < holeRect.right &&
                    itemRect.top + itemRect.height / 2 > holeRect.top &&
                    itemRect.top + itemRect.height / 2 < holeRect.bottom
                ) {
                    item.classList.add("falling");

                    setTimeout(() => {
                        if (item && item.parentElement) {
                            item.remove();
                            checkIfAllDisappeared();
                        }
                    }, 700);
                }
            }

            document.addEventListener(isTouch ? "touchmove" : "mousemove", onMove, { passive: false });
            document.addEventListener(isTouch ? "touchend" : "mouseup", onEnd);
        }

        item.ondragstart = function () {
            return false;
        };
    });

    function checkIfAllDisappeared() {
        const draggableElements = document.querySelectorAll(".draggable");
        if (draggableElements.length === 0) {
            hideSection(firstSection);
            resetDraggables(); // сброс и рековер draggable-блоков после скрытия первой секции
            showSection(secondSection);
        }
    }

    function hideSection(section) {
        if (section) {
            section.classList.add("hidden");
            console.log("Первая секция скрыта");
        }
    }

    function showSection(section) {
        if (section) {
            section.classList.remove("hidden");
            section.classList.add("show");
            section.style.opacity = 1;
            console.log("Вторая секция показана");
        }
    }

    //сброс и возврат draggable-блоков
    window.resetDraggables = function () {
        draggables.forEach(item => {
            const initialPosition = initialPositions.get(item.id);
            if (initialPosition) {
                item.style.position = "";
                item.style.left = initialPosition.left || "";
                item.style.top = initialPosition.top || "";
                initialPosition.parent.append(item);
                item.classList.remove("falling");
                item.style.display = "block";
            }
        });
        console.log("Элементы восстановлены!");
    };
});

