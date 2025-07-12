let word = [];
const set = new Set();
let grid = [[]];
let rowCount = 0;
let colCount = 0;
let disableInput = false;

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

async function getWord() {
  try {
    const response = await fetch(
      "https://random-word-api.herokuapp.com/word?length=5"
    );
    const test = await response.json();
    console.log(test[0]);
    for (let i = 0; i < 5; i++) {
      word.push(test[0].charAt(i).toLowerCase());
      set.add(test[0].charAt(i).toLowerCase());
    }
    console.log(word);
    console.log(set);
  } catch (error) {
    console.error(error);
  }
}

function createWordleGrid() {
  const gridContainer = document.querySelector(".wordle-grid");

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

function checkWord() {
  disableInput = true;
  for (let col = 0; col < 5; col++) {
    let textContainer = grid[rowCount][col];

    setTimeout(() => {
      if (textContainer.innerText.toLowerCase() == word[col].toLowerCase()) {
        textContainer.style.transition = "background-color 0.3s ease";
        textContainer.style.backgroundColor = "green";
      } else if (set.has(textContainer.innerText.toLowerCase())) {
        textContainer.style.transition = "background-color 0.3s ease";
        textContainer.style.backgroundColor = "orange";
      } else {
        textContainer.style.transition = "background-color 0.3s ease";
        textContainer.style.backgroundColor = "red";
      }
    }, 300 * col);
  }
  setTimeout(() => {
    disableInput = false;
  }, 2000);
}

function handleGameOver() {}

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

  if (rowCount === 5 && colCount === 4) handleGameOver();
}

function handleBackspace() {
  let textContainer = grid[rowCount][colCount];
  if (colCount === 4 && textContainer.innerText != "")
    textContainer.textContent = "";
  else if (colCount > 0) colCount--;

  textContainer = grid[rowCount][colCount];

  textContainer.textContent = "";
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
