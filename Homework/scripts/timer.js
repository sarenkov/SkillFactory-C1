//поиск элементов по классам
const getElementByClass = (selector) => document.querySelector('.' + selector);


//кнопки
const timer = getElementByClass('countdown');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');
const minutesInput = document.querySelector('.minutes-input')
const secondsInput = document.querySelector('.seconds-input')
const message = document.querySelector('.message');
const plusSec = document.querySelector('.plus-second');
const plusMin = document.querySelector('.plus-minute');
const minusSec = document.querySelector('.minus-second');
const minusMin = document.querySelector('.minus-minute');
const start = document.querySelector('.start');
restart = document.querySelector('.restart');

//стартовые параметры счетчиков
minutes.innerHTML = "00";
seconds.innerHTML = "00";
let countSec = 0;
let countMin = 0;

const updateText = () => {
    minutes.innerHTML = (0 + String(countMin)).slice(-2);
    seconds.innerHTML = (0 + String(countSec)).slice(-2);
}

const setCounts = () => {
    countSec = secondsInput.value;
    countMin = minutesInput.value;
    updateText();
}

const resetCounts = () => {
    minutesInput.value = 0;
    secondsInput.value = 0;
    countSec = 0;
    countMin = 0;
}

const increase = () => {
    if (countSec < 59) {
        ++countSec;
    } else {
        countSec = 0;
        ++countMin;
    }
}

const increaseMin = () => {
    ++countMin;
}

const decrease = () => {
    if (countMin <= 0 && countSec === 0) {
        countSec = 0;
        countMin = 0;
        return;
    }
    if (countSec > 0) --countSec;
    else {
        countSec = 59;
        --countMin;
    }

}

const decreaseMin = () => {
    if (countMin > 0) {
        --countMin;
    }

}

const countDown = () => {
    let total = countSec + countMin * 60;
    const timeinterval = setTimeout(countDown, 1000);
    if (total <= 0) {
        clearInterval(timeinterval);
        message.innerHTML = '<p>I am done...</p>'
        message.setAttribute('style', 'display: ');
    }
    if (countSec > 0) countSec--;
    else {
        if (countMin > 0) {
            countSec = 59;
            countMin--;
        }
    }
    updateText();
}

plusSec.onclick = () => {
    increase();
    secondsInput.stepUp();
}

plusMin.onclick = () => {
    increaseMin();
    minutesInput.stepUp();
}

minusSec.onclick = () => {
    decrease();
    secondsInput.stepDown();
}

minusMin.onclick = () => {
    decreaseMin();
    minutesInput.stepDown();
}

start.onclick = () => {
    updateText();
    setCounts();
    countDown();
    start.setAttribute('style', 'display: none');
    restart.setAttribute('style', 'display: ');
    plusSec.setAttribute('style', 'display: none');
    plusMin.setAttribute('style', 'display: none');
    minusSec.setAttribute('style', 'display: none');
    minusMin.setAttribute('style', 'display: none');
    minutesInput.setAttribute('disabled', '');
    secondsInput.setAttribute('disabled', '');
}

restart.onclick = () => {
    start.setAttribute('style', 'display: ');
    plusSec.setAttribute('style', 'display: ');
    plusMin.setAttribute('style', 'display: ');
    minusSec.setAttribute('style', 'display: ');
    minusMin.setAttribute('style', 'display: ');
    restart.setAttribute('style', 'display: none');
    message.setAttribute('style', 'display: none');
    minutesInput.removeAttribute('disabled');
    secondsInput.removeAttribute('disabled');
    resetCounts();
    updateText();
}

secondsInput.addEventListener('input', setCounts);
minutesInput.addEventListener('input', setCounts);