// ----- Array of Questions -----
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

// ----- App State Varibales -----
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timerInterval = null;
let timeSpentArray = [];
let questionStartTime = 0;

// ----- DOM Elements -----
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');

const questionCounter = document.getElementById('question-counter');
const progressBar = document.getElementById("progress-bar");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const feedbackText = document.getElementById("feedback-text");
const timerText = document.getElementById("timer-text");
const timerBadge = document.querySelector(".timer-badge");

// Result Screen Elements
const resultEmoji = document.getElementById("result-emoji");
const resultTitle = document.getElementById("result-title");
const resultMessage = document.getElementById("result-message");
const scoreFraction = document.getElementById("score-fraction");
const statAccuracy = document.getElementById("stat-accuracy");
const statTime = document.getElementById("stat-time");
const restartBtn = document.getElementById("restart-btn");


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
    
    // Reset timer
    clearInterval(timerInterval);
    timeLeft = 15;
    timerText.textContent = `${timeLeft}s`;
    timerBadge.classList.remove("danger");

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
    
    // Track when this question started
    questionStartTime = Date.now();

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

    startTimer();
}

// ----- Timer Countdown -----
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerText.textContent = `${timeLeft}s`;

        // Add danger styling when 5 seconds or less remain
        if (timeLeft <= 5) {
            timerBadge.classList.add("danger");
        }

        // Time ran out
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeout();
        }
    }, 1000);
}

// Handle when time runs out
const handleTimeout = () => {
    // Record max time spent
    timeSpentArray.push(15);

    // Disable all options
    const optionBtns = optionsContainer.querySelectorAll(".option-btn");
    optionBtns.forEach(btn => {
        btn.disabled = true;
    });

    // Show timeout feedback
    feedbackText.textContent = "Time's up! ⏰";
    feedbackText.className = "feedback-text incorrect";

    // Reveal the correct answer
    revealCorrectOption();

    // Enable Next button
    nextBtn.disabled = false;
}

// ----- Options Selection Logic -----
const selectOption = (selectedBtn, isCorrect) => {
       // Stop the countdown
    clearInterval(timerInterval);

    // Track time spent on this question
    const timeSpent = Math.min(15, Math.round((Date.now() - questionStartTime) / 1000));
    timeSpentArray.push(timeSpent);

    // Disable all option buttons to prevent multiple clicks
    const optionBtns = optionsContainer.querySelectorAll(".option-btn");
    optionBtns.forEach(btn => {
        btn.disabled = true;
    });
    if (isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
        feedbackText.textContent = 'Correct! Magnificent Job. 🚀';
        feedbackText.className = 'feedback-text correct';
    } else {
        selectedBtn.classList.add('incorrect');
        feedbackText.textContent = 'Incorrect answer. Keep learning! 💫';
        feedbackText.className = 'feedback-text incorrect';

        // Also reveal the correct answer.
        revealCorrectOption();
    }
    
    // Enable the Next Button
    nextBtn.disabled = false;
}

const revealCorrectOption = () => {
    const questionObj = questions[currentQuestionIndex];
    const correctIdx = questionObj.options.findIndex(opt => opt.correct);
    if (correctIdx !== -1) {
        const correctBtn = document.getElementById(`option-${correctIdx}`);
        if (correctBtn) {
            correctBtn.classList.add("correct");
        }
    }
}

//  ----- Show Result Screen -----
const showResults = () => {
    switchActiveCard(quizScreen, resultScreen);

    // Calculate score fraction
    scoreFraction.textContent = `${score}/${questions.length}`;

    // Calculate accuracy percentage
    const accuracy = Math.round((score / questions.length) * 100);
    statAccuracy.textContent = `${accuracy}%`;

    // Calculate average time per question
    const totalTimeSpent = timeSpentArray.reduce((acc, curr) => acc + curr, 0);
    const avgTime = timeSpentArray.length > 0 ? (totalTimeSpent / timeSpentArray.length).toFixed(1) : 0;
    statTime.textContent = `${avgTime}s`;

    // Display emoji, title, and message based on performance
    if (score === questions.length) {
        resultEmoji.textContent = "👑";
        resultTitle.textContent = "Universal Master!";
        resultMessage.textContent = "You scored 100%! The cosmos bows to your intellectual dominance.";
    } else if (score >= 3) {
        resultEmoji.textContent = "🏆";
        resultTitle.textContent = "Excellent Work!";
        resultMessage.textContent = "You have a solid command over space tech trivia.";
    } else {
        resultEmoji.textContent = "☄️";
        resultTitle.textContent = "Keep Practicing!";
        resultMessage.textContent = "Space is vast and full of mysteries. Try again to boost your score!";
    }
}

//  ----- START QUIZ ----- 
const startQuiz = () => {
    currentQuestionIndex = 0;
    score = 0;
    timeSpentArray = [];

    switchActiveCard(startScreen, quizScreen);
    showQuestion(currentQuestionIndex);
}

startBtn.addEventListener('click', startQuiz);

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(currentQuestionIndex);
    } else {
        showResults();
    }
})

// ----- RESTART QUIZ -----
restartBtn.addEventListener("click", () => {
    switchActiveCard(resultScreen, startScreen);
});