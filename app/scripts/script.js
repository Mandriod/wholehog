'use strict';
const player0 = document.querySelector('.js-player--0');
const score0 = document.querySelector('.js-player__0--score');
const current0 = document.querySelector('.js-player__0--current');
const player1 = document.querySelector('.js-player--1');
const score1 = document.querySelector('.js-player__1--score');
const current1 = document.querySelector('.js-player__1--current');
const diceBlk = document.querySelector('.js-die--blk');
const diceWht = document.querySelector('.js-die--wht');
const btnRoll = document.querySelector('.js-die--roll');
const btnHold = document.querySelector('.js-die--hold');
const btnStart = document.querySelector('.js-btn--start');
const btnNew = document.querySelector('.js-btn--new');

let currentPlayer, scores, currentScore, playing;

const init = function () {
  current0.textContent = 0;
  score0.textContent = 0;
  current1.textContent = 0;
  score1.textContent = 0;
  currentPlayer = 0;
  scores = [0, 0];
  currentScore = 0;
  playing = true;
  // dice.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('js-active');
  player1.classList.remove('js-active');
};

init();

const switchPlayer = function () {
  currentScore = 0;
  document.querySelector(`.js-player__${currentPlayer}--current`).textContent =
    currentScore;
  currentPlayer === 0 ? (currentPlayer = 1) : (currentPlayer = 0);
  player0.classList.toggle('js-active');
  player1.classList.toggle('js-active');
};

function randomNum(x, y) {
  const value = Math.random() * (y - x) + x;
  return Math.floor(value)
}

btnRoll.addEventListener('click', function () {
  let blkDiceNum = randomNum(1,7);
  let whtDiceNum = randomNum(1,7);
  let diceNum = blkDiceNum + whtDiceNum
  if (playing) {
    diceBlk.src = `images/dice-bk-${blkDiceNum}.svg`;
    diceWht.src = `images/dice-wt-${whtDiceNum}.svg`;
    // dice.classList.remove('hidden');

    console.log(blkDiceNum);
    console.log(whtDiceNum);

    if (blkDiceNum != 1 && whtDiceNum != 1) {
      console.log('test');
      currentScore += diceNum;
      document.querySelector(`.js-player__${currentPlayer}--current`).textContent =
        currentScore;
    } if (blkDiceNum == 1 && whtDiceNum == 1) {
      scores[`${currentPlayer}`] = 0;
      document.querySelector(`.js-player__${currentPlayer}--score`).textContent =
      scores[`${currentPlayer}`];
      console.log("lost it all");
    } if (blkDiceNum == 1 || whtDiceNum == 1) {
      console.log("switch");
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[`${currentPlayer}`] += currentScore;
    document.querySelector(`.js-player__${currentPlayer}--score`).textContent =
      scores[`${currentPlayer}`];
    if (scores[`${currentPlayer}`] >= 100) {
      document
        .querySelector(`.js-player__${currentPlayer}--score`)
        .classList.add('player--winner');
      document.querySelector('.js-final').classList.remove('js-hidden')
      playing = false;
    } else {
      switchPlayer();
    }
  }
});


btnStart.addEventListener('click', function(){
  init();
  document.querySelector('.js-title').classList.add('js-start');
});

btnNew.addEventListener('click', function(){
  init();
  document.querySelector('.js-final').classList.add('js-start');
});