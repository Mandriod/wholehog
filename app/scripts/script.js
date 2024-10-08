'use strict';
const title = document.querySelector('.js-title');
const rules = document.querySelector('.js-rules');
const titleLogo = document.querySelector('.js-title__logo');
const titleCopy = document.querySelector('.js-title__copy');
const finalLogo = document.querySelector('.js-final__logo');
const finalCopy = document.querySelector('.js-final__copy');
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
const active = document.querySelector('.js-active--player');
const winner = document.querySelector('.js-winner');
const forwardClass = "flip 1s cubic-bezier(.4,-.1,.2,1.2) forwards";
const reverseClass = "flip 1s cubic-bezier(.4,-.1,.2,1.2) reverse";

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
  active.classList.remove('js-active');
};

init();

const switchPlayer = function () {
  currentScore = 0;
  document.querySelector(`.js-player__${currentPlayer}--current`).textContent =
    currentScore;
  currentPlayer === 0 ? (currentPlayer = 1) : (currentPlayer = 0);
  active.classList.toggle('js-active');
  btnHold.classList.remove('c-die--hold--disabled');
};

function randomNum(x, y) {
  const value = Math.random() * (y - x) + x;
  return Math.floor(value)
}

function coinFlip() {
  setTimeout(() => {
    diceBlk.style.animation = randomNum(1,3) === 1 ? forwardClass : reverseClass;
    diceWht.style.animation = randomNum(1,3) === 1 ? forwardClass : reverseClass;
  }, 0);
}

btnRoll.addEventListener('click', function () {
  let blkDiceNum = randomNum(1,7);
  let whtDiceNum = randomNum(1,7);
  let diceNum = blkDiceNum + whtDiceNum

  if (playing) {
    setTimeout(() => {
      diceBlk.src = `images/dice-bk-${blkDiceNum}.svg`;
      diceWht.src = `images/dice-wt-${whtDiceNum}.svg`;
    }, 250);

    console.log(blkDiceNum);
    console.log(whtDiceNum);

    diceBlk.style.animation = "none";
    diceWht.style.animation = "none";

    coinFlip()

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
      } if (currentPlayer === 1) {
        console.log('player 2');
        winner.innerHTML = 'TWO';
      }
      finalScreen.classList.remove('js-final-hidden');
      finalScreen.classList.remove('js-start');
      playing = false;
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
  }, 250);
});

btnNew.addEventListener('click', function(){
  init();
  finalScreen.classList.add('js-start');
  setTimeout(() => {
    finalLogo.classList.add('js-container-lg');
    finalCopy.classList.add('js-container-sm');
  }, 250);
  setTimeout(() => {
    finalLogo.classList.remove('js-container-lg');
    finalCopy.classList.remove('js-container-sm');
    finalScreen.classList.remove('js-start');
    finalScreen.classList.add('js-final-hidden');
  }, 1250);
});

btnInfo.addEventListener('click', function(){
  rules.classList.toggle('js-rules--open');
});

btnClose.addEventListener('click', function(){
  rules.classList.remove('js-rules--open');
});