const typingText = document.querySelector('.typing-text p');
const inpField = document.querySelector(".wrapper .input-field");
const mistakeTag = document.querySelector('.mistake span');
const timeTag = document.querySelector('.time span b');
const wpmTag = document.querySelector('.wpm span');
const cpmTag = document.querySelector('.cpm span');
const tryAgainBtn = document.querySelector('button')

let charIndex = 0;
let mistakes = 0;
let timer, timeTaken = 0;
let isTyping = 0;

function randomParagraph(){
    let randIndex = Math.floor(Math.random()*paragraphs.length);
    paragraphs[randIndex].split("").forEach(letter => {
        let spanTag = `<span>${letter}</span>`;
        typingText.innerHTML += spanTag;
    });

    typingText.querySelectorAll('span')[0].classList.add('active');

    document.addEventListener("keydown", inpField.focus() );

    typingText.addEventListener("click", ()=> inpField.focus());
}


function initTyping(){
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];

    if(charIndex<characters.length-1){
        if(!isTyping){
            timer = setInterval(initTimer, 1000);
            isTyping = 1;
        }
        
        
        if(typedChar === undefined){
            // backspace
            charIndex--;
            characters[charIndex].classList = [];
        }
        else if(characters[charIndex].innerText === typedChar){
            characters[charIndex].classList = [];
            characters[charIndex].classList.add("correct");
            charIndex++;
        }
        else{
            characters[charIndex].classList = [];
            characters[charIndex].classList.add("incorrect");
            charIndex++;        
            mistakes++;
        }
        
        mistakeTag.innerText = mistakes;
        characters[charIndex].classList.add('active');
        
        // let wpm = Math.round(((charIndex-mistakes)/5)/timeTaken * 60);
        // wpm = wpm==Infinity || !wpm?0:wpm;
        // wpmTag.innerText = wpm;
    }
    else{
        inpField.value = "";
        clearInterval(timer);
    }
}

function initTimer(){
    timeTaken++;
    timeTag.innerText = timeTaken;
    let wpm = Math.round(((charIndex-mistakes)/5)/timeTaken * 60);
    wpm = wpm==Infinity || !wpm?0:wpm;
    wpmTag.innerText = wpm;
}

function resetGame(){
    typingText.innerText = "";
    randomParagraph();
    clearInterval(timer);
    inpField.value = "";
    charIndex = 0;
    mistakes = 0;
    timeTaken = 0;
    isTyping = 0;
    timeTag.innerText = 0;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = 0;
}

randomParagraph();

inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);