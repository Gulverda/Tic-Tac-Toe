const cells = document.querySelectorAll('.cell');
const winDraw = document.querySelector('.win-draw');
const turnIndicator = document.querySelector('.turn-indicator');
const restartButton = document.querySelector('.restart');
const player1ScoreDisplay = document.getElementById('player1Score');
const player2ScoreDisplay = document.getElementById('player2Score');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let player1Score = 0;
let player2Score = 0;

function handleCellClick(index) {
    if (!gameActive || gameBoard[index] !== '') return;

    gameBoard[index] = currentPlayer;
    renderBoard();

    if (checkWinner()) {
        winDraw.textContent = `Player ${currentPlayer} wins!`;
        updateScores();
        gameActive = false;
    } else if (gameBoard.every(cell => cell !== '')) {
        winDraw.textContent = "It's a tie!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateTurnIndicator();
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winPatterns.some(pattern =>
        pattern.every(index => gameBoard[index] === currentPlayer)
    );
}

function renderBoard() {
    cells.forEach((cell, index) => {
        cell.textContent = gameBoard[index];
        cell.classList.remove('cell-X', 'cell-O');
        cell.classList.add(gameBoard[index] === 'X' ? 'cell-X' : 'cell-O');
        cell.addEventListener('click', () => handleCellClick(index));
    });
}

function restartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    winDraw.textContent = '';
    currentPlayer = 'X';
    updateTurnIndicator();
    renderBoard();
}

function updateTurnIndicator() {
    turnIndicator.textContent = `Player ${currentPlayer}'s turn`;
}

function updateScores() {
    if (currentPlayer === 'X') {
        player1Score++;
    } else {
        player2Score++;
    }

    player1ScoreDisplay.textContent = `Player X: ${player1Score}`;
    player2ScoreDisplay.textContent = `Player O: ${player2Score}`;
}

restartButton.addEventListener('click', restartGame);

renderBoard();
updateTurnIndicator();