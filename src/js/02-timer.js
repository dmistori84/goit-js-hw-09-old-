import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const inputData = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const valueDays = document.querySelector('[data-days]');
const valueHours = document.querySelector('[data-hours]');
const valueMinutes = document.querySelector('[data-minutes]');
const valueSeconds = document.querySelector('[data-seconds]');

btnStart.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  
  onClose(selectedDates) {
           
     if (selectedDates[0] < Date.now()) { 
          btnStart.setAttribute('disabled', true);
          Notiflix.Notify.failure('Please choose a date in the future');
          return;
      }
      
      btnStart.removeAttribute('disabled');
               
      btnStart.addEventListener('click', onClickStartBtn);

      function onClickStartBtn() { 
        btnStart.setAttribute('disabled', true);
          
        const timeWork = setInterval(() => { 
            const differenceTime = selectedDates[0] - Date.now(); 
            const timeComp = convertMs(differenceTime);
            showTime(timeComp);
            if (differenceTime < 1000) {
                Notiflix.Notify.success('Время закончилось!');
                clearInterval(timeWork);
            }
          }, 1000)
      }
    },
 
};

flatpickr(inputData, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function showTime({ days, hours, minutes, seconds }) { 
    valueDays.textContent = `${days}`;
    valueHours.textContent = `${hours}`;
    valueMinutes.textContent = `${minutes}`;
    valueSeconds.textContent = `${seconds}`;
};

function addLeadingZero(value) {
      return String(value).padStart(2, '0');
}