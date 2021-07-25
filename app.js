const quotes = data;
const para = document.querySelector('p');
const textArea = document.querySelector('textarea');
const timeSpan = document.querySelector('p span');
const restartBtn = document.querySelector('#again-btn');

para.innerText = quotes[Math.floor(Math.random() * quotes.length)].text;
let arr = para.innerText.split("");
let nextCorrect = 0;
let charactersEntered = 0;
let timerStarted = false;
let interval, time = 0;

textArea.focus();

textArea.addEventListener('keydown', (e) => {

    if (e.code === 'Backspace') {
        charactersEntered = (charactersEntered>0) ? (charactersEntered-1) : 0;

        if(charactersEntered <= nextCorrect) {
            textArea.classList.remove('red');
            textArea.classList.add('green');

            if(charactersEntered <= nextCorrect-1)
                nextCorrect = (nextCorrect>0)?(nextCorrect-1):0;
        }

    } else if (validCharacter(e.keyCode)) {

        startTimer();


        if(e.key == arr[nextCorrect] || e.code === "Quote" && arr[nextCorrect].charCodeAt(0) === 8217) {
            nextCorrect++;
            charactersEntered++;
            //console.log(`nextCorrect:${nextCorrect}; charactersEntered:${charactersEntered}`);
        } else {
            charactersEntered++;
            //console.log(`No: ${arr[nextCorrect]} vs ${e.key}\ni:${nextCorrect}; charactersEntered:${charactersEntered}`);

            textArea.classList.remove('green');
            textArea.classList.add('red');
        }
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
        console.log('Timer started');
        timerStarted = true;
        interval = setInterval(() => time++, 1000);
    }
}

function stopTimer() {
    if(interval) {
        console.log('Timer stopped');
        clearInterval(interval);
        displayResult();
    }
}

function displayResult() {
    interval = null;
    timerStarted = false;
    timeSpan.innerText = `${Math.floor(60*arr.length/(5*time))} wpm`;
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