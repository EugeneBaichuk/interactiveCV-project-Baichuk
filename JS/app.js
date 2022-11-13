import Game from '../JS/main-page.js';
import StartPageStart from '../JS/start-page.js';
import CvPageStart from '../JS/cv-page.js';

const activeImgProps = [
  {
    src:"pages/main-page/img/front-shelf.svg",
    classList: ["room__img", "room__img_type_front"],
    id: "front-shelf"
  },
  {
    src:"pages/main-page/img/room.svg",
    classList: ["room__bg-img"],
    id: "bg"
  },
  {
    src:"pages/main-page/img/books.svg",
    classList: ["room__img", "room__img_type_active"],
    id: "books"
  },
  {
    src:"pages/main-page/img/certificate.svg",
    classList: ["room__img", "room__img_type_active"],
    id: "certificate"
  },
  {
    src:"pages/main-page/img/hard-shelf.svg",
    classList: ["room__img", "room__img_type_active"],
    id: "hard-shelf"
  },
  {
    src:"pages/main-page/img/hobby.svg",
    classList: ["room__img", "room__img_type_active"],
    id: "hobby"
  },
  {
    src:"pages/main-page/img/lern-shelf.svg",
    classList: ["room__img", "room__img_type_active"],
    id: "learn-shelf"
  },
  {
    src:"pages/main-page/img/mobile.svg",
    classList: ["room__img", "room__img_type_active", "room__img_type_front"],
    id: "mobile"
  },
  {
    src:"pages/main-page/img/pc.svg",
    classList: ["room__img", "room__img_type_active"],
    id: "pc"
  },
  {
    src:"pages/main-page/img/photo.svg",
    classList: ["room__img", "room__img_type_active"],
    id: "photo"
  },
  {
    src:"pages/main-page/img/workbook.svg",
    classList: ["room__img","room__img_type_active", "room__img_type_front"],
    id: "workbook"
  },
  {
    src:"pages/main-page/img/coffee.svg",
    classList: ["room__img", "room__img_id_coffee", "room__img_type_active"],
    id: "coffee"
  },
];

const cvProps = [];

const playerImgProps = [
  {
    src:"pages/main-page/img/player-bot-right.svg",
    classList: ["room__img"],
    id: "player"
  },
  {
    src:"pages/main-page/img/player-bot-left.svg",
    classList: ["room__img"],
    id: "player"
  },
  {
    src:"pages/main-page/img/player-top-right.svg",
    classList: ["room__img"],
    id: "player"
  },
  {
    src:"pages/main-page/img/player-top-left.svg",
    classList: ["room__img"],
    id: "player"
  },
];

const startPlayerImgProps = [{
  src:"pages/main-page/img/player-bot-right.svg",
  classList: ["room__img"],
  id: "player"
}];

function preloadImgs (props) {
  const imgs = props.map((img, i) => {
    img = new Image();
    img.src = props[i].src;
    img.classList.add(...props[i].classList);
    img.id = props[i].id;
    return img;
  });
  return imgs;
} 

const activeImgs = preloadImgs(activeImgProps);
const personImgs = preloadImgs(playerImgProps);
const startPersonImg = preloadImgs(startPlayerImgProps);


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
      game = new Game(switchToCV, activeImgs, personImgs, startPersonImg);
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