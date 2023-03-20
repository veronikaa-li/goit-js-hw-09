
// Імпорт бібліотек//
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// DOM елементи
const refs = {
  input: document.querySelector('#datetime-picker'),
  start: document.querySelector('[data-start]'),
  timer: document.querySelector('.timer'),
  daysValue: document.querySelector('[data-days]'),
  hoursValue: document.querySelector('[data-hours]'),
  minutesValue: document.querySelector('[data-minutes]'),
  secondsValue: document.querySelector('[data-seconds]'),
};

// Параметри для flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future');
    } else {
      refs.start.disabled = false;
    }
  },
};

// Ініціалізація flatpickr
refs.start.addEventListener('click', () => {
  timer.start();
});
refs.start.disabled = true;
flatpickr(refs.input, options);

// Оновлення таймера
const timer = {
  intervalId: null,
  start() {
    const intervalId = setInterval(() => {
      const deltaTime = new Date(refs.input.value) - Date.now();
      if (deltaTime > 0) {
        const { days, hours, minutes, seconds } = convertMs(deltaTime);

        refs.daysValue.textContent = `${days}`;
        refs.hoursValue.textContent = `${hours}`;
        refs.minutesValue.textContent = `${minutes}`;
        refs.secondsValue.textContent = `${seconds}`;
        refs.start.disabled = true;
        convertMs(deltaTime);
      } else {
        clearInterval(intervalId);
        refs.start.disabled = false;
        refs.timer.style.color = 'green';
        Notify.success('Countdown is finished');
      }
    }, 1000);
  },
};

//Конвертування мілісекунд в інші одн часу//
function convertMs(ms) {
  // Кількість мілісекунд в одиниці часу
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

    // Дні 
  const days = pad(Math.floor(ms / day));
  // Години
  const hours = pad(Math.floor((ms % day) / hour));
  // Хвилини
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // секунди
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}








//   setTimeout(() => {
//     updateTimer(timeLeft - 1000);
//   }, 1000);
// }

// Обробка кліку на кнопку Start
// startBtn.addEventListener("click", () => {
//   const selectedDate = new Date(datePicker.value);
//   const now = new Date();
//   const timeLeft = selectedDate.getTime() - now.getTime();
//   updateTimer(timeLeft);
// });

//   // Оновлення елементів таймера після закінчення відліку
//   daysElem.textContent = "00";
//   hoursElem.textContent = "00";
//   minutesElem.textContent = "00";
//   secondsElem.textContent = "00";

//   // Деактивація таймера
//   timerElem.classList.remove("active");

//   // Виведення повідомлення про закінчення відліку
//   window.alert("Time is up!");
//  else {
//   // Оновлення елементів таймера на основі часу, що залишився
//   updateTimer();
// }

