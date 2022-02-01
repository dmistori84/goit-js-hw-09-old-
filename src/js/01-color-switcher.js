const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
let timerId = null;

btnStart.addEventListener('click', onBtnStartClick);
btnStop.addEventListener('click', onBtnStopClick);

function onBtnStartClick() { 
    timerId = setInterval(() => {
        document.body.style.background = getRandomHexColor(); 
    }, 1000);
    btnStart.setAttribute('disabled', true);     
};

function onBtnStopClick() { 
    clearInterval(timerId);
    btnStart.removeAttribute('disabled');
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};