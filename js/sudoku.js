var unsolved = [
  [
    "xxx26x7x1",
    "68xx7xx9x",
    "19xxx45xx",
    "82x1xxx4x",
    "xx46x29xx",
    "x5xxx3x28",
    "xx93xxx74",
    "x4xx5xx36",
    "7x3x18xxx",
  ],
  [
    "x3x2x6xxx",
    "9xx3x5xx1",
    "x8xx7x9xx",
    "x4xxx5x3x",
    "xx7x4x8xx",
    "x5x8xxx9x",
    "xx9x2xx4x",
    "4xx5x3xx8",
    "xxx1x9x5x",
  ],
  [
    "xxx6x159x",
    "1x7xx24x6",
    "x65x9x1xx",
    "x4x3xx7x8",
    "7xxx4xxx5",
    "9x2xx8x1x",
    "xx5x6x94x",
    "6x41xx7x9",
    "x197x6xxx",
  ],
  [
    "x2x8x1xxx",
    "8xxx76x2x",
    "x6x9x3xx5",
    "xx5x12x8x",
    "xx6xxx9xx",
    "x9x67x3xx",
    "7xx4x5x6x",
    "x5x38xxx9",
    "xxx9x7x8x",
  ],
  [
    "xx9x7xx3x",
    "x4xx2xx5x",
    "3xx1x8x7x",
    "9xx6x2x5x",
    "x5x1x9x3x",
    "x1x4x3xx8",
    "x7x3x9xx4",
    "x8xx7xx6x",
    "x5xx4x9xx",
  ],
  [
    "x7xx5xx8x",
    "3xx6xx1x4",
    "xx8x1xx7x",
    "5xx8x7xx2",
    "x4x9x5x6x",
    "7xx2x6xx3",
    "x6xx7x8xx",
    "1x3xx9xx5",
    "x2xx3xx7x",
  ],
  [
    "1xx9x8xx5",
    "7xx4x5x2x",
    "x9xx2xx8x",
    "3xx6xx9xx",
    "x7xx8xx1x",
    "xx4xx1xx3",
    "x2xx7xx6x",
    "x5x9x3xx1",
    "4xx2x6xx9",
  ],
  [
    "x1x3xx5xx",
    "x8xx7x2xx",
    "xx9xx1x6x",
    "4xx5xx8xx",
    "xx6xx3xx2",
    "xx2xx4xx7",
    "x6x1xx3xx",
    "xx4xx9x7x",
    "xx5xx8x1x",
  ],
  [
    "7xx2x4x9x",
    "x3x5x9xx8",
    "x9xx6x3xx",
    "x6xx9xx2x",
    "xx3xx1xx4",
    "x5xx7xx8x",
    "xx1xx8xx7",
    "5xx4x7x6x",
    "x7x9x6xx5",
  ],
  [
    "xx5x8x6xx",
    "4x9xx3x1x",
    "x6xx7xx8x",
    "xx1xx2xx9",
    "2xx3x6xx4",
    "9xx4xx1xx",
    "x3xx9xx5x",
    "x8x5xx7x6",
    "xx7x6x3xx",
  ],
];

var solved = [
  [
    "435269781",
    "682571493",
    "197834562",
    "826195347",
    "374682915",
    "951743628",
    "519326874",
    "248957136",
    "763418259",
  ],
  [
    "435216789",
    "967345821",
    "281879634",
    "642798513",
    "573641892",
    "158932476",
    "796128354",
    "429583617",
    "813457965",
  ],
  [
    "834621597",
    "197582436",
    "265493178",
    "542378619",
    "713946825",
    "986215743",
    "825167394",
    "694132758",
    "319754682",
  ],
  [
    "527891346",
    "813476925",
    "964953781",
    "375612489",
    "146238597",
    "298567134",
    "789145263",
    "652389471",
    "431927856",
  ],
  [
    "629874135",
    "847321956",
    "351698472",
    "973462815",
    "458719623",
    "216543798",
    "672935184",
    "185276349",
    "594138267",
  ],
  [
    "176954283",
    "392687154",
    "548312976",
    "519863742",
    "643925861",
    "784216593",
    "965471328",
    "137598642",
    "821739465",
  ],
  [
    "142938765",
    "783465192",
    "596721384",
    "378642519",
    "679583241",
    "254179836",
    "821357946",
    "965814723",
    "417296853",
  ],
  [
    "218369574",
    "586471239",
    "349825761",
    "472516893",
    "196783452",
    "753294618",
    "964128537",
    "831657924",
    "527943186",
  ],
  [
    "761254398",
    "832569174",
    "495836217",
    "643791582",
    "923578641",
    "158427963",
    "214683759",
    "579142836",
    "387915426",
  ],
  [
    "275481639",
    "489573214",
    "361297548",
    "541362879",
    "296834157",
    "973145826",
    "138926475",
    "682759341",
    "754618932",
  ],
];

let grid = [[]];
let cellSelected = {};
let boardSelected;
let pickedUnsolved = [];
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

function createSudokuBoard() {
  boardSelected = Math.floor(Math.random() * unsolved.length);

  pickedUnsolved = unsolved[boardSelected].map((row) => row.split("").join(""));

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = grid[row][col];
      const textNum = cell.querySelector(".cell-num");

      if (pickedUnsolved[row][col] != "x") {
        textNum.textContent = pickedUnsolved[row][col];
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

  if (pickedUnsolved[cellSelected.row][cellSelected.col] == "x") {
    if (input == solved[boardSelected][cellSelected.row][cellSelected.col]) {
      cellSelected.cell.querySelector(".cell-num").textContent = input;
      cellSelected.cell.querySelector(".cell-num").style.color = "green";

      score += 50;
      document.querySelector(".score").textContent = "Score: " + score;

      let stringArray = pickedUnsolved[cellSelected.row].split("");
      stringArray[cellSelected.col] = input;
      pickedUnsolved[cellSelected.row] = stringArray.join("");

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
  for (let row = 0; row < 9; row++) {
    if (pickedUnsolved[row] !== solved[boardSelected][row]) {
      return false;
    }
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
