// Array of Questions
const questions = [
    {
        question: "Which planet in our solar system is known for its giant, swirling storm called the Great Red Spot?",
        options: [
            { text: "Saturn", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Mars", correct: false },
            { text: "Neptune", correct: false }
        ]
    },
    {
        question: "What is the name of the first human-made satellite launched into orbit by the Soviet Union in 1957?",
        options: [
            { text: "Apollo 11", correct: false },
            { text: "Voyager 1", correct: false },
            { text: "Sputnik 1", correct: true },
            { text: "Hubble", correct: false }
        ]
    },
    {
        question: "In computer science, what does the acronym 'API' stand for?",
        options: [
            { text: "Application Programming Interface", correct: true },
            { text: "Advanced Protocol Integration", correct: false },
            { text: "Automated Program Instruction", correct: false },
            { text: "Array Processing Instrument", correct: false }
        ]
    },
    {
        question: "Which space agency successfully landed the Perseverance rover on Mars in 2021?",
        options: [
            { text: "ESA", correct: false },
            { text: "CNSA", correct: false },
            { text: "ISRO", correct: false },
            { text: "NASA", correct: true }
        ]
    },
    {
        question: "What programming language is widely recognized as the primary language for web client-side scripting?",
        options: [
            { text: "Python", correct: false },
            { text: "JavaScript", correct: true },
            { text: "C++", correct: false },
            { text: "Ruby", correct: false }
        ]
    }
];


let currentQuestionIndex = 0;
let score = 0;

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');

const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');

const questionCounter = document.getElementById('question-counter');
const progressBar = document.getElementById("progress-bar");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const feedbackText = document.getElementById("feedback-text");


// ----- Screen Switching Function -----
const switchActiveCard = (currentCard, targetCard) => {
    currentCard.classList.remove('active');
    setTimeout(() => {
        targetCard.classList.add('active');
    }, 150);
}


// ----- Show Questions -----
const showQuestion = (index) => {
    const questionObj = questions[index];

    // Update counter and Progress bar
    questionCounter.textContent = `Question ${index + 1} of ${questions.length}`
    const progressPercent = ((index + 1) / questions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // Set Question Text
    questionText.textContent = questionObj.question;

    // Clear previous options & feedback
    optionsContainer.innerHTML = "";
    feedbackText.textContent = "";
    feedbackText.className = "feedback-text";
    nextBtn.disabled = true;

    // Loop through options and create buttons dynamically
    questionObj.options.forEach((option, idx) => {
        const optionBtn = document.createElement("button");
        optionBtn.className = "option-btn";
        optionBtn.id = `option-${idx}`;

        // Option HTML: text on left, letter indicator on right
        optionBtn.innerHTML = `
            <span>${option.text}</span>
            <div class="option-indicator">${String.fromCharCode(65 + idx)}</div>
        `;

        // Attach click handler (selectOption will be built in next step)
        optionBtn.addEventListener("click", () => selectOption(optionBtn, option.correct));
        optionsContainer.appendChild(optionBtn);
    });
}

// Temporary placeholder (will be replaced in next step)
function selectOption(selectedBtn, isCorrect) {
    console.log("Option clicked!", isCorrect ? "Correct!" : "Wrong!");
}


//  ----- START QUIZ ----- 
const startQuiz = () => {
    currentQuestionIndex = 0;
    score = 0;

    switchActiveCard(startScreen, quizScreen);
    showQuestion(currentQuestionIndex);
}

startBtn.addEventListener('click', startQuiz);