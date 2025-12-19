"use strict";
const questions = [
    {
        id: 1,
        text: "Is Python a programming language?",
        options: ["Yes", "No", "I don't know", "Maybe"],
        trueIndex: 0,
    },
    {
        id: 2,
        text: "What is JavaScript primarily used for?",
        options: ["Front-end", "Back-end", "Both", "None"],
        trueIndex: 2,
    },
    {
        id: 3,
        text: "Which HTML tag is used to link a CSS file?",
        options: ["script", "link", "style", "css"],
        trueIndex: 1,
    },
    {
        id: 4,
        text: "What does CSS stand for?",
        options: [
            "Cascading Style Sheets",
            "Computer Styled Sections",
            "Creative Styling Syntax",
            "Code Styling Structure"
        ],
        trueIndex: 0,
    },
    {
        id: 5,
        text: "Which of the following is NOT a programming language?",
        options: ["Java", "HTML", "Python", "C++"],
        trueIndex: 1,
    },
    {
        id: 6,
        text: "Which company developed the React library?",
        options: ["Google", "Facebook", "Microsoft", "Amazon"],
        trueIndex: 1,
    },
    {
        id: 7,
        text: "What does the 'let' keyword do in JavaScript?",
        options: [
            "Defines a constant",
            "Declares a block-scoped variable",
            "Links HTML with JS",
            "Defines a global variable"
        ],
        trueIndex: 1,
    },
    {
        id: 8,
        text: "What is TypeScript?",
        options: [
            "A CSS preprocessor",
            "A superset of JavaScript",
            "A server framework",
            "A database language"
        ],
        trueIndex: 1,
    },
    {
        id: 9,
        text: "Which method is used to add an element at the end of an array in JS?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        trueIndex: 0,
    },
    {
        id: 10,
        text: "What is the output of: typeof null in JavaScript?",
        options: ["'null'", "'object'", "'undefined'", "'boolean'"],
        trueIndex: 1,
    }
];
let questionsIndex = 0;
let userAnswers = [];
let lock = false;
let startTime;
const questionContainer = document.getElementById("question-container");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const resultDiv = document.getElementById("result");
const conResult = document.getElementById("conResult");
const btnAgain = document.getElementById("btnAgain");
const time = document.getElementById("time");
function renderQestion() {
    const question = questions[questionsIndex];
    questionContainer.innerHTML = `
    <h2> Qestion ${questionsIndex + 1} as ${questions.length}</h2>
    <p>${question.text}</p>
    <div class="flex flex-row gap-3">
        ${question.options
        .map((Option, i) => {
        const check = userAnswers[questionsIndex] === i ? 'checked' : '';
        return `<div>
                <input type="radio" name="option" value="${i}" ${check}/>
                ${Option}
                </div>
                <br/>
                `;
    })
        .join('')}
        </div>
    `;
    if (questionsIndex === 0) {
        prevBtn.classList.add('disable');
    }
    else {
        prevBtn.classList.remove('disable');
    }
    ;
    nextBtn.textContent = questionsIndex === questions.length - 1 ? "End" : "Next";
    clearInterval(t);
    timer();
}
function saveAnswer() {
    const select = document.querySelector('input[name="option"]:checked');
    if (!select) {
        lock = true;
        return;
    }
    else {
        userAnswers[questionsIndex] = Number(select.value);
        lock = false;
    }
}
function scorExam() {
    let scor = 0;
    questions.forEach((q, i) => {
        if (userAnswers[i] === q.trueIndex) {
            scor++;
        }
    });
    return scor;
}
nextBtn.addEventListener('click', () => {
    saveAnswer();
    if (!lock) {
        if (questionsIndex < questions.length - 1) {
            questionsIndex++;
            renderQestion();
            time.textContent = '30';
        }
        else if (questionsIndex >= questions.length - 1) {
            const score = scorExam();
            if (score >= 7) {
                questionContainer.innerHTML = `<div class="font-bold text-2xl text-green-800">🧠 succeeded </div>`;
            }
            else {
                questionContainer.innerHTML = `<div class="font-bold text-2xl text-red-800">🧱 failure <//div>`;
            }
            prevBtn.style.display = "none";
            nextBtn.style.display = "none";
            resultDiv.textContent = `Your scor : ${score} as ${questions.length}`;
            onlineTime();
            conResult.classList.remove("hidden");
        }
    }
    else {
        alert("Please answer qestion ...");
    }
});
prevBtn.addEventListener("click", () => {
    saveAnswer();
    if (questionsIndex > 0) {
        questionsIndex--;
        renderQestion();
    }
});
btnAgain.addEventListener('click', () => {
    questionsIndex = 0;
    userAnswers = [];
    prevBtn.style.display = "block";
    nextBtn.style.display = "block";
    questionContainer.innerHTML = "";
    conResult.classList.add("hidden");
    time.textContent = '30';
    renderQestion();
});
let timeOff = Number(time.textContent);
let t;
;
function timer() {
    t = setInterval(() => {
        timeOff = Number(time.textContent);
        timeOff -= 1;
        time.textContent = String(timeOff);
        if (timeOff <= 0) {
            console.log('yes');
            questionContainer.innerHTML = `<div class="font-bold text-2xl text-red-800">🧱 failure <//div>`;
            time.textContent = 'time end';
            prevBtn.style.display = "none";
            nextBtn.style.display = "none";
            conResult.classList.remove("hidden");
            clearInterval(t);
        }
    }, 1000);
}
window.addEventListener('load', () => {
    startTime = Date.now();
});
function onlineTime() {
    let endTime = Date.now();
    let duration = endTime - startTime;
    let totalSecend = Math.floor(duration / 1000);
    time.textContent = `${totalSecend} s`;
    clearInterval(t);
    return;
}
renderQestion();
