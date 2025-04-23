//a set of questions and answers for the quiz
const questions = [
    {
        question: "What is the game genre that focuses on multiplayer element?",
        answers: [
            {text: "Visual Novel(VN)", correct: false},
            {text: "Massively Multiplayer Online Role-Playing Game(MMORPG)", correct: true},
            {text: "Tactical Role-Playing Game(TRPG)", correct: false},
            {text: "Role-Playing Game(RPG)", correct: false},
        ]
    },
    {
        question: "What is the game genre that falls into TRPG category?",
        answers: [
            {text: "Final Fantasy Tactics", correct: true},
            {text: "Final Fantasy X HD Remaster", correct: false},
            {text: "Final Fantasy XV Royal Edition", correct: false},
            {text: "Theathrythm Final Bar", correct: false},
        ]
    },
    {
        question: "Which of the games below tells the tragic story of a mentally ill serial killer?",
        answers: [
            {text: "Zero Escape 9 Hours, 9 Persons, 9 Doors", correct: false},
            {text: "Phoenix Wright Ace Attorney - Dual Destinies", correct: false},
            {text: "13 Sentinels Aegis Rim", correct: false},
            {text: "Famicom Detective Club: Emio - The Smiling Man", correct: true},
        ]
    },
    {
        question: "What is the in-game job/class that primarily used for tanking?",
        answers: [
            {text: "Black Mage", correct: false},
            {text: "Samurai", correct: false},
            {text: "Paladin", correct: true},
            {text: "Dragoon", correct: false},
        ]
    },
    {
        question: "All of the games listed below are turn-based JRPGs, except for?",
        answers: [
            {text: "Unicorn Overlord", correct: true},
            {text: "Octopath Travler II", correct: false},
            {text: "Persona 5 Royal", correct: false},
            {text: "Kingdom Hearts Chain of Memories", correct: false},
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

//initial quiz function
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

//function when the all questions are answered and the next button is pressed
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

//function when sellecting an answer whether the displayed answer is true or not
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

//function to display the score after answering all questions
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

//function of the next button to navigate through set of question pages
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();