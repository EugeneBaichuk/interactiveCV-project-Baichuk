'use strict';

let startWrapper = document.getElementById('start-wrapper');
let game;

renderNewState();

window.onhashchange = renderNewState;
let mainPageObj;

function renderNewState() {
  const hash = window.location.hash;
  let state = decodeURIComponent(hash.substr(1));

  if (state === '') {
    state = {
      page: 'start-page'
    };
  } else {
    state = JSON.parse(state);
  }

  switch (state.page) {
    case 'start-page':
      loadScriptAsync("JS/start-page.js");
      break;
    case 'main-page':
      loadScriptAsync("JS/main-page.js");
      break;
  }
}

function loadScriptAsync(url) {
  var s = document.createElement("script");
  s.src = url;
  document.getElementsByTagName("head")[0].appendChild(s);
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