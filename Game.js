class Game {
  constructor() {
    this.Player1Score = 0;
    this.Player2Score = 0;
    this.Player1Ships = [];
    this.Player2Ships = [];
    this.currentPlayerTurn = 1;
  }
  ownCellHandler(event) {
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
  targetCellHandler(event) {
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
  checkIfHit(id, enemyShips) {
    return enemyShips.includes(id);
  }
  hitShot(event, shooter) {
    event.target.classList.add("attackHit");
    this.hitAndMissAnimation(hitElement);
    this.scoreUpdate(shooter);
    this.checkIfWinner();
  }
  missedShot(event) {
    event.target.classList.add("attackMiss");
    this.hitAndMissAnimation(missElement);
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
      player2Global.classList.toggle("noShow");
      player1Global.classList.toggle("noShow");
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
      ? (winElement.innerHTML = `<h2>Player 1 Wins!</h2> ${button}`)
      : (winElement.innerHTML = `<h2>Player 2 Wins!</h2> ${button}`);

    winElement.classList.toggle("noShow");
    player2Global.classList.add("noShow");
    player1Global.classList.add("noShow");
  }
  shipSelectingFinished() {
    targetBoard1.classList.remove("noShow");
    targetWrapper1.classList.remove("noShow");
    targetBoard2.classList.remove("noShow");
    targetWrapper2.classList.remove("noShow");
    ownWrapper1.classList.add("noShow");
    ownWrapper2.classList.add("noShow");
    this.changeTurn(300);
  }
}
