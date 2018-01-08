class Game {
  constructor() {
    this.Player1Score = 0;
    this.Player2Score = 0;

    this.Player1Ships = [];
    this.Player2Ships = [];

    this.currentPlayerTurn = 1;

    this.selectElements();
    
    this.player2Global.classList.add("noShow");
  }
  selectElements() {
    this.player1Global = document.querySelector(`.player1Global`);
    this.player2Global = document.querySelector(`.player2Global`);
    this.missElement = document.querySelector(`.MISS`);
    this.hitElement = document.querySelector(`.HIT`);
    this.winElement = document.querySelector(`.WIN`);
  }
  ownCellHandler(event) {
    switch (this.currentPlayerTurn) {
      case 1:
        this.Player1Ships.push(parseInt(event.target.id));
        event.target.classList.add("selected");
        this.Player1Ships.length === 5 ? this.changeTurn(100) : null;
        break;
      case 2:
        this.Player2Ships.push(parseInt(event.target.id));
        event.target.classList.add("selected");
        this.Player2Ships.length === 5 ? this.shipSelectingFinished() : null;
        break;
    }
  }
  targetCellHandler(event) {
    switch (this.currentPlayerTurn) {
      case 1:
        this.checkIfHit(parseInt(event.target.id), this.Player2Ships)
          ? this.hitShot(event, 1)
          : this.missedShot(event);
        break;
      case 2:
        this.checkIfHit(parseInt(event.target.id), this.Player1Ships)
          ? this.hitShot(event, 2)
          : this.missedShot(event);
        break;
    }
  }
  checkIfHit(id, enemyShips) {
    return enemyShips.includes(id);
  }
  hitShot(event, shooter) {
    event.target.classList.add("attackHit");
    this.hitAndMissAnimation(this.hitElement);
    this.scoreUpdate(shooter);
    this.checkIfWinner();
  }
  missedShot(event) {
    event.target.classList.add("attackMiss");
    this.hitAndMissAnimation(this.missElement);
    this.changeTurn(450);
  }
  hitAndMissAnimation(element) {
    element.classList.toggle("noShow");
    setTimeout(() => {
      element.classList.toggle("noShow");
    }, 600);
  }
  scoreUpdate(player) {
    player === 1
      ? (this.Player1Score = this.Player1Score + 1)
      : (this.Player2Score = this.Player2Score + 1);
  }
  changeTurn(timeout) {
    this.currentPlayerTurn === 1
      ? (this.currentPlayerTurn = 2)
      : (this.currentPlayerTurn = 1);
    setTimeout(() => {
      this.player2Global.classList.toggle("noShow");
      this.player1Global.classList.toggle("noShow");
    }, timeout);
  }
  checkIfWinner() {
    this.Player1Score === 5
      ? this.winner(1)
      : this.Player2Score === 5 ? this.winner(2) : null;
  }
  winner(player) {
    var button = `<button onClick="window.location.reload()">Play again</button>`;
    player === 1
      ? (this.winElement.innerHTML = `<h2>Player 1 Wins!</h2> ${button}`)
      : (this.winElement.innerHTML = `<h2>Player 2 Wins!</h2> ${button}`);

    this.winElement.classList.toggle("noShow");
    this.player2Global.classList.add("noShow");
    this.player1Global.classList.add("noShow");
  }
  shipSelectingFinished() {
    player1.targetBoard.classList.remove("noShow");
    player1.targetWrapper.classList.remove("noShow");
    player2.targetBoard.classList.remove("noShow");
    player2.targetWrapper.classList.remove("noShow");
    player1.ownWrapper.classList.add("noShow");
    player2.ownWrapper.classList.add("noShow");
    this.changeTurn(300);
  }
}
