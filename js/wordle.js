let word = [];
const set = new Set();
let grid = [[]];

gameLoop();

function gameLoop() {
  getWord();
  createWordleGrid();
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

      textNum.style.color = "white";

      cell.appendChild(textNum);
      gridContainer.appendChild(cell);

      grid[row][col] = cell;
    }
  }
}

async function getWord() {
  try {
    const response = await fetch(
      "https://random-word-api.herokuapp.com/word?length=5"
    );
    const test = await response.json();
    console.log(test[0]);
    for (let i = 0; i < 5; i++) {
      word.push(test[0].charAt(i));
      set.add(test[0].charAt(i));
    }
    console.log(word);
    console.log(set);
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("keydown", function (e) {
  if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
    console.log("typed a key: " + e.key.toLowerCase());
  } else if (e.key === "Enter") {
    console.log("Pressed Enter!");
  } else if (e.key === "Backspace") {
    console.log("Pressed Backspace!!");
  }
});
