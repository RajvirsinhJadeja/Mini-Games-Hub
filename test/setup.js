// Mock DOM elements
document.body.innerHTML = `
  <div class="sudoku-grid"></div>
  <div class="score">Score: 0</div>
  <div class="mistakes">Mistakes: 0/3</div>
  <div class="time">00:00</div>
  <div class="num">1</div>
  <div class="num">2</div>
  <div class="num">3</div>
  <div class="num">4</div>
  <div class="num">5</div>
  <div class="num">6</div>
  <div class="num">7</div>
  <div class="num">8</div>
  <div class="num">9</div>
  <div id="modal"></div>
`;

// Mock fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        newboard: {
          grids: [
            {
              value: Array(9)
                .fill()
                .map(() => Array(9).fill(0)),
              solution: Array(9)
                .fill()
                .map(() => Array(9).fill(0)),
            },
          ],
        },
      }),
  })
);
