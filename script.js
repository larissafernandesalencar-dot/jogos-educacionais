// Banco de perguntas adequado para o 6º ano
const questions = [
    {
        question: "Qual parte da célula vegetal é responsável pela fotossíntese?",
        options: ["Mitocôndria", "Cloroplasto", "Núcleo", "Parede celular"],
        answer: 1
    },
    {
        question: "Qual destes seres vivos é um consumidor primário (herbívoro)?",
        options: ["Leão", "Coelho", "Gavião", "Fungo"],
        answer: 1
    },
    {
        question: "Os fungos e as bactérias desempenham qual papel fundamental na cadeia alimentar?",
        options: ["Produtores", "Consumidores Secundários", "Decompositores", "Predadores"],
        answer: 2
    },
    {
        question: "Qual bioma brasileiro é conhecido por sua grande biodiversidade e clima quente e úmido?",
        options: ["Caatinga", "Pampa", "Amazônia", "Pantanal"],
        answer: 2
    },
    {
        question: "Qual é a camada mais externa da Terra, onde nós vivemos?",
        options: ["Manto", "Núcleo Externo", "Crosta Terrestre", "Núcleo Interno"],
        answer: 2
    }
];

// Variáveis do Estado do Jogo
let currentQuestionIndex = 0;
let score = 0;
let lives = 3;

// Elementos do DOM
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const endScreen = document.getElementById('end-screen');

const btnStart = document.getElementById('btn-start');
const btnRestart = document.getElementById('btn-restart');

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const scoreDisplay = document.getElementById('score-display');
const livesDisplay = document.getElementById('lives-display');
const feedbackText = document.getElementById('feedback-text');
const finalScore = document.getElementById('final-score');
const endTitle = document.getElementById('end-title');

// Event Listeners
btnStart.addEventListener('click', startGame);
btnRestart.addEventListener('click', restartGame);

function startGame() {
    startScreen.classList.add('hide');
    endScreen.classList.add('hide');
    gameScreen.classList.remove('hide');
    
    score = 0;
    lives = 3;
    currentQuestionIndex = 0;
    
    updateHUD();
    loadQuestion();
}

function updateHUD() {
    scoreDisplay.innerText = `Pontos: ${score}`;
    livesDisplay.innerText = `Vidas: ${'❤️️'.repeat(lives)}`;
}

function loadQuestion() {
    feedbackText.classList.add('hide');
    optionsContainer.innerHTML = '';
    
    const currentQ = questions[currentQuestionIndex];
    questionText.innerText = currentQ.question;

    currentQ.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('btn', 'btn-option');
        button.addEventListener('click', () => selectOption(index, button));
        optionsContainer.appendChild(button);
    });
}

function selectOption(selectedIndex, selectedButton) {
    // Desabilita todos os botões para evitar cliques múltiplos
    const allButtons = optionsContainer.querySelectorAll('.btn-option');
    allButtons.forEach(btn => btn.disabled = true);

    const currentQ = questions[currentQuestionIndex];

    if (selectedIndex === currentQ.answer) {
        selectedButton.classList.add('correct');
        score += 10;
        feedbackText.innerText = "¡Muito bem! Resposta Correta! 🎉";
        feedbackText.style.color = "#1dd1a1";
    } else {
        selectedButton.classList.add('wrong');
        allButtons[currentQ.answer].classList.add('correct');
        lives--;
        feedbackText.innerText = "Ops! Resposta Incorreta. 😅";
        feedbackText.style.color = "#ff6b6b";
    }

    feedbackText.classList.remove('hide');
    updateHUD();

    setTimeout(() => {
        if (lives <= 0) {
            endGame(false);
        } else {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loadQuestion();
            } else {
                endGame(true);
            }
        }
    }, 1500);
}

function endGame(won) {
    gameScreen.classList.add('hide');
    endScreen.classList.remove('hide');

    if (won) {
        endTitle.innerText = "🏆 Parabéns, Cientista!";
        finalScore.innerText = `Você concluiu o desafio com ${score} pontos!`;
    } else {
        endTitle.innerText = "💥 Fim de Jogo!";
        finalScore.innerText = `Suas vidas acabaram. Você fez ${score} pontos. Tente novamente!`;
    }
}

function restartGame() {
    startGame();
}
