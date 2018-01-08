const app = function() {
  let game = new Game();
  let player1 = new Boards(1);
  let player2 = new Boards(2);

  let ownWrapper1,
    ownWrapper2,
    ownBoard1,
    ownBoard2,
    targetWrapper1,
    targetWrapper2,
    targetBoard1,
    targetBoard2,
    player1Global,
    player2Global,
    missElement,
    hitElement,
    winElement,
    ownCells1,
    ownCells2,
    targetCells1,
    targetCells2;

  function init() {
    selectElements();
    player1.generateBoards(ownBoard1, targetBoard1);
    player2.generateBoards(ownBoard2, targetBoard2);
    selectElementsAfterBoardGenerated();
    addEvents();
  }
  function selectElements() {
    ownWrapper1 = document.querySelector(`.Player1own`);
    ownWrapper2 = document.querySelector(`.Player2own`);
    ownBoard1 = document.querySelector(`.Player1ownBoard`);
    ownBoard2 = document.querySelector(`.Player2ownBoard`);
    targetWrapper1 = document.querySelector(`.Player1target`);
    targetWrapper2 = document.querySelector(`.Player2target`);
    targetBoard1 = document.querySelector(`.Player1targetBoard`);
    targetBoard2 = document.querySelector(`.Player2targetBoard`);
    player1Global = document.querySelector(`.player1Global`);
    player2Global = document.querySelector(`.player2Global`);
    missElement = document.querySelector(`.MISS`);
    hitElement = document.querySelector(`.HIT`);
    winElement = document.querySelector(`.WIN`);
  }
  function selectElementsAfterBoardGenerated() {
    ownCells1 = document.querySelectorAll(`.Player1ownBoard > .cell`);
    ownCells2 = document.querySelectorAll(`.Player2ownBoard > .cell`);
    targetCells1 = document.querySelectorAll(`.Player1targetBoard > .cell`);
    targetCells2 = document.querySelectorAll(`.Player2targetBoard > .cell`);
  }
  function addEvents() {
    ownCells1.forEach(x => x.addEventListener("click", ownCellHandler));
    ownCells2.forEach(x => x.addEventListener("click", ownCellHandler));
    targetCells1.forEach(x => x.addEventListener("click", targetCellHandler));
    targetCells2.forEach(x => x.addEventListener("click", targetCellHandler));
  }
  function ownCellHandler(event) {
    switch (game.currentPlayerTurn) {
      case 1:
        game.Player1Ships.push(parseInt(event.target.id));
        event.target.classList.add("selected");
        game.Player1Ships.length === 5 ? game.changeTurn(100) : null;
        break;
      case 2:
        game.Player2Ships.push(parseInt(event.target.id));
        event.target.classList.add("selected");
        game.Player2Ships.length === 5 ? game.shipSelectingFinished() : null;
        break;
    }
  }
  function targetCellHandler(event) {
    switch (game.currentPlayerTurn) {
      case 1:
        game.checkIfHit(parseInt(event.target.id), game.Player2Ships)
          ? game.hitShot(event, 1)
          : game.missedShot(event);
        break;
      case 2:
        game.checkIfHit(parseInt(event.target.id), game.Player1Ships)
          ? game.hitShot(event, 2)
          : game.missedShot(event);
        break;
    }
  }
};

