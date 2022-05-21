'use strict';
const game = {
  pageObjs: {
    roomContainer: null,
    popUpContainer: null,
    text: null,
    objs: null,
  },
  person: {
    width: 200,
    id: 'head',
  },
  player: {
    audio: true,
    active: true,
    src: ['bot-right', 'bot-left', 'top-right', 'top-left'],
    heightIndex: null,
    widthIndex: null,
    containerObj: null,
    playerObj: null,
    width: 100,
    height: 200,
    top: 500,
    left: 250,
    speedX: 0,
    speedY: 0,
    req: null,
    disabled: true,
    initPlayer() {
      this.createPlayer();
      this.movePlayer();
    },
    createPlayer() {
      this.containerObj = document.getElementById('room');
      this.playerObj = document.createElement('img');
      this.playerObj.src = `pages/main-page/img/player-${this.src[0]}.svg`;
      this.playerObj.classList.add('room__img');
      this.playerObj.id = 'player';
      this.containerObj.appendChild(this.playerObj);
    },
    movePlayer() {
      this.updateView(this.playerObj);
      this.addEventHandler('keydown', 37, -5, 3);
      this.cancelEventHandler('keyup', 37, 0, 0);
      this.addEventHandler('keydown', 39, 5, -3);
      this.cancelEventHandler('keyup', 39, 0, 0);
      this.addEventHandler('keydown', 38, -5, -3);
      this.cancelEventHandler('keyup', 38, 0, 0);
      this.addEventHandler('keydown', 40, 5, 3);
      this.cancelEventHandler('keyup', 40, 0, 0);
    },
    addEventHandler(key, keycode, speedX, speedY) {
      document.addEventListener(key, e => {
        if (e.keyCode === keycode) {
          //this.updateView(this.playerObj);
          this.changeSpeed(speedX, speedY);
          switch (e.keyCode) {
            case 37:
              this.playerObj.src = `pages/main-page/img/player-${this.src[1]}.svg`;
              break;
            case 38:
              this.playerObj.src = `pages/main-page/img/player-${this.src[2]}.svg`;
              break;
            case 39:
              this.playerObj.src = `pages/main-page/img/player-${this.src[3]}.svg`;
              break;
            case 40:
              this.playerObj.src = `pages/main-page/img/player-${this.src[0]}.svg`;
              break;
          }
        }
      });
    },
    cancelEventHandler(key, keycode, speedX, speedY) {
      document.addEventListener(key, e => {
        if (e.keyCode === keycode) {
          // cancelAnimationFrame(this.animation);
          this.changeSpeed(speedX, speedY);
        }
      });
    },
    createBorders() {
      const room = this.containerObj;
      const borderRight = (3 / 5 * this.left + 0.135 * room.offsetHeight / this.heightIndex);
      const borderLeft = (3 / 4.9 * this.left + 0.52 * room.offsetHeight / this.heightIndex);
      const borderTop = (-3 / 4.9 * this.left + 0.65 * room.offsetHeight / this.heightIndex);
      const borderBottom = (-3 / 4.9 * this.left + 0.95 * room.offsetHeight / this.heightIndex);
      this.createBorder((this.top <= borderRight), (borderRight - this.speedY), -this.speedX);
      this.createBorder((this.top > borderLeft), (borderLeft + this.speedY), -this.speedX);
      this.createBorder((this.top < borderTop), (borderTop + this.speedY), -this.speedX);
      this.createBorder((this.top > borderBottom), (borderBottom + this.speedY), -this.speedX);
      // cancelAnimationFrame(this.animation);
    },
    createBorder(condition, border, posY) {
      if (condition) {
        this.top = border;
        this.left += posY;
      }
    },
    updateView(player) {
      this.top += this.speedY;
      this.left += this.speedX;
      this.createBorders();
      player.style.top = (this.top * this.heightIndex) + 'px';
      player.style.left = (this.left * this.heightIndex) + 'px';
      player.style.width = (this.width * this.widthIndex) + 'px';
      player.style.height = (this.height * this.heightIndex) + 'px';
      this.changeTextAndPopupsbyPlayer();

      this.animation = requestAnimationFrame(() => {
        this.updateView(this.playerObj);
      });
    },
    changeSpeed(speedX, speedY) {
      this.speedX = speedX;
      this.speedY = speedY;
    },
    changeTextAndPopupsbyPlayer() {
      game.pageObjs.objs.forEach(item => {
        this.changeTop(item, 'hobby', 0.09 * this.widthIndex, 0.9 * this.heightIndex);
        this.changeTop(item, 'photo', 0.43 * this.widthIndex, 0.6 * this.heightIndex);
        this.changeTop(item, 'pc', 0.72 * this.widthIndex, 0.91 * this.heightIndex);
        this.changeTop(item, 'hard-shelf', 1.1 * this.widthIndex, 0.57 * this.heightIndex);
        this.changeRight(item, 'coffee', 1.2 * this.widthIndex, 1.05 * this.heightIndex);
        this.changeRight(item, 'certificate', 1.3 * this.widthIndex, 0.55 * this.heightIndex);
        this.changeRight(item, 'learn-shelf', 1 * this.widthIndex, 0.75 * this.heightIndex);
        this.changeRight(item, 'books', 1.1 * this.widthIndex, 0.5 * this.heightIndex);
        this.changeBot(item, 'workbook', 1.1 * this.widthIndex, 1.3 * this.heightIndex);
        this.changeBot(item, 'mobile', 1.3 * this.widthIndex, 1.3 * this.heightIndex);
      });

    },
    changeTop(item, itemName, leftNum, topNum) {
      if (item === itemName && !game.interactiveObjs[itemName].disabled && (document.getElementById(item).offsetTop >= this.top * topNum && document.getElementById(item).offsetLeft >= this.left * leftNum)) {
        this.popupChangeDisabled = false;
        const itemObj = document.getElementById(item);
        itemObj.classList.add('room__img_type_js-active');

        addEventListener('keydown', (e) => {
          if (!this.popupChangeDisabled && e.code === 'Enter' && item === itemName && document.getElementById(item).offsetTop >= this.top * topNum && document.getElementById(item).offsetLeft >= this.left * leftNum && this.active) {
            game.changeTextAndPopups(item);
          }
        });
      }
      if (item === itemName && (document.getElementById(item).offsetLeft < this.left * leftNum || document.getElementById(item).offsetTop < this.top * topNum)) {
        const itemObj = document.getElementById(item);
        itemObj.classList.remove('room__img_type_js-active');
      }
    },
    changeRight(item, itemName, leftNum, topNum) {
      if (item === itemName && (document.getElementById(item).offsetTop >= this.top * topNum && document.getElementById(item).offsetLeft <= this.left * leftNum) && !game.interactiveObjs[itemName].disabled) {
        this.popupChangeDisabled = false;
        const itemObj = document.getElementById(item);
        itemObj.classList.add('room__img_type_js-active');

        addEventListener('keydown', (e) => {
          if (!this.popupChangeDisabled && e.code === 'Enter' && item === itemName && document.getElementById(item).offsetTop >= this.top * topNum && document.getElementById(item).offsetLeft <= this.left * leftNum) {
            game.changeTextAndPopups(item);
          }
        });
      }
      if (item === itemName && (document.getElementById(item).offsetLeft > this.left * leftNum || document.getElementById(item).offsetTop < this.top * topNum)) {
        const itemObj = document.getElementById(item);
        itemObj.classList.remove('room__img_type_js-active');
      }
    },
    changeBot(item, itemName, leftNum, topNum) {
      if (item === itemName && !game.interactiveObjs[itemName].disabled && (document.getElementById(item).offsetTop <= this.top * topNum && document.getElementById(item).offsetLeft <= this.left * leftNum)) {
        this.popupChangeDisabled = false;
        const itemObj = document.getElementById(item);
        itemObj.classList.add('room__img_type_js-active');
        addEventListener('keydown', (e) => {
          if (!this.popupChangeDisabled && e.code === 'Enter' && item === itemName && document.getElementById(item).offsetTop <= this.top * topNum && document.getElementById(item).offsetLeft <= this.left * leftNum) {
            game.changeTextAndPopups(item);
          }
        });
      }

      if (item === itemName && !game.interactiveObjs[itemName].disabled && (document.getElementById(item).offsetLeft > this.left * leftNum || document.getElementById(item).offsetTop > this.top * topNum)) {
        const itemObj = document.getElementById(item);
        itemObj.classList.remove('room__img_type_js-active');
      }
    },
  },
  interactiveObjs: {
    'front-shelf': {
      width: 160,
      height: 160,
      top: 682,
      left: 450,
      disabled: true,
    },
    'hobby': {
      width: 203.78,
      height: 179.44,
      top: 482.31,
      left: 12.27,
      disabled: false,
    },
    'pc': {
      width: 75.92,
      height: 93.89,
      top: 383.24,
      left: 236.12,
      disabled: false,
    },
    'photo': {
      width: 66.7 * 1.5,
      height: 87.78 * 1.5,
      top: 285,
      left: 105,
      disabled: false,
    },
    'coffee': {
      width: 13.32,
      height: 17.15,
      top: 416.59,
      left: 481.74,
      disabled: false,
    },
    'hard-shelf': {
      width: 141.16,
      height: 112.42,
      top: 202.11,
      left: 427.33,
      disabled: false,
    },
    'learn-shelf': {
      width: 141.16,
      height: 86.58,
      top: 349.83,
      left: 530.77,
      disabled: false,

    },
    'certificate': {
      width: 62.85,
      height: 78.08,
      top: 230.71,
      left: 594.58,
      disabled: false,
    },
    'books': {
      width: 47.19,
      height: 41.94,
      top: 552.43,
      left: 630,
      disabled: false,
    },
    'mobile': {
      width: 26.37,
      height: 15,
      top: 740.77,
      left: 488.18,
      disabled: false,
    },
    'workbook': {
      width: 31.75 * 2,
      height: 31.75 * 2,
      top: 681,
      left: 527,
      disabled: false,
    },
    'closeBtn': {
      width: 63.5,
      height: 63.5,
      top: 80,
      left: 700,
      disabled: true,
      counter: 0,
    },
    'spilledCoffee': {
      width: 45.45 * 0.9,
      height: 34 * 0.9,
      top: 510,
      left: 450,
      disabled: true,
    },
    'popupBg': {
      disabled: true,
    }
  },
  bg: {
    width: 808,
    height: 889
  },
  text: {
    helloText: 'Hello. My name is <span class="person__span">Sherlock</span>, and I\'m going to help you to find the best Junior Frontend Developer. <br><br> Please, move your character with the arrows. <br><br> Let\'s try to look at the objects in the room to find some usefull information.',
    hobbyText: 'Do you agree that it\'s important to maintain work-life balance? <br><br>I think he has a lot of hobbies and rather interesting life.',
    photoText: 'Ohh, what a handsome man!',
    pcText: 'I consider, this is one of his projects. We can have a break and play a game for a minute. <br><br>Did you notice this cool yellow duckling?',
    'hard-shelfText': 'Bingo!<br><br>We have found essential information about this Junior\'s hard skills.<br><br>It\'s interesting...',
    certificateText: 'Let\'s see. He finished "IT&#8209;academy" courses in Grodno. <br><br> In my opinion, these courses are some of the best in Belarus. Their graduates have good enough skills to become Junior Developers.',
    'learn-shelfText': 'This is his diploma.<br><br>Let\'s see if he has a higher education.<br><br>Yes, he has!',
    coffeeText: 'He is crazy about coffee. <br><br>Oops...',
    booksText: 'These are B2 level English books.<br><br>I guessed this guy knew English.',
    workbookText: 'His employment record book... <br><br> He works as a marketing specialist at JSC "Grodno Azot". <br><br> I think this background also may be usefull.',
    mobileText: 'We have found some of his contact details and usefull links.<br><br> His name is Eugene. Hi, Eugene!',
    closeBtnText: 'Let\'s try to interact with other objects',
    popupBgText: 'Let\'s try to interact with other objects',
  },
  popupClosed: true,
  audio: {
    click: new Audio('sounds/click.mp3'),
    guitar: new Audio('sounds/guitar.mp3'),
    coffee: new Audio('sounds/coffee.wav'),
  },
  start() {
    this.init();
    this.resize('bg', this.bg);
    this.addResizeEvent();
    this.initPageContainers();
    this.changeTextAndPopupsEvent();
    this.closePopupByPlayer();
    this.player.initPlayer();
  },
  init() {
    const startWrapper = document.getElementById('start-wrapper');
    startWrapper.innerHTML = `
      <div class='main-container' id='container'>
        <section id="roomContainer" class="room">
          <div id="room" class="room__position">
            <div id="view">
              <img id="front-shelf" class = "room__img room__img_type_front" src="pages/main-page/img/front-shelf.svg" alt="">
              <img class="room__bg-img" id="bg" src="pages/main-page/img/room.svg" alt="room">
              <img id="books" class="room__img room__img_type_active" src="pages/main-page/img/books.svg" alt="">
              <img id="certificate" class="room__img room__img_type_active" src="pages/main-page/img/certificate.svg" alt="">
              <img id="coffee" class="room__img room__img_id_coffee room__img_type_active" src="pages/main-page/img/coffee.svg" alt="">
              <img id="hard-shelf" class="room__img room__img_type_active" src="pages/main-page/img/hard-shelf.svg" alt="">
              <img id="hobby" class="room__img room__img_type_active" src="pages/main-page/img/hobby.svg" alt="">
              <img id="learn-shelf" class="room__img room__img_type_active" src="pages/main-page/img/lern-shelf.svg" alt="">
              <img id="mobile" class="room__img room__img_type_active room__img_type_front" src="pages/main-page/img/mobile.svg" alt="">
              <img id="pc" class="room__img room__img_type_active" src="pages/main-page/img/pc.svg" alt="">
              <img id="photo" class="room__img room__img_type_active" src="pages/main-page/img/photo.svg" alt="">
              <img id="workbook" class="room__img room__img_type_active room__img_type_front" src="pages/main-page/img/workbook.svg" alt="">
            </div>
            <div id="popUpContainer"></div>   
          </div> 
        </section> 
        <section class="person">
          <div class="person__text" id="text"> ${this.text.helloText}</div>
          <img id ="head" class="person__img" src="pages/main-page/img/head.svg" alt="">
        </section>
      </div>
      `;
  },
  addResizeEvent() {
    window.addEventListener('resize', () => {
      if (document.getElementById('popUp')) {
        this.resize('popUp', this.bg);
      }
      if (document.getElementById('bg')) {
        this.resize('bg', this.bg);
      }
    });
  },
  resize(bgId, bg) {
    const room = document.getElementById('room');
    const roomContainer = document.getElementById('roomContainer');
    const bgObj = document.getElementById(bgId);
    let width = bg.width;
    let height = bg.height;
    const realWidth = roomContainer.offsetWidth;
    const realHeight = roomContainer.offsetHeight;
    const realWidthHeight = realWidth / realHeight;
    const widthHeight = width / height;
    if (realWidthHeight > widthHeight) {
      height = realHeight;
      width = realHeight * widthHeight;
    } else {
      width = realWidth;
      height = realWidth / widthHeight;
    }
    bgObj.style.height = `${height}px`;
    bgObj.style.width = `${width}px`;
    room.style.width = `${width}px`;
    room.style.height = `${height}px`;
    this.resizeObjs(width, height);
  },
  resizeObjs(width, height) {
    const widthIndex = width / this.bg.width;
    const heightIndex = height / this.bg.height;

    for (let item in this.interactiveObjs) {
      if (item !== 'player') {
        this.setObjSizeAndPos(widthIndex, heightIndex, item);
      }
    }
    let head = document.getElementById(this.person.id);
    head.style.width = `${this.person.width * widthIndex}px`;
  },
  setObjSizeAndPos(widthIndex, heightIndex, item) {
    let obj = document.getElementById(item);
    if (obj) {
      obj.style.top = (this.interactiveObjs[item].top * heightIndex) + 'px';
      obj.style.left = (this.interactiveObjs[item].left * widthIndex) + 'px';
      obj.style.width = (this.interactiveObjs[item].width * widthIndex) + 'px';
      obj.style.height = (this.interactiveObjs[item].height * heightIndex) + 'px';
    }
    this.player.heightIndex = heightIndex;
    this.player.widthIndex = widthIndex;
  },
  initPageContainers() {
    this.pageObjs.roomContainer = document.getElementById('roomContainer');
    this.pageObjs.popUpContainer = document.getElementById('popUpContainer');
    this.pageObjs.text = document.getElementById('text');
    this.pageObjs.objs = Object.keys(this.interactiveObjs);
  },
  changeTextAndPopupsEvent() {
    this.pageObjs.roomContainer.addEventListener('click', (e) => {
      this.pageObjs.objs.forEach(item => {
        if (e.target.id === item) {
          game.changeTextAndPopups(item);
        }
      });
      this.player.closePopup();
    });
  },
  changeTextAndPopups(item) {
    if (!this.interactiveObjs[item].disabled) {
      this.pageObjs.text.innerHTML = this.text[`${item}Text`];
    }
    if ((item === 'closeBtn' || item === 'popupBg')) {
      game.interactiveObjs.closeBtn.counter += 1;
      this.closePopup();
      this.pageObjs.text.innerHTML = this.text[`${item}Text`];
      this.showFinal(item);
    }
    if (item !== 'coffee' && !this.interactiveObjs[item].disabled && this.popupClosed) {
      if (item === 'hobby') {
        this.audio.guitar.play();
      } else {
        this.audio.click.play();
      }

      this.popupClosed = false;
      this.interactiveObjs[item].disabled = true;
      this.pageObjs.popUpContainer.innerHTML = `
              <img id="closeBtn" class="room__close-btn" src="pages/main-page/img/pop-ups/close-btn.svg" alt="pc-popUp">
              <img id="popUp" class="room__bg-img room__popup" src="pages/main-page/img/pop-ups/${item}-popup.svg" alt="pc-popUp">
              `;
      document.getElementById(item).classList.remove('room__img_type_active');
      const popUp = document.getElementById('popUp');
      const popUpBg = document.createElement('div');
      popUpBg.classList.add('room__bg');
      popUpBg.id = 'popupBg';
      this.pageObjs.roomContainer.appendChild(popUpBg);
      setTimeout(() => {
        popUp.style.transform = 'translateX(0)';
        popUp.style.zIndex = '50';
        popUpBg.style.background = 'rgba(0,46,136,0.5)';
      }, '0');
      this.resize('popUp', this.bg);

    } else if (item === 'coffee' && !this.interactiveObjs[item].disabled) {
      this.audio.coffee.play();
      this.interactiveObjs[item].disabled = true;
      const view = document.getElementById('view');
      document.getElementById(item).style.opacity = 0;
      let coffeeWrap = document.createElement('div');
      coffeeWrap.innerHTML = '<img id="spilledCoffee" class="room__spilledCoffee" src="pages/main-page/img/spilled-coffee.svg" alt="spilled-coffee">';
      view.appendChild(coffeeWrap);
      this.resize('spilledCoffee', this.bg);
      document.getElementById('spilledCoffee').style.opacity = 1;
    }
  },
  closePopupByPlayer() {
    document.addEventListener('keydown', (e) => {
      if (!game.popupClosed && (e.code === "Enter" || e.code === "Escape")) {
        this.popupChangeDisabled = true;
        game.pageObjs.text.innerHTML = game.text.closeBtnText;
        game.interactiveObjs.closeBtn.counter += 1;
        game.closePopup();
        game.showFinal();
      }
    });
  },
  showFinal() {
    if (this.interactiveObjs.closeBtn.counter >= 9) {
      setTimeout(() => {
        alert('Thank You. Now you know some more info about Me. I would be happy to continue communication with you personally');
      }, 1000);
    }
  },
  closePopup() {
    console.log(this.interactiveObjs.closeBtn.counter);
    this.popupClosed = true;
    this.player.active = true;
    const popUpBg = document.querySelector('.room__bg');
    const popUp = document.getElementById('popUp');
    popUp.style.transform = 'translateX(-200%)';
    popUpBg.style.background = 'rgba(0,46,136,0)';
    document.getElementById('closeBtn').style.display = 'none';

    setTimeout(() => {
      this.pageObjs.popUpContainer.innerHTML = '';
      this.pageObjs.roomContainer.removeChild(popUpBg);
    }, '1000');
  }
};