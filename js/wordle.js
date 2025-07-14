let word = [];
const wordSet = new Set();
let incorrectLetters = [];
let grid = [[]];
let rowCount = 0;
let colCount = 0;
let disableInput = false;
let isGameOver = false;

gameLoop();

function gameLoop() {
  getWord();
  createWordleGrid();

  document.addEventListener("keydown", handleKeyPress);

  const letterButtons = document.querySelectorAll(".letter");
  letterButtons.forEach((charButton) =>
    charButton.addEventListener("click", handleClickPress)
  );

  const actionButtons = document.querySelectorAll(".button");
  actionButtons.forEach((button) =>
    button.addEventListener("click", handleClickPress)
  );
}

function resetGame() {
  word = [];
  wordSet.clear();
  grid = [[]];
  rowCount = 0;
  colCount = 0;
  disableInput = false;
  isGameOver = false;

  console.log("incorrect letters: " + incorrectLetters);

  for (let i = 0; i < incorrectLetters.length; i++) {
    let clearInput = document.querySelector(
      `[data-letter="${incorrectLetters[i]}"]`
    );

    clearInput.style.backgroundColor = "transparent";
    clearInput.classList.remove("no-hover");
  }

  incorrectLetters = [];

  gameLoop();
}

async function getWord() {
  try {
    const response = await fetch(
      "https://random-word-api.herokuapp.com/word?length=5"
    );
    const test = await response.json();
    console.log(test[0]);
    for (let i = 0; i < 5; i++) {
      word.push(test[0].charAt(i).toLowerCase());
      wordSet.add(test[0].charAt(i).toLowerCase());
    }
    console.log(word);
    console.log(wordSet);
  } catch (error) {
    console.error(error);
  }
}

function createWordleGrid() {
  const gridContainer = document.querySelector(".wordle-grid");

  gridContainer.innerHTML = "";

  for (let row = 0; row < 6; row++) {
    grid[row] = [];
    for (let col = 0; col < 5; col++) {
      const cell = document.createElement("div");
      const textNum = document.createElement("p");

      cell.classList.add("cell");
      textNum.classList.add("cell-num");

      cell.style.display = "flex";
      cell.style.alignItems = "center";
      cell.style.justifyContent = "center";
      cell.style.width = "clamp(60px, 13vw, 85px)";
      cell.style.height = "clamp(60px, 13vw, 85px)";
      cell.style.border = "2px solid white";

      cell.appendChild(textNum);
      gridContainer.appendChild(cell);

      grid[row][col] = cell;
    }
  }
}

function handleInput(input) {
  let textContainer = grid[rowCount][colCount];

  if (textContainer.innerText == "") textContainer.textContent = input;

  textContainer.style.color = "white";
  textContainer.style.fontSize = "1.5rem";

  if (colCount < 4) colCount++;
}

function handleEnter() {
  let textContainer = grid[rowCount][colCount];
  if (colCount === 4 && textContainer.innerText != "") {
    checkWord();
    rowCount++;
    colCount = 0;
  }
}

function handleBackspace() {
  let textContainer = grid[rowCount][colCount];
  if (colCount === 4 && textContainer.innerText != "")
    textContainer.textContent = "";
  else if (colCount > 0) colCount--;

  textContainer = grid[rowCount][colCount];

  textContainer.textContent = "";
}

function checkWord() {
  disableInput = true;
  isGameOver = true;

  for (let col = 0; col < 5; col++) {
    let textContainer = grid[rowCount][col];

    setTimeout(() => {
      if (textContainer.innerText.toLowerCase() == word[col].toLowerCase()) {
        textContainer.style.transition = "background-color 0.3s ease";
        textContainer.style.backgroundColor = "green";
      } else if (wordSet.has(textContainer.innerText.toLowerCase())) {
        textContainer.style.transition = "background-color 0.3s ease";
        textContainer.style.backgroundColor = "orange";

        isGameOver = false;
      } else {
        textContainer.style.transition = "background-color 0.3s ease";
        textContainer.style.backgroundColor = "red";

        incorrectLetters.push(textContainer.innerText);

        const makeRedButton = document.querySelector(
          `[data-letter="${textContainer.innerText}"]`
        );

        makeRedButton.style.backgroundColor = "red";
        makeRedButton.classList.add("no-hover");

        isGameOver = false;
      }
    }, 300 * col);
  }
  setTimeout(() => {
    disableInput = false;
    if (rowCount === 6) isGameOver = true;

    handleGameOver();
  }, 2000);
}

function handleGameOver() {
  if (isGameOver === false) return;

  if (rowCount === 6) {
    document.getElementById("modal-title").textContent = "Game Over";
    document.getElementById(
      "modal-message-1"
    ).textContent = `Nice Try! The word was ${word.toString()}`;

    const modalElement = document.getElementById("modal");
    modalElement.showModal();

    document
      .getElementById("tryAgain-button")
      .addEventListener("click", function () {
        modalElement.close();
        resetGame();
      });
    document
      .getElementById("home-button")
      .addEventListener("click", function () {
        modalElement.close();
        window.location.href = "index.html";
      });
  } else {
    document.getElementById("modal-title").textContent = "Congratulations";
    document.getElementById("modal-message-1").textContent =
      "Great job! You found the word!";

    const modalElement = document.getElementById("modal");
    modalElement.showModal();

    document
      .getElementById("tryAgain-button")
      .addEventListener("click", function () {
        modalElement.close();
        resetGame();
      });
    document
      .getElementById("home-button")
      .addEventListener("click", function () {
        modalElement.close();
        window.location.href = "index.html";
      });
  }
}

function handleKeyPress(e) {
  if (disableInput) return;

  if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
    handleInput(e.key.toUpperCase());
  } else if (e.key === "Enter") {
    handleEnter();
  } else if (e.key === "Backspace") {
    handleBackspace();
  }
}

function handleClickPress(e) {
  if (disableInput) return;

  const clickedElement = e.target;
  if (clickedElement.innerText == "Enter") handleEnter();
  else if (clickedElement.innerText == "Delete") handleBackspace();
  else handleInput(clickedElement.innerText);
}
