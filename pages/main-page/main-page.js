'use strict';

const game = {
  containerProps: {
    width: 0,
    height: 0,
    id: 'room'
  },
  person: {
    width: 170,
    id: 'head',
  },
  objectsProps: {
    'hobby': {
      width: 203.78,
      height: 179.44,
      top: 482.31,
      left: 12.27,
    },
    'pc': {
      width: 75.92,
      height: 93.89,
      top: 383.24,
      left: 236.12
    },
    'photo': {
      width: 66.7 * 1.5,
      height: 87.78 * 1.5,
      top: 285,
      left: 105
    },
    'coffee': {
      width: 13.32,
      height: 17.15,
      top: 416.59,
      left: 481.74
    },
    'hard-shelf': {
      width: 141.16,
      height: 112.42,
      top: 202.11,
      left: 427.33
    },
    'learn-shelf': {
      width: 141.16,
      height: 86.58,
      top: 349.83,
      left: 530.77
    },
    'certificate': {
      width: 62.85,
      height: 78.08,
      top: 230.71,
      left: 594.58
    },
    'books': {
      width: 47.19,
      height: 41.94,
      top: 532.43,
      left: 598.9
    },
    'mobile': {
      width: 26.37,
      height: 15,
      top: 740.77,
      left: 488.18
    },
    'workbook': {
      width: 31.75 * 2,
      height: 31.75 * 2,
      top: 681,
      left: 527
    },
  },
  bgProps: {
    width: 808,
    height: 889
  },

  start() {
    this.init();
    this.render();
  },
  init() {
    let container = document.createElement('div');
    container.classList.add('container');
    container.id = 'container';
    container.innerHTML = `
    <section class="room">
      <div id="room" class="room__position">
        <img class="room__bg-img" id="bg" src="pages/main-page/img/room.svg" alt="room">
        <img id="books" class="room__img" src="pages/main-page/img/books.svg" alt="">
        <img id="certificate" class="room__img" src="pages/main-page/img/certificate.svg" alt="">
        <img id="coffee" class="room__img" src="pages/main-page/img/coffee.svg" alt="">
        <img id="hard-shelf" class="room__img" src="pages/main-page/img/hard-shelf.svg" alt="">
        <img id="hobby" class="room__img" src="pages/main-page/img/hobby.svg" alt="">
        <img id="learn-shelf" class="room__img" src="pages/main-page/img/lern-shelf.svg" alt="">
        <img id="mobile" class="room__img" src="pages/main-page/img/mobile.svg" alt="">
        <img id="pc" class="room__img" src="pages/main-page/img/pc.svg" alt="">
        <img id="photo" class="room__img" src="pages/main-page/img/photo.svg" alt="">
        <img id="workbook" class="room__img" src="pages/main-page/img/workbook.svg" alt="">
      </div> 
    </section> 
    <section class="person">
      <p> </p> 
      <img id ="head" class="person__img" src="pages/main-page/img/head.svg" alt="">
    </section>
    `;
    document.body.appendChild(container);
  },
  render() {
    const container = document.getElementById(this.containerProps.id);
    const wrapper = document.getElementById('container');
    const bg = document.getElementById('bg');
    let width = this.bgProps.width;
    let height = this.bgProps.height;
    const realWidth = window.innerWidth;
    const realHeight = wrapper.offsetHeight;
    const realWidthHeight = realWidth / realHeight;
    const widthHeight = width / height;
    if (realWidthHeight > widthHeight) {
      height = realHeight;
      width = realHeight * widthHeight;
    } else {
      width = realWidth;
      height = realWidth / widthHeight;
    }
    bg.style.height = height + 'px';
    bg.style.width = width + 'px';


    container.style.width = width + 'px';
    container.style.height = height + 'px';
    this.iterateObjs(width, height);

  },

  iterateObjs(width, height) {
    const widthIndex = width / this.bgProps.width;
    const heightIndex = height / this.bgProps.height;
    for (let item in this.objectsProps) {
      this.setObjSizeAndPos(widthIndex, heightIndex, item);
    }
    let head = document.getElementById(this.person.id);
    head.style.width = (this.person.width * widthIndex) + 'px';
  },
  setObjSizeAndPos(widthIndex, heightIndex, item) {
    let obj = document.getElementById(item);
    obj.style.top = (this.objectsProps[item].top * heightIndex) + 'px';
    obj.style.left = (this.objectsProps[item].left * widthIndex) + 'px';
    obj.style.width = (this.objectsProps[item].width * widthIndex) + 'px';
    obj.style.height = (this.objectsProps[item].height * heightIndex) + 'px';
  },
};

window.addEventListener('load', () => {
  game.start();
});