class Boards {
  constructor(playerNumber) {
    this.playerNumber = playerNumber;
    this.selectElements();
    this.generateBoards();
    this.selectElementsAfterBoardsCreated();
    this.addEvents();
    this.targetWrapper.classList.add("noShow");
  }
  selectElements() {
    this.ownWrapper = document.querySelector(`.Player${this.playerNumber}own`);
    this.ownBoard = document.querySelector(`.Player${this.playerNumber}ownBoard`);
    this.targetWrapper = document.querySelector(`.Player${this.playerNumber}target`);
    this.targetBoard = document.querySelector(`.Player${this.playerNumber}targetBoard`);
  }
  selectElementsAfterBoardsCreated() {
    this.ownCells = document.querySelectorAll(`.Player${this.playerNumber}ownBoard > .cell`);
    this.targetCells = document.querySelectorAll(`.Player${this.playerNumber}targetBoard > .cell`);
  }
  generateBoards() {
    for (var i = 1; i < 101; i++) {
      this.ownBoard.innerHTML =
        this.ownBoard.innerHTML + `<div id="${i}" class="cell own">${i}</div>`;
      this.targetBoard.innerHTML =
        this.targetBoard.innerHTML + `<div id="${i}" class="cell target">${i}</div>`;
    }
  }
  addEvents() {
    this.ownCells.forEach(x => x.addEventListener("click", game.ownCellHandler.bind(game)));
    this.targetCells.forEach(x => x.addEventListener("click", game.targetCellHandler.bind(game)));
  }
}

