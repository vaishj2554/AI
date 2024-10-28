let N = 8; // Default board size
let board = [];
let queens = [];
let hintsGiven = 0;
let solutionBacktracking = [];

// Initialize the chessboard based on the selected size
function initializeBoard() {
    const boardSize = document.getElementById("boardSize").value;
    N = parseInt(boardSize);
    board = Array.from({ length: N }, () => Array(N).fill(0));
    queens = [];
    hintsGiven = 0;
    document.getElementById("message").innerHTML = "";
    renderBoard();
}

// Render the chessboard
function renderBoard() {
    const chessboardDiv = document.getElementById("chessboard");
    chessboardDiv.style.gridTemplateColumns = `repeat(${N}, 50px)`;
    chessboardDiv.innerHTML = '';

    for (let row = 0; row < N; row++) {
        for (let col = 0; col < N; col++) {
            const square = document.createElement('div');
            square.classList.add('square', (row + col) % 2 === 0 ? 'white' : 'brown');
            square.setAttribute('data-row', row);
            square.setAttribute('data-col', col);
            square.onclick = () => placeQueen(row, col);
            if (board[row][col] === 1) {
                square.innerHTML = '♛'; // Queen icon
            }
            chessboardDiv.appendChild(square);
        }
    }
}

// Place a queen on the board manually
function placeQueen(row, col) {
    if (isSafe(row, col) && board[row][col] === 0) {
        board[row][col] = 1;
        queens.push([row, col]);
        renderBoard();

        if (queens.length === N) {
            document.getElementById("message").innerText = "Congratulations! All queens placed correctly!";
        }
    } else {
        document.getElementById("message").innerText = "Invalid position! Try another spot.";
    }
}

// Check if a position is safe for a queen
function isSafe(row, col) {
    for (let [qRow, qCol] of queens) {
        if (qRow === row || qCol === col || Math.abs(qRow - row) === Math.abs(qCol - col)) {
            return false;
        }
    }
    return true;
}

// Hint System
function getHint() {
    let hints = [];

    for (let row = 0; row < N; row++) {
        for (let col = 0; col < N; col++) {
            if (isSafe(row, col) && board[row][col] === 0) {
                hints.push([row, col]);
            }
        }
    }

    if (hints.length > 0) {
        const randomHint = hints[Math.floor(Math.random() * hints.length)];
        document.getElementById("message").innerHTML = `Hint: Try placing a queen at (${randomHint[0] + 1}, ${randomHint[1] + 1})`;
    } else {
        document.getElementById("message").innerHTML = "No more hints available!";
    }
}

// Event listeners
document.getElementById('resetButton').addEventListener('click', initializeBoard);
document.getElementById('hintButton').addEventListener('click', getHint);

// Initial setup
initializeBoard();
