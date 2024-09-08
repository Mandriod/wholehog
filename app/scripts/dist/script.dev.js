'use strict';

var title = document.querySelector('.js-title');
var rules = document.querySelector('.js-rules');
var titleLogo = document.querySelector('.js-title__logo');
var titleCopy = document.querySelector('.js-title__copy');
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
var act = document.querySelector('.js-active--player');
var currentPlayer, scores, currentScore, playing;

var init = function init() {
  current0.textContent = 0;
  score0.textContent = 0;
  current1.textContent = 0;
  score1.textContent = 0;
  currentPlayer = 0;
  scores = [0, 0];
  currentScore = 0;
  playing = true; // dice.classList.add('hidden');

  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('js-active');
  player1.classList.remove('js-active');
  act.classList.remove('js-act');
};

init();

var switchPlayer = function switchPlayer() {
  currentScore = 0;
  document.querySelector(".js-player__".concat(currentPlayer, "--current")).textContent = currentScore;
  currentPlayer === 0 ? currentPlayer = 1 : currentPlayer = 0; // player0.classList.toggle('js-active');
  // player1.classList.toggle('js-active');

  act.classList.toggle('js-act');
};

function randomNum(x, y) {
  var value = Math.random() * (y - x) + x;
  return Math.floor(value);
}

btnRoll.addEventListener('click', function () {
  var blkDiceNum = randomNum(1, 7);
  var whtDiceNum = randomNum(1, 7);
  var diceNum = blkDiceNum + whtDiceNum;

  if (playing) {
    diceBlk.src = "images/dice-bk-".concat(blkDiceNum, ".svg");
    diceWht.src = "images/dice-wt-".concat(whtDiceNum, ".svg");
    console.log(blkDiceNum);
    console.log(whtDiceNum);

    if (blkDiceNum != 1 && whtDiceNum != 1) {
      currentScore += diceNum;
      document.querySelector(".js-player__".concat(currentPlayer, "--current")).textContent = currentScore;
    }

    if (blkDiceNum == 1 && whtDiceNum == 1) {
      scores["".concat(currentPlayer)] = 0;
      document.querySelector(".js-player__".concat(currentPlayer, "--score")).textContent = scores["".concat(currentPlayer)];
    }

    if (blkDiceNum == 1 || whtDiceNum == 1) {
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    scores["".concat(currentPlayer)] += currentScore;
    document.querySelector(".js-player__".concat(currentPlayer, "--score")).textContent = scores["".concat(currentPlayer)];

    if (scores["".concat(currentPlayer)] >= 100) {
      document.querySelector(".js-player__".concat(currentPlayer, "--score")).classList.add('player--winner');
      finalScreen.classList.remove('js-hidden');
      playing = false;
    } else {
      switchPlayer();
    }
  }
});
btnStart.addEventListener('click', function () {
  init();
  title.classList.add('js-start');
  rules.classList.toggle('js-rules--open');
  setTimeout(function () {
    titleLogo.classList.add('js-container-lg');
    titleCopy.classList.add('js-container-sm');
    rules.classList.toggle('js-hidden');
  }, "250");
});
btnNew.addEventListener('click', function () {
  init();
  finalScreen.classList.add('js-start');
});
btnInfo.addEventListener('click', function () {
  rules.classList.toggle('js-rules--open');
});
btnClose.addEventListener('click', function () {
  rules.classList.remove('js-rules--open');
});