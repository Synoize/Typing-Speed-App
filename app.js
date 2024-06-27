const typing = document.querySelector("#container #typing p");
const input = document.querySelector("#input-field input");
const time = document.querySelector("#time span b");
const mistakes = document.querySelector("#mistakes span");
const wpm = document.querySelector("#wpm span");
const cpm = document.querySelector("#cpm span");
const btn = document.querySelector("button");


//set value

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;


function loadParagraph() {
    const paragraph = ["The sun rises, painting the sky with hues of orange and pink.",
        "Birds chirp, greeting the day with their melodious songs.",
        "Dew-kissed grass sparkles under the morning light.",
        "A gentle breeze whispers through the leaves.",
        "Children laugh as they play in the park.",
        "Coffee brews, filling the air with its rich aroma.",
        "Commuters rush to catch buses and trains.",
        "Office lights flicker on, signaling the start of a busy day.",
        "Meetings, emails, deadlines-the daily hustle.",
        "Lunchtime arrives; colleagues gather to share stories.",
        "Afternoon sun warms faces, inviting daydreams.",
        "Homework, projects-the student's burden.",
        "Evening traffic crawls, taillights glowing like fireflies.",
        "Families reunite, dinner tables filled with laughter.",
        "Stars emerge, painting constellations in the night sky.",
        "Bedtime stories, whispered secrets, dreams take flight.",
        "Midnight-silence broken by distant sirens.",
        "Night owls work, lost in the glow of screens.",
        "The moon watches over, a silent guardian.",
        "And so, another day ends, woven into life tapestry."];

    const randomIndex = Math.floor(Math.random() * paragraph.length);

    typing.innerHTML = '';

    for (const char of paragraph[randomIndex]) {
        console.log(char);
        typing.innerHTML += `<span>${char}</span>`
    }

    typing.querySelectorAll('span')[0].classList.add('active');
    document.querySelector('keydown', () => input.focus());
    typing.addEventListener('click', () => {
        input.focus();
    })
}


//hendle 

function initTyping() {
    const char = typing.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);

    if (charIndex < char.length && timeLeft > 0) {

        if (!isTyping) {
            timer = setInterval(initTime, 1000);
            isTyping = true;
        }

        if (char[charIndex].innerText === typedChar) {
            char[charIndex].classList.add('correct');
            console.log('correct');
        } else {
            mistake++;
            char[charIndex].classList.add('incorrect');
            console.log('incorrect');
        }
        charIndex++;
        char[charIndex].classList.add('active');
        mistakes.innerText = mistake;

        cpm.innerText = charIndex - mistake;
    } else {
        clearInterval(timer);
        input.value = '';
    }
}

function initTime() {
    if (timeLeft > 0) {
        timeLeft--;
        time.innerText = timeLeft;

        // if you typed 200 characters in 1 minute, your net wpm typing speed would be '(200 characters / 5) / (1 min)' = 40 WPM. 
        let wpmVal = Math.round((charIndex - mistake) / 5 / (maxTime - timeLeft) * 60);

        wpm.innerText = wpmVal;
    } else {
        clearInterval(timer);
    }
}

function reset() {
    loadParagraph();
    clearInterval(timer);
    maxTime = 60;
    timeLeft = maxTime;
    time.innerText= timeLeft;
    input.value = '';
    charIndex = 0;
    mistake = 0;
    isTyping = false;
    wpm.innerText = 0;
    cpm.innerText = 0;
    mistakes.innerText = 0;
}

input.addEventListener('input', initTyping);
btn.addEventListener('click', reset);
loadParagraph();