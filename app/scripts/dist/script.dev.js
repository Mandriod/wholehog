'use strict';

var title = document.querySelector('.js-title');
var rules = document.querySelector('.js-rules');
var titleLogo = document.querySelector('.js-title__logo');
var titleCopy = document.querySelector('.js-title__copy');
var finalLogo = document.querySelector('.js-final__logo');
var finalCopy = document.querySelector('.js-final__copy');
var finalScreen = document.querySelector('.js-final');
var player0 = document.querySelector('.js-player--0');
var score0 = document.querySelector('.js-player__0--score');
var current0 = document.querySelector('.js-player__0--current');
var player1 = document.querySelector('.js-player--1');
var score1 = document.querySelector('.js-player__1--score');
var current1 = document.querySelector('.js-player__1--current');
var diceBlk = document.querySelector('.js-die--blk');
var diceWht = document.querySelector('.js-die--wht');
var btnRoll = document.querySelector('.js-die--roll');
var btnHold = document.querySelector('.js-die--hold');
var btnStart = document.querySelector('.js-btn--start');
var btnNew = document.querySelector('.js-btn--new');
var btnInfo = document.querySelector('.js-info');
var btnClose = document.querySelector('.js-close');
var active = document.querySelector('.js-active--player');
var winner = document.querySelector('.js-winner');
var forwardClass = "flip 1s cubic-bezier(.4,-.1,.2,1.2) forwards";
var reverseClass = "flip 1s cubic-bezier(.4,-.1,.2,1.2) reverse";
var currentPlayer, scores, currentScore, playing;

var init = function init() {
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

var switchPlayer = function switchPlayer() {
  currentScore = 0;
  document.querySelector(".js-player__".concat(currentPlayer, "--current")).textContent = currentScore;
  currentPlayer === 0 ? currentPlayer = 1 : currentPlayer = 0;
  active.classList.toggle('js-active');
  btnHold.classList.remove('c-die--hold--disabled');
};

function randomNum(x, y) {
  var value = Math.random() * (y - x) + x;
  return Math.floor(value);
}

function coinFlip() {
  setTimeout(function () {
    diceBlk.style.animation = randomNum(1, 3) === 1 ? forwardClass : reverseClass;
    diceWht.style.animation = randomNum(1, 3) === 1 ? forwardClass : reverseClass;
  }, 0);
}

btnRoll.addEventListener('click', function () {
  var blkDiceNum = randomNum(1, 7);
  var whtDiceNum = randomNum(1, 7);
  var diceNum = blkDiceNum + whtDiceNum;

  if (playing) {
    setTimeout(function () {
      diceBlk.src = "images/dice-bk-".concat(blkDiceNum, ".svg");
      diceWht.src = "images/dice-wt-".concat(whtDiceNum, ".svg");
    }, 250);
    console.log(blkDiceNum);
    console.log(whtDiceNum);
    diceBlk.style.animation = "none";
    diceWht.style.animation = "none";
    coinFlip();

    if (blkDiceNum != 1 && whtDiceNum != 1) {
      currentScore += diceNum;
      document.querySelector(".js-player__".concat(currentPlayer, "--current")).textContent = currentScore;
      btnHold.addEventListener('click', holdBtn);
      btnHold.classList.remove('c-die--hold--disabled');
    }

    if (blkDiceNum == 1 && whtDiceNum == 1) {
      scores["".concat(currentPlayer)] = 0;
      document.querySelector(".js-player__".concat(currentPlayer, "--score")).textContent = scores["".concat(currentPlayer)];
    }

    if (blkDiceNum == whtDiceNum) {
      console.log("equal dice"); // disable hold score button in style
      // disable hold score button event listener

      btnHold.removeEventListener('click', holdBtn);
      btnHold.classList.add('c-die--hold--disabled');
    }

    if (blkDiceNum == 1 || whtDiceNum == 1) {
      switchPlayer();
    }
  }
});

function holdBtn() {
  if (playing) {
    scores["".concat(currentPlayer)] += currentScore;
    document.querySelector(".js-player__".concat(currentPlayer, "--score")).textContent = scores["".concat(currentPlayer)];

    if (scores["".concat(currentPlayer)] >= 20) {
      if (currentPlayer === 0) {
        console.log('player 1');
        winner.innerHTML = 'ONE';
      }

      if (currentPlayer === 1) {
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
btnStart.addEventListener('click', function () {
  init();
  title.classList.add('js-start');
  rules.classList.toggle('js-rules--open');
  setTimeout(function () {
    titleLogo.classList.add('js-container-lg');
    titleCopy.classList.add('js-container-sm');
    rules.classList.toggle('js-hidden');
  }, 250);
});
btnNew.addEventListener('click', function () {
  init();
  finalScreen.classList.add('js-start');
  setTimeout(function () {
    finalLogo.classList.add('js-container-lg');
    finalCopy.classList.add('js-container-sm');
  }, 250);
  setTimeout(function () {
    finalLogo.classList.remove('js-container-lg');
    finalCopy.classList.remove('js-container-sm');
    finalScreen.classList.remove('js-start');
    finalScreen.classList.add('js-final-hidden');
  }, 1250);
});
btnInfo.addEventListener('click', function () {
  rules.classList.toggle('js-rules--open');
});
btnClose.addEventListener('click', function () {
  rules.classList.remove('js-rules--open');
});