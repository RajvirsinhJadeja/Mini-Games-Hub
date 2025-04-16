const { checkGameComplete } = require("../js/sudoku");

let unsolved = [
  [7, 6, 4, 5, 2, 1, 3, 8, 9],
  [1, 3, 2, 6, 8, 9, 4, 5, 7],
  [8, 9, 5, 3, 4, 7, 1, 6, 2],
  [6, 4, 1, 7, 5, 8, 9, 2, 3],
  [3, 5, 7, 9, 6, 2, 8, 4, 1],
  [9, 2, 8, 1, 3, 4, 5, 7, 6],
  [2, 7, 3, 4, 1, 5, 6, 9, 8],
  [4, 8, 6, 2, 9, 3, 7, 1, 5],
  [5, 1, 9, 8, 7, 6, 2, 3, 0],
];
let solved = [
  [7, 6, 4, 5, 2, 1, 3, 8, 9],
  [1, 3, 2, 6, 8, 9, 4, 5, 7],
  [8, 9, 5, 3, 4, 7, 1, 6, 2],
  [6, 4, 1, 7, 5, 8, 9, 2, 3],
  [3, 5, 7, 9, 6, 2, 8, 4, 1],
  [9, 2, 8, 1, 3, 4, 5, 7, 6],
  [2, 7, 3, 4, 1, 5, 6, 9, 8],
  [4, 8, 6, 2, 9, 3, 7, 1, 5],
  [5, 1, 9, 8, 7, 6, 2, 3, 4],
];

test("returns true when puzzle is solved", () => {
  expect(checkGameComplete(solved, solved)).toBe(true);
});

test("returns false when puzzle is not solved", () => {
  expect(checkGameComplete(unsolved, solved)).toBe(false);
});
