document.addEventListener("DOMContentLoaded", () => {
    // Define variables
let questions = [
        {
                question: "A cat is a:",
                options: ["mammal", "reptile"],
                correctAnswer: "mammal",
                clue: "It's a common household pet.",
        },
        {
                question: "The sun is a:",
                options: ["planet", "star"],
                correctAnswer: "star",
                clue: "It's the center of our solar system.",
        },
        {
                question: "Water freezes at:",
                options: ["0°C", "100°C"],
                correctAnswer: "0°C",
                clue: "It's the temperature at which ice forms.",
        },
        {
                question: "A dog is a:",
                options: ["bird", "mammal"],
                correctAnswer: "mammal",
                clue: "It's known as man's best friend.",
        },
        {
                question: "The Earth orbits the:",
                options: ["moon", "sun"],
                correctAnswer: "sun",
                clue: "It's the largest object in our solar system.",
        },
        {
                question: "Fish breathe using:",
                options: ["lungs", "gills"],
                correctAnswer: "gills",
                clue: "They extract oxygen from water.",
        },
        {
                question: "A square has:",
                options: ["4 sides", "5 sides"],
                correctAnswer: "4 sides",
                clue: "It's a basic geometric shape.",
        },
        {
                question: "The color of the sky is:",
                options: ["blue", "red"],
                correctAnswer: "blue",
                clue: "It's the color seen on a clear day.",
        },
        {
                question: "A cow produces:",
                options: ["wool", "milk"],
                correctAnswer: "milk",
                clue: "It's a common dairy product.",
        },
        {
                question: "Birds have:",
                options: ["wings", "fins"],
                correctAnswer: "wings",
                clue: "They use them to fly.",
        },
        {
                question: "The Eiffel Tower is in:",
                options: ["London", "Paris"],
                correctAnswer: "Paris",
                clue: "It's a famous landmark in France.",
        },
        {
                question: "A car runs on:",
                options: ["fuel", "water"],
                correctAnswer: "fuel",
                clue: "It's a common energy source for vehicles.",
        },
        {
                question: "The moon is:",
                options: ["a planet", "a satellite"],
                correctAnswer: "a satellite",
                clue: "It orbits the Earth.",
        },
        {
                question: "An apple is:",
                options: ["a fruit", "a vegetable"],
                correctAnswer: "a fruit",
                clue: "It's often red or green.",
        },
        {
                question: "The capital of Japan is:",
                options: ["Beijing", "Tokyo"],
                correctAnswer: "Tokyo",
                clue: "It's a major city in Asia.",
        },
        {
                question: "A zebra has:",
                options: ["stripes", "spots"],
                correctAnswer: "stripes",
                clue: "It's known for its black and white pattern.",
        },
        {
                question: "The Pacific Ocean is:",
                options: ["the largest ocean", "the smallest ocean"],
                correctAnswer: "the largest ocean",
                clue: "It's the biggest body of water on Earth.",
        },
        {
                question: "Penguins live in:",
                options: ["the desert", "Antarctica"],
                correctAnswer: "Antarctica",
                clue: "It's a cold, icy continent.",
        },
        {
                question: "Humans have:",
                options: ["four legs", "two legs"],
                correctAnswer: "two legs",
                clue: "It's the number of limbs we walk on.",
        },
        {
                question: "Chocolate is made from:",
                options: ["cocoa", "rice"],
                correctAnswer: "cocoa",
                clue: "It's a key ingredient in sweets.",
        },
        {
                question: "A tree grows from:",
                options: ["a seed", "a rock"],
                correctAnswer: "a seed",
                clue: "It's the starting point of plant life.",
        },
        {
                question: "Summer is usually:",
                options: ["cold", "hot"],
                correctAnswer: "hot",
                clue: "It's the warmest season of the year.",
        },
        {
                question: "A rainbow has:",
                options: ["7 colors", "5 colors"],
                correctAnswer: "7 colors",
                clue: "It's a spectrum of light.",
        },
        {
                question: "A whale is:",
                options: ["a fish", "a mammal"],
                correctAnswer: "a mammal",
                clue: "It's a large marine animal.",
        },
        {
                question: "Bread is made from:",
                options: ["flour", "wood"],
                correctAnswer: "flour",
                clue: "It's a staple food ingredient.",
        },
        {
                question: "Snow is:",
                options: ["white", "green"],
                correctAnswer: "white",
                clue: "It's the color of frozen precipitation.",
        },
        {
                question: "The number after 5 is:",
                options: ["4", "6"],
                correctAnswer: "6",
                clue: "It's the next integer.",
        },
        {
                question: "The Great Wall is in:",
                options: ["China", "India"],
                correctAnswer: "China",
                clue: "It's a historic structure in Asia.",
        },
        {
                question: "Milk comes from:",
                options: ["cows", "chickens"],
                correctAnswer: "cows",
                clue: "It's a common dairy source.",
        },
        {
                question: "A guitar is a:",
                options: ["musical instrument", "vehicle"],
                correctAnswer: "musical instrument",
                clue: "It's used to play music.",
        },
];

    let currentQuestionIndex = 0;
    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let teamTurn = "A";
    let currentTeamPlayer = 0;
    let selectedCellIndex = null;
    const cells = document.querySelectorAll(".cell");
    const messageDiv = document.getElementById("message");
    const questionContainer = document.getElementById("popup");
    const questionText = document.getElementById("question");
    const clueText = document.getElementById("clue");
    const timerDisplay = document.getElementById("time-left");
    const resetButton = document.getElementById("reset");
    let timeLeft = 10;
    let timerInterval;

    // Attach event listeners to the cells after they are defined
    cells.forEach((cell) => cell.addEventListener("click", handleClick));
    resetButton.addEventListener("click", resetGame);

    function handleClick(e) {
            selectedCellIndex = e.target.getAttribute("data-index");

            // If the cell is already taken by the same team, return
            if (board[selectedCellIndex] === currentPlayer) {
                    messageDiv.textContent = "You cannot replace your own team's move!";
                    return;
                // Reattach event listeners to the cells
                cells.forEach((cell) => cell.addEventListener("click", handleClick));
            }

            // Show the question popup and overlay
            questionContainer.style.display = "block";
            overlay.style.display = "block";

            // Display the question and clue
            loadQuestion();
            startTimer();
    }

    function loadQuestion() {
            let currentQuestion = questions[currentQuestionIndex];
            questionText.textContent = `Question: ${currentQuestion.question}`;
            clueText.textContent = `Clue: ${currentQuestion.clue}`;

            const options = document.querySelectorAll('.answer-btn');
            options.forEach((button, index) => {
                    button.value = currentQuestion.options[index];
                    button.textContent = currentQuestion.options[index];
                    button.onclick = () => checkAnswer(button);
            });
    }
function getRandomQuestionIndex() {
        return Math.floor(Math.random() * questions.length);
}

function loadQuestion() {
        currentQuestionIndex = getRandomQuestionIndex();
        let currentQuestion = questions[currentQuestionIndex];
        questionText.textContent = `Question: ${currentQuestion.question}`;
        clueText.textContent = `Clue: ${currentQuestion.clue}`;

        const options = document.querySelectorAll('.answer-btn');
        options.forEach((button, index) => {
                button.value = currentQuestion.options[index];
                button.textContent = currentQuestion.options[index];
                button.onclick = () => checkAnswer(button);
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
                            questionContainer.style.display = "none";
                            overlay.style.display = "none";
                            switchPlayer();
                    }
            }, 1000);
    }

    function checkAnswer(button) {
            const userAnswer = button.value;
            clearInterval(timerInterval);

            let currentQuestion = questions[currentQuestionIndex];

            if (userAnswer === currentQuestion.correctAnswer) {
                    board[selectedCellIndex] = currentPlayer;
                    cells[selectedCellIndex].textContent = currentPlayer;

                    if (checkWin()) {
                            messageDiv.textContent = `${getCurrentPlayer()} from Team ${teamTurn} wins!`;
                            endGame();
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
            questionContainer.style.display = "none";
            overlay.style.display = "none";
    }

    function switchPlayer() {
            teamTurn = teamTurn === "A" ? "B" : "A";
            currentTeamPlayer = (currentTeamPlayer + 1) % 3;
            currentPlayer = teamTurn === "A" ? "X" : "O";
            messageDiv.textContent = `${getCurrentPlayer()}'s turn!`;
    }

    function getCurrentPlayer() {
            const teams = {
                    A: ["Player 1A", "Player 2A", "Player 3A"],
                    B: ["Player 1B", "Player 2B", "Player 3B"],
            };
            return teams[teamTurn][currentTeamPlayer];
    }

    function checkWin() {
            const winPatterns = [
                    [0, 1, 2],
                    [3, 4, 5],
                    [6, 7, 8],
                    [0, 3, 6],
                    [1, 4, 7],
                    [2, 5, 8],
                    [0, 4, 8],
                    [2, 4, 6],
            ];
            return winPatterns.some((pattern) => {
                    return pattern.every((index) => {
                            return board[index] === currentPlayer;
                    });
            });
    }

    function resetGame() {
            board.fill("");
            cells.forEach((cell) => {
                cell.textContent = "";
                cell.addEventListener("click", handleClick);
            });
            currentPlayer = "X";
            teamTurn = "A";
            currentTeamPlayer = 0;
            selectedCellIndex = null;
            currentQuestionIndex = 0;
            messageDiv.textContent = `${getCurrentPlayer()}'s turn!`;
            questionContainer.style.display = "none";
            overlay.style.display = "none";
    }

    function endGame() {
            cells.forEach((cell) => cell.removeEventListener("click", handleClick));
    }
});
