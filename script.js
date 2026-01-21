
const baseDate = new Date(2026, 0, 18);

let currentDate = new Date();

const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("monthYear");

function generateCalendar() {
    calendar.innerHTML = "";

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    monthYear.textContent = currentDate.toLocaleDateString("es-ES", {
        month: "long",
        year: "numeric"
    });

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let startDay = firstDay === 0 ? 6 : firstDay - 1;

    for (let i = 0; i < startDay; i++) {
        calendar.appendChild(document.createElement("div"));
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const diffDays = Math.floor((date - baseDate) / (1000 * 60 * 60 * 24));
        let cycle = diffDays % 3;
        if (cycle < 0) cycle += 3;

       const cell = document.createElement("div");
cell.textContent = day;

// RESALTAR DÍA ACTUAL
const today = new Date();
if (
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear()
) {
    cell.classList.add("today");
}


        if (cycle === 0) cell.classList.add("entry");
        if (cycle === 1) cell.classList.add("exit");
        if (cycle === 2) cell.classList.add("rest");

        calendar.appendChild(cell);
    }
}

function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar();
}

generateCalendar();
let startX = 0;
let endX = 0;

const calendarContainer = document.querySelector(".calendar-container");

calendarContainer.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
});

calendarContainer.addEventListener("touchend", e => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            nextMonth(); // swipe izquierda
        } else {
            prevMonth(); // swipe derecha
        }
    }
}

