const quotes = data;
const para = document.querySelector('figure blockquote p');
const caption = document.querySelector('figcaption');
const textArea = document.querySelector('textarea');
const speedSpan = document.querySelector('#speed span');
const restartBtn = document.querySelector('#again-btn');

let arr = [];
let nextCorrect;
let charactersEntered;
let timerStarted;
let interval, time;
let isIncorrect;

initialize();

textArea.addEventListener('keydown', (e) => {

    if (e.code === 'Backspace') {
        charactersEntered = (charactersEntered>0) ? (charactersEntered-1) : 0;

        if(charactersEntered <= nextCorrect) {
            textArea.classList.remove('incorrect');
            isIncorrect = false;

            if(charactersEntered <= nextCorrect-1)
                nextCorrect = (nextCorrect>0)?(nextCorrect-1):0;
        }

    } else if (validCharacter(e.keyCode)) {

        startTimer();
        charactersEntered++;

        if(!isIncorrect && (e.key === arr[nextCorrect] || e.code === "Quote" && arr[nextCorrect].charCodeAt(0) === 8217)) {
            nextCorrect++;
        } else {
            isIncorrect = true;
            textArea.classList.add('incorrect');
        }
    }

    if(nextCorrect === arr.length)
        stopTimer();
});

restartBtn.addEventListener('click', () => {
    initialize();
});

window.addEventListener("orientationchange", () => {
    initialize();
});

function initialize() {

    if(isMobile()) return;

    isIncorrect = false;
    restartBtn.style.display = 'none';
    textArea.disabled = false;
    textArea.value = "";
    textArea.focus();
    speedSpan.innerText = "";
    let quote = quotes[Math.floor(Math.random() * quotes.length)];
    para.innerText = quote.text;
    caption.innerText = `${quote.source}`;
    arr = para.innerText.split("");
    nextCorrect = 0;
    charactersEntered = 0;
    time = 0;
    timerStarted = false;
    if(interval) {
        clearInterval(interval);
        interval = null;
    }
}

function startTimer() {
    if(timerStarted == false) {
        timerStarted = true;
        interval = setInterval(() => time++, 1000);
    }
}

function stopTimer() {
    if(interval) {
        clearInterval(interval);
        displayResult();
    }
}

function displayResult() {
    interval = null;
    timerStarted = false;
    speedSpan.innerText = `${Math.floor(60*arr.length/(5*time))} wpm`;
    restartBtn.style.display = 'inline-block';
    interval = setInterval(() => textArea.disabled = true, 1);
}

function validCharacter(keycode) {
    let valid = 
        (keycode > 47 && keycode < 58)   || // number keys
        keycode == 32 || keycode == 13   || // spacebar & return key(s)
        (keycode > 64 && keycode < 91)   || // letter keys
        (keycode > 95 && keycode < 112)  || // numpad keys
        (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
        (keycode > 218 && keycode < 223);   // [\]' (in order)

    return valid;
}

function isMobile() {
    if(window.screen.width < 480 || window.screen.height < 480) {
        para.innerText = "Please open the page on a desktop or a laptop. \n\nThank you :)";
        return true;
    }
}