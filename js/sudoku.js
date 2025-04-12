let unsolved = [];
let solved = [];

let grid = [[]];
let cellSelected = {};
let userUnsolved = [];

let gameOverCheck = false;
let score = 0;
let mistake = 0;
let secCounter = 0;
let formattedTime;

createBoardMatrix();
createSudokuBoard();
setInterval(time, 1000);

function createBoardMatrix() {
  const gridContainer = document.querySelector(".sudoku-grid");

  for (let row = 0; row < 9; row++) {
    grid[row] = [];
    for (let col = 0; col < 9; col++) {
      const cell = document.createElement("div");
      const textNum = document.createElement("p");

      cell.classList.add("cell");
      textNum.classList.add("cell-num");

      cell.appendChild(textNum);
      gridContainer.appendChild(cell);

      grid[row][col] = cell;
    }
  }
}

async function getSudokuBoard() {
  try {
    const response = await fetch("https://sudoku-api.vercel.app/api/dosuku");
    const data = await response.json();
    unsolved = data.newboard.grids[0].value;
    userUnsolved = unsolved;

    solved = data.newboard.grids[0].solution;
  } catch (error) {
    console.log(error);
  }
}

async function createSudokuBoard() {
  await getSudokuBoard();
  userUnsolved = unsolved;

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = grid[row][col];
      const textNum = cell.querySelector(".cell-num");

      if (userUnsolved[row][col] != 0) {
        textNum.textContent = userUnsolved[row][col];
      } else {
        textNum.textContent = "";
      }

      const thickBorder = "4px solid white";
      if (row === 0) cell.style.borderTop = thickBorder;
      if (col === 0) cell.style.borderLeft = thickBorder;
      if (col === 8) cell.style.borderRight = thickBorder;
      if (row === 8) cell.style.borderBottom = thickBorder;
      if (row === 2 || row === 5) cell.style.borderBottom = thickBorder;
      if (col === 2 || col === 5) cell.style.borderRight = thickBorder;

      textNum.style.color = "white";
    }
  }
}

function numberInput(input) {
  if (mistake >= 3) {
    return;
  }

  if (userUnsolved[cellSelected.row][cellSelected.col] == 0) {
    if (input == solved[cellSelected.row][cellSelected.col]) {
      cellSelected.cell.querySelector(".cell-num").textContent = input;
      cellSelected.cell.querySelector(".cell-num").style.color = "green";

      score += 50;
      document.querySelector(".score").textContent = "Score: " + score;

      userUnsolved[cellSelected.row][cellSelected.col] = input;

      setTimeout(() => {
        checkGameComplete();
      }, 250);
    } else {
      cellSelected.cell.querySelector(".cell-num").textContent = input;
      cellSelected.cell.querySelector(".cell-num").style.color = "red";

      mistake += 1;
      document.querySelector(".mistakes").textContent =
        "Mistakes: " + mistake + "/3";

      if (mistake >= 3) {
        gameOver();
      }
    }
  }
}

function checkGameComplete() {
  if (userUnsolved.toString() != solved.toString()) {
    return false;
  }

  gameOverCheck = true;
  gameWon();
}

function gameWon() {
  document.getElementById("modal-title").textContent = "Congratulations";
  document.getElementById("modal-message-1").textContent =
    "Great job! You successfully got a score of " +
    score +
    " within " +
    formattedTime +
    ".";

  const modalElement = document.getElementById("modal");
  modalElement.showModal();

  document
    .getElementById("tryAgain-button")
    .addEventListener("click", function () {
      modalElement.close();
      resetGame();
    });
  document.getElementById("home-button").addEventListener("click", function () {
    modalElement.close();
    window.location.href = "index.html";
  });

  document.getElementById("modal-close").addEventListener("click", function () {
    modalElement.close();
  });
}

function gameOver() {
  document.getElementById("modal-title").textContent = "Game Over";
  document.getElementById("modal-message-1").textContent =
    "Great effort! You managed to get a score of " +
    score +
    " within " +
    formattedTime +
    ".";

  const modalElement = document.getElementById("modal");
  modalElement.showModal();

  document
    .getElementById("tryAgain-button")
    .addEventListener("click", function () {
      modalElement.close();
      resetGame();
    });
  document.getElementById("home-button").addEventListener("click", function () {
    modalElement.close();
    window.location.href = "index.html";
  });

  document.getElementById("modal-close").addEventListener("click", function () {
    modalElement.close();
  });
}

function resetGame() {
  score = 0;
  mistake = 0;
  secCounter = 0;
  cellSelected = {};
  gameOverCheck = false;

  resetBoardColor();

  document.querySelector(".score").textContent = "Score: 0";
  document.querySelector(".mistakes").textContent = "Mistakes: 0/3";
  document.querySelector(".time").textContent = "00:00";

  createSudokuBoard();
}

function resetBoardColor() {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      grid[row][col].style.backgroundColor = "";
    }
  }
}

function colorColumn() {
  for (let row = 0; row < 9; row++) {
    grid[row][cellSelected.col].style.backgroundColor =
      "rgba(160, 160, 160, .3)";
    if (row == cellSelected.row)
      grid[row][cellSelected.col].style.backgroundColor =
        "rgba(160, 160, 160, .7)";
  }
}

function colorRow() {
  for (let col = 0; col < 9; col++) {
    grid[cellSelected.row][col].style.backgroundColor =
      "rgba(160, 160, 160, .3)";
    if (col == cellSelected.col)
      grid[cellSelected.row][col].style.backgroundColor =
        "rgba(160, 160, 160, .7)";
  }
}

function time() {
  let minutes = Math.floor(secCounter / 60);
  let seconds = secCounter % 60;

  formattedTime =
    (minutes < 10 ? "0" : "") +
    minutes +
    ":" +
    (seconds < 10 ? "0" : "") +
    seconds;

  document.querySelector(".time").textContent = formattedTime;

  if (mistake < 3 && gameOverCheck == false) secCounter++;
}

let num = document.getElementsByClassName("num");
for (let a = 0; a < 9; a++) {
  num[a].addEventListener("click", function () {
    if (mistake >= 3 || gameOverCheck == true) {
      const modalElement = document.getElementById("modal");
      modalElement.showModal();
      return;
    }
    numberInput(num[a].textContent);
  });
}

document.addEventListener("keydown", function (e) {
  if (mistake >= 3 || gameOverCheck == true) {
    const modalElement = document.getElementById("modal");
    modalElement.showModal();
    return;
  }

  if (/[0-9]/.test(e.key)) {
    numberInput(e.key);
  }
  if (e.key === "ArrowUp") {
    if (cellSelected.row == null) {
      cellSelected.cell = grid[0][0];
      cellSelected.row = 0;
      cellSelected.col = 0;

      resetBoardColor();
      colorRow();
      colorColumn();
    } else if (cellSelected.row != 0) {
      cellSelected.cell = grid[cellSelected.row - 1][cellSelected.col];
      cellSelected.row = cellSelected.row - 1;
      cellSelected.col = cellSelected.col;

      resetBoardColor();
      colorRow();
      colorColumn();
    }
  } else if (e.key === "ArrowDown") {
    if (cellSelected.row == null) {
      cellSelected.cell = grid[1][0];
      cellSelected.row = 1;
      cellSelected.col = 0;

      resetBoardColor();
      colorRow();
      colorColumn();
    } else if (cellSelected.row != 8) {
      cellSelected.cell = grid[cellSelected.row + 1][cellSelected.col];
      cellSelected.row = cellSelected.row + 1;
      cellSelected.col = cellSelected.col;

      resetBoardColor();
      colorRow();
      colorColumn();
    }
  } else if (e.key === "ArrowLeft") {
    if (cellSelected.col == null) {
      cellSelected.cell = grid[0][0];
      cellSelected.row = 0;
      cellSelected.col = 0;

      resetBoardColor();
      colorRow();
      colorColumn();
    } else if (cellSelected.col != 0) {
      cellSelected.cell = grid[cellSelected.row][cellSelected.col - 1];
      cellSelected.row = cellSelected.row;
      cellSelected.col = cellSelected.col - 1;

      resetBoardColor();
      colorRow();
      colorColumn();
    }
  } else if (e.key === "ArrowRight") {
    if (cellSelected.col == null) {
      cellSelected.cell = grid[0][1];
      cellSelected.row = 0;
      cellSelected.col = 1;

      resetBoardColor();
      colorRow();
      colorColumn();
    } else if (cellSelected.col != 8) {
      cellSelected.cell = grid[cellSelected.row][cellSelected.col + 1];
      cellSelected.row = cellSelected.row;
      cellSelected.col = cellSelected.col + 1;

      resetBoardColor();
      colorRow();
      colorColumn();
    }
  }
});

for (let a = 0; a < 9; a++) {
  for (let b = 0; b < 9; b++) {
    grid[a][b].addEventListener("click", function () {
      if (mistake >= 3 || gameOverCheck == true) {
        const modalElement = document.getElementById("modal");
        modalElement.showModal();
        return;
      }
      resetBoardColor();
      cellSelected.cell = grid[a][b];
      cellSelected.row = a;
      cellSelected.col = b;
      colorRow();
      colorColumn();
    });
  }
}

module.exports = checkGameComplete;
