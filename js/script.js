let questions = [
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5"],
        correctAnswer: "4",
        clue: "It's the result of adding two equal numbers."
    },
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris"],
        correctAnswer: "Paris",
        clue: "It's known as the city of love."
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter"],
        correctAnswer: "Mars",
        clue: "This planet is named after the Roman god of war."
    }
];

let currentQuestionIndex = 0;

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let teamTurn = 'A';
let currentTeamPlayer = 0;
let selectedCellIndex = null;
const cells = document.querySelectorAll('.cell');
const messageDiv = document.getElementById('message');
const questionContainer = document.getElementById('question-container');
const questionText = document.getElementById('question');
const clueText = document.getElementById('clue');
const timerDisplay = document.getElementById('time-left');
const submitAnswerButton = document.getElementById('submit-answer');
const resetButton = document.getElementById('reset');
let timeLeft = 10;
let timerInterval;

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
submitAnswerButton.addEventListener('click', submitAnswer);

function handleClick(e) {
    selectedCellIndex = e.target.getAttribute('data-index');

    // If the cell is already taken, return
    if (board[selectedCellIndex] !== '') return;

    questionContainer.style.display = 'block';

    // Display the question and clue
    loadQuestion();

    startTimer();
}

function loadQuestion() {
    // Get the current question and clue
    let currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = `Question: ${currentQuestion.question}`;
    clueText.textContent = `Clue: ${currentQuestion.clue}`;

    // Dynamically load the answer options
    const optionsDiv = document.querySelectorAll('input[name="answer"]');
    optionsDiv.forEach((input, index) => {
        input.value = currentQuestion.options[index];
        input.nextElementSibling.textContent = currentQuestion.options[index];
    });
}

function startTimer() {
    timeLeft = 10;
    timerDisplay.textContent = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            messageDiv.textContent = `${getCurrentPlayer()} failed to answer in time! Turn skipped.`;
            questionContainer.style.display = 'none';
            switchPlayer();
        }
    }, 1000);
}

function submitAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');

    if (selectedOption) {
        const userAnswer = selectedOption.value;
        clearInterval(timerInterval);

        let currentQuestion = questions[currentQuestionIndex];

        if (userAnswer === currentQuestion.correctAnswer) {
            board[selectedCellIndex] = currentPlayer;
            cells[selectedCellIndex].textContent = currentPlayer;

            if (checkWin()) {
                messageDiv.textContent = `${getCurrentPlayer()} from Team ${teamTurn} wins!`;
                endGame();
            } else if (board.every(cell => cell !== '')) {
                messageDiv.textContent = 'It\'s a draw!';
            } else {
                messageDiv.textContent = `${getCurrentPlayer()} answered correctly!`;
                switchPlayer();
            }
        } else {
            messageDiv.textContent = `${getCurrentPlayer()} answered incorrectly! Turn skipped.`;
            switchPlayer();
        }

        // Move to the next question
        currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
        questionContainer.style.display = 'none';
    } else {
        messageDiv.textContent = 'Please select an answer!';
    }
}

function switchPlayer() {
    teamTurn = teamTurn === 'A' ? 'B' : 'A';
    currentTeamPlayer = (currentTeamPlayer + 1) % 3;
    currentPlayer = teamTurn === 'A' ? 'X' : 'O';
    messageDiv.textContent = `${getCurrentPlayer()}'s turn!`;
}

function getCurrentPlayer() {
    const teams = {
        A: ['Player 1A', 'Player 2A', 'Player 3A'],
        B: ['Player 1B', 'Player 2B', 'Player 3B']
    };
    return teams[teamTurn][currentTeamPlayer];
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern => {
        return pattern.every(index => {
            return board[index] === currentPlayer;
        });
    });
}

function resetGame() {
    board.fill('');
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    teamTurn = 'A';
    currentTeamPlayer = 0;
    selectedCellIndex = null;
    currentQuestionIndex = 0;
    messageDiv.textContent = `${getCurrentPlayer()}'s turn!`;
    questionContainer.style.display = 'none';
}

function endGame() {
    cells.forEach(cell => cell.removeEventListener('click', handleClick));
}
