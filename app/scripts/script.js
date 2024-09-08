'use strict';
const title = document.querySelector('.js-title');
const rules = document.querySelector('.js-rules');
const titleLogo = document.querySelector('.js-title__logo');
const titleCopy = document.querySelector('.js-title__copy');
const finalScreen = document.querySelector('.js-final');
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
const btnInfo = document.querySelector('.js-info');
const btnClose = document.querySelector('.js-close');
const act = document.querySelector('.js-active--player');
const winner = document.querySelector('.js-winner');

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
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('js-active');
  player1.classList.remove('js-active');
  act.classList.remove('js-act');
};

init();

const switchPlayer = function () {
  currentScore = 0;
  document.querySelector(`.js-player__${currentPlayer}--current`).textContent =
    currentScore;
  currentPlayer === 0 ? (currentPlayer = 1) : (currentPlayer = 0);
  // player0.classList.toggle('js-active');
  // player1.classList.toggle('js-active');
  act.classList.toggle('js-act');
  btnHold.classList.remove('c-die--hold--disabled');
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

    console.log(blkDiceNum);
    console.log(whtDiceNum);

    if (blkDiceNum != 1 && whtDiceNum != 1) {
      currentScore += diceNum;
      document.querySelector(`.js-player__${currentPlayer}--current`).textContent =
        currentScore;
      btnHold.addEventListener('click', holdBtn);
      btnHold.classList.remove('c-die--hold--disabled');
    } if (blkDiceNum == 1 && whtDiceNum == 1) {
      scores[`${currentPlayer}`] = 0;
      document.querySelector(`.js-player__${currentPlayer}--score`).textContent =
      scores[`${currentPlayer}`];
    } if (blkDiceNum == whtDiceNum) {
      console.log("equal dice");
      // disable hold score button in style
      // disable hold score button event listener
      btnHold.removeEventListener('click', holdBtn);
      btnHold.classList.add('c-die--hold--disabled');
    } if (blkDiceNum == 1 || whtDiceNum == 1) {
      switchPlayer();
    }
  }
});

function holdBtn() {
  if (playing) {
    scores[`${currentPlayer}`] += currentScore;
    document.querySelector(`.js-player__${currentPlayer}--score`).textContent =
      scores[`${currentPlayer}`];
    if (scores[`${currentPlayer}`] >= 20) {
      if (currentPlayer === 0) {
        console.log('player 1');
        winner.innerHTML = 'ONE';
        finalScreen.classList.remove('js-hidden');
        finalScreen.classList.remove('js-start');
        playing = false;
      } if (currentPlayer === 1) {
        console.log('player 2');
        winner.innerHTML = 'TWO';
        finalScreen.classList.remove('js-hidden');
        finalScreen.classList.remove('js-start');
        playing = false;
      }
    } else {
      switchPlayer();
    }
  }
}

btnHold.addEventListener('click', holdBtn);


btnStart.addEventListener('click', function(){
  init();
  title.classList.add('js-start');
  rules.classList.toggle('js-rules--open');
  setTimeout(() => {
    titleLogo.classList.add('js-container-lg');
    titleCopy.classList.add('js-container-sm');
    rules.classList.toggle('js-hidden');
  }, "250");
});

btnNew.addEventListener('click', function(){
  init();
  finalScreen.classList.toggle('js-start');
  finalScreen.classList.toggle('js-hidden')
});

btnInfo.addEventListener('click', function(){
  rules.classList.toggle('js-rules--open');
});

btnClose.addEventListener('click', function(){
  rules.classList.remove('js-rules--open');
});