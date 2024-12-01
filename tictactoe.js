const boxs = document.querySelectorAll(".box");
const restart = document.querySelector("#restart");
const statusText = document.querySelector("#statusText");


const possiblity = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let begin = false;

init();
function init() {
  boxs.forEach((box) => box.addEventListener("click", boxClick));
  restart.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  begin = true;
}

function boxClick() {
  const cellindex = this.getAttribute("cellindex");
  if (options[cellindex] != "" || !begin) {
    return;
  }
  updateBox(this, cellindex);

  checkWinner();
}
function updateBox(box, index) {
  options[index] = currentPlayer;
  box.textContent = currentPlayer;
}
function changePlayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}s' Turn`;
}
function checkWinner() {
  let roundWon = false;
  for (let i = 0; i < possiblity.length; i++) {
    const condition = possiblity[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    statusText.textContent = `${currentPlayer}Wins!`;
    begin = false;
  } else if (!options.includes("")) {
    statusText.textContent = `Draw!`;
    begin = false;
  } else {
    changePlayer();
  }
}
function restartGame() {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `${currentPlayer}'s Turn`;
  boxs.forEach((box) => (box.textContent = ""));
  begin = true;
}
