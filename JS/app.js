import Game from '../JS/main-page.js';
import StartPageStart from '../JS/start-page.js';
import CvPageStart from '../JS/cv-page.js';

let game = null;
let startWrapper = document.getElementById('start-wrapper');
renderNewState();
window.onhashchange = renderNewState;

function renderNewState() {
  const hash = window.location.hash;
  let state = decodeURIComponent(hash.substr(1));

  if (state === '') {
    switchToStart();
  } else {
    state = JSON.parse(state);
  }

  switch (state.page) {
    case 'start-page':
      if (game) {
        cancelAnimationFrame(game.animation);
      }
      new StartPageStart(startWrapper, switchToMain, switchToCV);
      break;
    case 'main-page':
      game = new Game(switchToCV);
      break;
    case 'cv-page':
      new CvPageStart(switchToStart);
      break;
    case (state.page):
  }
}

function switchToState(state) {
  location.hash = encodeURIComponent(JSON.stringify(state));
}

function switchToStart() {
  switchToState({
    page: 'start-page'
  });
}

function switchToMain() {
  switchToState({
    page: 'main-page'
  });
}

function switchToCV() {
  switchToState({
    page: 'cv-page'
  });
}