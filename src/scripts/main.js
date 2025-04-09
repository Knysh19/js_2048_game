'use strict';

import Game from '../modules/Game.class.js';

const game = new Game();

document.addEventListener('keydown', (evnt) => {
  if (game.getStatus() !== 'playing') {
    return;
  }

  switch (event.key) {
    case 'ArrowLeft':
      game.moveLeft();
      break;
    case 'ArrowRight':
      game.moveRight();
      break;
    case 'ArrowUp':
      game.moveUp();
      break;
    case 'ArrowDown':
      game.moveDown();
      break;
    default:
      return;
  }

  game.checkGameOver();
  updateUI();
});

function updateUI() {
  const cells = document.querySelectorAll('.field-cell');
  let index = 0;

  game.getState().forEach((row) => {
    row.forEach((cell) => {
      const cellElement = cells[index++];

      cellElement.textContent = cell !== 0 ? cell : '';
      cellElement.className = 'field-cell';

      if (cell !== 0) {
        cellElement.classList.add(`field-cell--${cell}`);
      }
    });
  });

  document.querySelector('.game-score').textContent = game.getScore();

  const gameStatus = game.getStatus();
  const startButton = document.querySelector('.start');
  const winMessage = document.querySelector('.message-win');
  const loseMessage = document.querySelector('.message-lose');
  const startMessage = document.querySelector('.message-start');

  if (gameStatus === 'win') {
    winMessage.classList.remove('hidden');
    startButton.textContent = 'Restart';
  } else if (gameStatus === 'lose') {
    loseMessage.classList.remove('hidden');
    startButton.textContent = 'Restart';
  } else {
    winMessage.classList.add('hidden');
    loseMessage.classList.add('hidden');
    startButton.textContent = 'Start';
  }

  if (gameStatus !== 'idle') {
    startMessage.classList.add('hidden');
  } else {
    startMessage.classList.remove('hidden');
  }
}

document.querySelector('.start').addEventListener('click', () => {
  if (game.getStatus() === 'idle') {
    game.start();
    updateUI();
  } else if (game.getStatus() === 'win' || game.getStatus() === 'lose') {
    game.restart();
    updateUI();
  }
});
