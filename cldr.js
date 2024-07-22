document.addEventListener('DOMContentLoaded', function() {
    const calendarGrid = document.getElementById('calendar-grid');
    const calendarTitle = document.getElementById('calendar-title');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const eventModal = document.getElementById('eventModal');
    const closeBtn = document.querySelector('.close');
    const addEventBtn = document.getElementById('addEventBtn');
    const eventDate = document.getElementById('eventDate');
    const eventDescription = document.getElementById('eventDescription');

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

    // Función para generar el calendario
    function generateCalendar(month, year) {
        calendarTitle.textContent = `${months[month]} ${year}`;
        calendarGrid.innerHTML = '';

        // Obtener el primer día del mes y el número de días en el mes
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const daysInMonth = lastDayOfMonth.getDate();

        // Obtener el día de la semana del primer día del mes
        const startingDay = firstDayOfMonth.getDay();

        // Rellenar los días previos si el mes no empieza en Domingo
        for (let i = 0; i < startingDay; i++) {
            const prevMonthDays = document.createElement('div');
            prevMonthDays.classList.add('calendar-day', 'disabled');
            prevMonthDays.textContent = '';
            calendarGrid.appendChild(prevMonthDays);
        }

        // Rellenar los días del mes actual
        for (let day = 1; day <= daysInMonth; day++) {
            const calendarDay = document.createElement('div');
            calendarDay.classList.add('calendar-day');
            calendarDay.textContent = day;
            calendarDay.setAttribute('data-day', day);
            calendarGrid.appendChild(calendarDay);
        }

        // Añadir eventos a los días clickeables
        const calendarDays = document.querySelectorAll('.calendar-day:not(.disabled)');
        calendarDays.forEach(day => {
            day.addEventListener('click', () => {
                eventDate.value = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.getAttribute('data-day').padStart(2, '0')}`;
                eventModal.style.display = 'block';
            });
        });
    }

    // Mostrar el calendario del mes actual al cargar la página
    generateCalendar(currentMonth, currentYear);

    // Evento para cambiar al mes anterior
    prevBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        generateCalendar(currentMonth, currentYear);
    });

    // Evento para cambiar al mes siguiente
    nextBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateCalendar(currentMonth, currentYear);
    });

    // Cerrar modal de evento
    closeBtn.addEventListener('click', () => {
        eventModal.style.display = 'none';
    });

    // Añadir evento al calendario
    addEventBtn.addEventListener('click', () => {
        const date = eventDate.value;
        const description = eventDescription.value;

        // Aquí puedes implementar la lógica para guardar el evento, por ejemplo:
        alert(`Evento añadido el ${date}: ${description}`);

        // Limpiar campos y cerrar modal
        eventDate.value = '';
        eventDescription.value = '';
        eventModal.style.display = 'none';
    });
});
