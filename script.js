const cell0 = document.getElementById("cell0");
const cell1 = document.getElementById("cell1");
const cell2 = document.getElementById("cell2");
const cell3 = document.getElementById("cell3");
const cell4 = document.getElementById("cell4");
const cell5 = document.getElementById("cell5");
const cell6 = document.getElementById("cell6");
const cell7 = document.getElementById("cell7");
const cell8 = document.getElementById("cell8");
const endgame = document.getElementById("endgame");
const text = document.getElementById("text");
const restartBtn = document.getElementById("restartBtn");
const body = document.querySelector("body");

const board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let currentPlayer = "x";

const moveLogic = (i, j) => {
  if (board[i][j] === "") {
    board[i][j] = currentPlayer;
    let result = currentPlayer;
    currentPlayer = currentPlayer === "x" ? "o" : "x";
    return result;
  }
};

const checkWinner = (board) => {
  // rows
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] !== "" &&
      board[i][0] === board[i][1] &&
      board[i][1] === board[i][2]
    ) {
      return (text.textContent = `${board[i][0]} Player wins!`);
    }
  }

  // columns
  for (let j = 0; j < 3; j++) {
    if (
      board[0][j] !== "" &&
      board[0][j] === board[1][j] &&
      board[1][j] === board[2][j]
    ) {
      return (text.textContent = `${board[0][j]} Player wins!`);
    }
  }

  // diagonals
  if (
    board[0][0] !== "" &&
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2]
  ) {
    return (text.textContent = `${board[0][0]} Player wins!`);
  }

  if (
    board[0][2] !== "" &&
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0]
  ) {
    return (text.textContent = `${board[0][2]} Player wins!`);
  }

  // draw
  if (board.flat().every((cell) => cell !== "")) {
    return (text.textContent = "It's a tie");
  }

  return "No winner yet";
};

const cellClick = (cell, i, j) => {
  if (board[i][j] !== "") {
    return;
  }

  const result = moveLogic(i, j);
  cell.textContent = result;
  const winner = checkWinner(board);
  if (winner !== "No winner yet") {
    endgame.showModal();
  }
};
cell0.addEventListener("click", () => cellClick(cell0, 0, 0));
cell1.addEventListener("click", () => cellClick(cell1, 0, 1));
cell2.addEventListener("click", () => cellClick(cell2, 0, 2));
cell3.addEventListener("click", () => cellClick(cell3, 1, 0));
cell4.addEventListener("click", () => cellClick(cell4, 1, 1));
cell5.addEventListener("click", () => cellClick(cell5, 1, 2));
cell6.addEventListener("click", () => cellClick(cell6, 2, 0));
cell7.addEventListener("click", () => cellClick(cell7, 2, 1));
cell8.addEventListener("click", () => cellClick(cell8, 2, 2));

restartBtn.addEventListener("click", () => {
  board.forEach((row) => row.fill(""));
  document.querySelectorAll(".cell").forEach((cell) => (cell.textContent = ""));
  endgame.close();
  text.textContent = "";
  currentPlayer = "x";
});
