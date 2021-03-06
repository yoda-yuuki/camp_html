const cards = document.querySelectorAll(".card");
let pair = 0;
let flippedCard = false;
let first, second;
let lockBoard = false;
cards.forEach((card) => card.addEventListener("click", flipCard));

function flipCard() {
  if (lockBoard) return;
  if (this === first) return;

  this.classList.add("flip");
  if (!flippedCard) {
    flippedCard = true;
    first = this;
    return;
  }

  second = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = first.dataset.face === second.dataset.face;
  if (first.dataset.face === second.dataset.face) {
    pair++;
  }
  if (pair === 8) {
    setTimeout(function () {
      alert("ゲームクリア！！");
    }, 500);
  }
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  first.removeEventListener("click", flipCard);
  second.removeEventListener("click", flipCard);

  resetBoard();
}
function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    first.classList.remove("flip");
    second.classList.remove("flip");
    resetBoard();
  }, 1000);
}
function resetBoard() {
  [flippedCard, lockBoard] = [false, false];
  [first, second] = [null, null];
}

(function shuffle() {
  cards.forEach((card) => {
    let newPosition = Math.floor(Math.random() * 18);
    card.style.order = newPosition;
  });
})();
