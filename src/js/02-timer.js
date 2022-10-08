import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnStartRef = document.querySelector('[data-start]');
const dataDaysRef = document.querySelector('[data-days]');
const dataHoursRef = document.querySelector('[data-hours]');
const dataMinutesRef = document.querySelector('[data-minutes]');
const dataSecondsRef = document.querySelector('[data-seconds]');

let intervalId = null;
let timeSelected = null;

btnStartRef.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
    minuteIncrement: 1,
  
    onClose(selectedDates) {
    timeSelected = selectedDates[0].getTime();
        console.log(selectedDates[0]);
        if (timeSelected < new Date()) {
            Notify.failure('Please choose a date in the future');
            return;
        }
        btnStartRef.classList.add('btn');
        btnStartRef.disabled = false;
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

let object = {};

const timeOnCount = () => {
    intervalId = setInterval(() => {
        const delta = timeSelected - new Date().getTime();
        if (delta <= 0) {
            clearTimeout(intervalId);
            return;
        }
        object = convertMs(delta);
        onChangeTime(addLeadingZero(object));
        console.log(delta);
    }, 1000);
};

function addLeadingZero(values) {
  const newValues = { ...values };
  const keys = Object.keys(newValues);
  for (const key of keys) {
    newValues[key] = String(newValues[key]).padStart(2, '0');
  }
  return newValues;
}

function onChangeTime({ days, hours, minutes, seconds }) {
  dataDaysRef.textContent = days;
  dataHoursRef.textContent = hours;
  dataMinutesRef.textContent = minutes;
  dataSecondsRef.textContent = seconds;
}

btnStartRef.addEventListener('click', timeOnCount);