class Boards {
  constructor(player) {
    this.playerNumber = player;
  }

  generateBoards(own, target) {
    for (var i = 1; i < 101; i++) {
      own.innerHTML =
        own.innerHTML + `<div id="${i}" class="cell own">${i}</div>`;
      target.innerHTML =
        target.innerHTML + `<div id="${i}" class="cell target">${i}</div>`;
    }
  }
}

