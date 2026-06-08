const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');

const startBtn = document.getElementById('start-btn');


const switchActiveCard = (currentCard, targetCard) => {
    currentCard.classList.remove('active');
    setTimeout(() => {
        targetCard.classList.add('active');
    }, 150);
}


startBtn.addEventListener('click', () => {
    switchActiveCard(startScreen, quizScreen);
})