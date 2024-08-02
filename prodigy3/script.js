const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
const board = Array(9).fill(null);

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (board[index] !== null) {
        return;
    }

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWin()) {
        alert(`${currentPlayer} wins!`);
        resetGame();
    } else if (board.every(cell => cell !== null)) {
        alert("It's a draw!");
        resetGame();
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
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
        [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] !== null && board[a] === board[b] && board[a] === board[c];
    });
}

function resetGame() {
    board.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
}


function makeAIMove() {
    const emptyCells = board.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomIndex] = 'O';
    cells[randomIndex].textContent = 'O';

    if (checkWin()) {
        alert('O wins!');
        resetGame();
    } else if (board.every(cell => cell !== null)) {
        alert("It's a draw!");
        resetGame();
    } else {
        currentPlayer = 'X';
    }
}


function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (board[index] !== null) {
        return;
    }

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWin()) {
        alert(`${currentPlayer} wins!`);
        resetGame();
    } else if (board.every(cell => cell !== null)) {
        alert("It's a draw!");
        resetGame();
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayer === 'O') {
            makeAIMove();
        }
    }
}
