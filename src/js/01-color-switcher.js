const btnStartRef = document.querySelector('[data-start]');
const btnStopRef = document.querySelector('[data-stop]');

let intervalId = null;

const onClickBtnStart = event => {
    onBtnDisabled();
    intervalId = setInterval(() => {
        const color = getRandomHexColor();
        document.body.style.backgroundColor = `${color}`;
    }, 1000);
};

const onClickBtnStop = event => {
    onBtnDisabled();
    clearInterval(intervalId);
};

function onBtnDisabled() {
    if (!btnStartRef.disabled) {
        btnStartRef.disabled = true;
        btnStopRef.disabled = false;
    } else {
        btnStartRef.disabled = false;
        btnStopRef.disabled = true;
    }
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

btnStartRef.addEventListener('click', onClickBtnStart);
btnStopRef.addEventListener('click', onClickBtnStop);

