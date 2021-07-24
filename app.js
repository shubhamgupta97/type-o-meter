// const para = document.querySelector('p');
// const arr = para.innerText.split("");

const quotes = data;
const para = document.querySelector('p');
para.innerText = quotes[Math.floor(Math.random() * quotes.length)].text;

let arr = para.innerText.split("");

const textArea = document.querySelector('textarea');
let nextCorrect = 0;
let charactersEntered = 0;

const timeSpan = document.querySelector('p span');
const restartBtn = document.querySelector('#again-btn');

let timerStarted = false;
let interval, time = 0;

textArea.focus();

textArea.addEventListener('keydown', (e) => {

    startTimer();

    if(e.code === 'Backspace') {
        charactersEntered = (charactersEntered>0) ? (charactersEntered-1) : 0;

        if(charactersEntered <= nextCorrect) {
            textArea.classList.remove('red');
            textArea.classList.add('green');

            if(charactersEntered <= nextCorrect-1)
                nextCorrect = (nextCorrect>0)?(nextCorrect-1):0;
        }

    } else if(e.key == arr[nextCorrect] || e.code === "Quote" && arr[nextCorrect].charCodeAt(0) === 8217) {
        nextCorrect++;
        charactersEntered++;
        console.log(`nextCorrect:${nextCorrect}; charactersEntered:${charactersEntered}`);
    } else if(e.key !== 'Shift' && e.key !== 'Caps' && e.key !== 'Backspace' && e.key !== "Control" && e.key !== "Alt"){
        charactersEntered++;
        console.log(`No: ${arr[nextCorrect]} vs ${e.key}\ni:${nextCorrect}; charactersEntered:${charactersEntered}`);

        textArea.classList.remove('green');
        textArea.classList.add('red');
    }

    if(nextCorrect == arr.length)
        stopTimer();
});

restartBtn.addEventListener('click', () => {
    restartBtn.style.display = 'none';
    textArea.disabled = false;
    textArea.value = "";
    textArea.focus();
    timeSpan.innerText = "";
    para.innerText = quotes[Math.floor(Math.random() * quotes.length)].text;
    arr = para.innerText.split("");
    nextCorrect = 0;
    charactersEntered = 0;
    time = 0;
    timerStarted = false;
    clearInterval(interval);
    interval = null;
});

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

function makeRed() {
    this.classList.remove('green');
    this.classList.add('red');
}

function displayResult() {
    interval = null;
    timerStarted = false;
    timeSpan.innerText = `${Math.floor(60*arr.length/(5*time))} wpm`;
    restartBtn.style.display = 'inline-block';
    interval = setInterval(() => textArea.disabled = true, 1);
}