'use strict';

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
      startPageStart(startWrapper);
      //loadScriptAsync("JS/start-page.js");
      break;
    case 'main-page':
      //loadScriptAsync("JS/main-page.js");
      game.start();
      break;
    case (state.page):
      //game.startPopup(game.pageObjs.Objs, state.page, game.pageObjs.text, game.pageObjs.popUpContainer, game.pageObjs.roomContainer);
  }
}

function loadScriptAsync(url) {
  var script = document.createElement("script");
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
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

function switchToPopup(state) {
  switchToState({
    page: state
  });
}