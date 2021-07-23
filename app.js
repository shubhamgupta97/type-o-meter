const para = document.querySelector('p');
const arr = para.innerText.split("");

const textArea = document.querySelector('textarea');
let nextCorrect = 0;
let charactersEntered = 0;

const timeSpan = document.querySelector('p span');

let timerStarted = false;
let interval, time = 0;

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

function startTimer() {
    if(timerStarted == false) {
        timerStarted = true;
        interval = setInterval(() => time++, 1000);
    }
}

function stopTimer() {
    if(interval) {
        clearInterval(interval);
        interval = null;
        timerStarted = false;
        timeSpan.innerText = `${Math.floor(time*arr.length/(5*60))} wpm`;
        window.setInterval(() => textArea.disabled = true, 1);
    }
}

function makeRed() {
    this.classList.remove('green');
    this.classList.add('red');
}