export default class Game {
  constructor(switchToCV, images, personImgs, startPersonImg) {
    this.switchToCV = switchToCV;
    this.personImgs = personImgs;
    this.startPersonImg = startPersonImg;
    this.images = images;
    this.pageObjs = {
      startWrapper: null,
      roomContainer: null,
      popUpContainer: null,
      containerObj: null,
      text: null,
      objs: null,
    };
    this.person = {
      width: 250,
      id: 'head',
    };
    this.player = null;
    this.interactiveObjs = null;

    this.bg = {
      width: 808,
      height: 889
    };

    this.text = {
      helloText: 'Hello. My name is <span class="person__span">Sherlock</span>, and I\'m going to help you to find the best Junior Frontend Developer. <br><br> Please, move your character with the arrows or just click on the objects. <br><br> Let\'s try to look around in the room to find some usefull information.',
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
    };
    this.popupClosed = true;
    this.pcScreenActive = false;
    this.audio = {
      click: new Audio('sounds/click.mp3'),
      guitar: new Audio('sounds/guitar.mp3'),
      coffee: new Audio('sounds/coffee.wav'),
    };
    this.start();
  }
  start() {
    this.initGame();
    this.initInteractiveObjs();
    this.initPlayer(this);
    this.initPageContainers();
    this.resize('bg', this.bg);
    this.addResizeEvent();
    this.changeTextAndPopupsEvent();
    this.closePopupByPlayer(this);
    this.player.startPlayer();
  }
  initGame() {
    this.pageObjs.startWrapper = document.getElementById('start-wrapper');
    this.pageObjs.startWrapper.innerHTML = `
      <div class='main-container' id='container'>
        <section id="roomContainer" class="room">
          <div id="room" class="room__position">
            <div id="view">
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
    
    this.images.forEach((img, i) => {
      let imgsContainer = document.getElementById("view");
      if (this.images[i].id !== "bg" && this.images[i].id !== "front-shelf"  && this.images[i].id !== "coffee") {
        this.images[i].classList.add("room__img_type_active");
      }
      if (this.images[i].id === "coffee") {
        this.images[i].style.opacity = 100;
        this.images[i].style.cursor = "pointer";
      }
      imgsContainer.appendChild(this.images[i]);
    });
    
  }
  initPageContainers() {
    this.pageObjs.roomContainer = document.getElementById('roomContainer');
    this.pageObjs.popUpContainer = document.getElementById('popUpContainer');
    this.pageObjs.popUp = document.getElementById('popUp');
    this.pageObjs.text = document.getElementById('text');
    this.containerObj = document.getElementById('room');
    this.pageObjs.objs = Object.keys(this.interactiveObjs);
  }
  initInteractiveObjs() {
    this.interactiveObjs = {
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
    };
  }
  initPlayer(self) {
    this.player = {
      audio: true,
      active: true,
      playerImgs: this.personImgs,
      startPlayerImg: this.startPersonImg,
      src: ['bot-right', 'bot-left', 'top-right', 'top-left'],
      heightIndex: null,
      widthIndex: null,
      playerObj: null,
      width: 100,
      height: 200,
      top: 500,
      left: 250,
      speedX: 0,
      speedY: 0,
      req: null,
      disabled: true,
      startPlayer() {
        this.createPlayer();
        this.movePlayer();
      },
      createPlayer() {
        this.containerObj = document.getElementById('room');
        this.playerObj = this.startPlayerImg[0];
        this.containerObj.appendChild(this.playerObj);
        
        console.log();
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
                this.playerObj.src = this.playerImgs[1].src;
                break;
              case 38:
                this.playerObj.src = this.playerImgs[2].src;
                break;
              case 39:
                this.playerObj.src = this.playerImgs[3].src;
                break;
              case 40:
                this.playerObj.src = this.playerImgs[0].src;
                console.log(this.playerImgs[0].src);
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
        player.style.top = `${this.top * this.heightIndex}px`;
        player.style.left = `${this.left * this.heightIndex}px`;
        player.style.width = `${this.width * this.widthIndex}px`;
        player.style.height = `${this.height * this.heightIndex}px`;
        this.changeTextAndPopupsbyPlayer(self);

        this.animation = requestAnimationFrame(() => {
          this.updateView(this.playerObj);
        });
      },
      changeSpeed(speedX, speedY) {
        this.speedX = speedX;
        this.speedY = speedY;
      },
      changeTextAndPopupsbyPlayer(self) {
        self.pageObjs.objs.forEach(item => {
          const itemObj = document.getElementById(item);
          this.changeTop(item, itemObj, 'hobby', 0.09 * this.widthIndex, 0.9 * this.heightIndex, self);
          this.changeTop(item, itemObj, 'photo', 0.43 * this.widthIndex, 0.6 * this.heightIndex, self);
          this.changeTop(item, itemObj, 'pc', 0.72 * this.widthIndex, 0.91 * this.heightIndex, self);
          this.changeTop(item, itemObj, 'hard-shelf', 1.1 * this.widthIndex, 0.56 * this.heightIndex, self);
          this.changeRight(item, itemObj, 'coffee', 1.2 * this.widthIndex, 1.05 * this.heightIndex, self);
          this.changeRight(item, itemObj, 'certificate', 1.3 * this.widthIndex, 0.55 * this.heightIndex, self);
          this.changeRight(item, itemObj, 'learn-shelf', 1 * this.widthIndex, 0.75 * this.heightIndex, self);
          this.changeRight(item, itemObj, 'books', 1.1 * this.widthIndex, 0.5 * this.heightIndex, self);
          this.changeBot(item, itemObj, 'workbook', 1.1 * this.widthIndex, 1.3 * this.heightIndex, self);
          this.changeBot(item, itemObj, 'mobile', 1.3 * this.widthIndex, 1.3 * this.heightIndex, self);
        });

      },
      changeTop(item, itemObj, itemName, leftNum, topNum, self) {
        if (item === itemName && !self.interactiveObjs[itemName].disabled && (itemObj.offsetTop >= this.top * topNum && itemObj.offsetLeft >= this.left * leftNum)) {
          this.popupChangeDisabled = false;
          itemObj.classList.add('room__img_type_js-active');
          addEventListener('keydown', (e) => {
            if (!this.popupChangeDisabled && e.code === 'Enter' && item === itemName && itemObj.offsetTop >= this.top * topNum && itemObj.offsetLeft >= this.left * leftNum && this.active) {
              self.changeTextAndPopups(item);
            }
          });
        }
        if (item === itemName && (itemObj.offsetLeft < this.left * leftNum || itemObj.offsetTop < this.top * topNum)) {
          itemObj.classList.remove('room__img_type_js-active');
        }
      },
      changeRight(item, itemObj, itemName, leftNum, topNum, self) {
        if (item === itemName && (itemObj.offsetTop >= this.top * topNum && itemObj.offsetLeft <= this.left * leftNum) && !self.interactiveObjs[itemName].disabled) {
          this.popupChangeDisabled = false;
          itemObj.classList.add('room__img_type_js-active');

          addEventListener('keydown', (e) => {
            if (!this.popupChangeDisabled && e.code === 'Enter' && item === itemName && itemObj.offsetTop >= this.top * topNum && itemObj.offsetLeft <= this.left * leftNum) {
              self.changeTextAndPopups(item);
            }
          });
        }
        if (item === itemName && (itemObj.offsetLeft > this.left * leftNum || itemObj.offsetTop < this.top * topNum)) {
          itemObj.classList.remove('room__img_type_js-active');
        }
      },
      changeBot(item, itemObj, itemName, leftNum, topNum, self) {
        if (item === itemName && !self.interactiveObjs[itemName].disabled && itemObj.offsetTop <= this.top * topNum && itemObj.offsetLeft <= this.left * leftNum) {
          this.popupChangeDisabled = false;
          itemObj.classList.add('room__img_type_js-active');
          addEventListener('keydown', (e) => {
            if (!this.popupChangeDisabled && e.code === 'Enter' && item === itemName && itemObj.offsetTop <= this.top * topNum && itemObj.offsetLeft <= this.left * leftNum) {
              self.changeTextAndPopups(item);
            }
          });
        }
        if (item === itemName && !self.interactiveObjs[itemName].disabled && (itemObj.offsetLeft > this.left * leftNum || itemObj.offsetTop > this.top * topNum)) {
          itemObj.classList.remove('room__img_type_js-active');
        }
      },
    };
  }
  addResizeEvent() {
    window.addEventListener('resize', () => {
      if (document.getElementById('popUp')) {
        this.resize('popUp', this.bg);
      }
      if (document.getElementById('bg')) {
        this.resize('bg', this.bg);
      }
    });
  }
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
  }
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
  }
  setObjSizeAndPos(widthIndex, heightIndex, item) {
    let obj = document.getElementById(item);
    if (obj) {
      obj.style.top = `${this.interactiveObjs[item].top * heightIndex}px`;
      obj.style.left = `${this.interactiveObjs[item].left * widthIndex}px`;
      obj.style.width = `${this.interactiveObjs[item].width * widthIndex}px`;
      obj.style.height = `${this.interactiveObjs[item].height * heightIndex}px`;
    }
    this.player.heightIndex = heightIndex;
    this.player.widthIndex = widthIndex;
  }
  changeTextAndPopupsEvent() {
    this.pageObjs.roomContainer.addEventListener('click', (e) => {
      this.pageObjs.objs.forEach(item => {
        if (e.target.id === item) {
          this.changeTextAndPopups(item);
        }
      });
    });
  }
  changeTextAndPopups(item) {
    if (!this.interactiveObjs[item].disabled) {
      this.pageObjs.text.innerHTML = this.text[`${item}Text`];
    }
    if ((item === 'closeBtn' || item === 'popupBg')) {
      this.interactiveObjs.closeBtn.counter += 1;
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
      if (item !== 'certificate' && item !== 'pc' && item !== 'photo') {
        this.pageObjs.popUpContainer.innerHTML = `
        <img id="closeBtn" class="room__close-btn" src="pages/main-page/img/pop-ups/close-btn.svg" alt="pc-popUp">
        <img id="popUp" class="room__bg-img room__popup" src="pages/main-page/img/pop-ups/${item}-popup.svg" alt="pc-popUp">
        `;
      } else if (item === 'certificate' || item === 'photo') {
        this.pageObjs.popUpContainer.innerHTML = `
          <img id="closeBtn" class="room__close-btn" src="pages/main-page/img/pop-ups/close-btn.svg" alt="pc-popUp">
          <img id="popUp" class="room__bg-img room__popup" src="pages/main-page/img/pop-ups/${item}-popup.png" alt="${item}-popUp">
          `;
      } else if (item === 'pc') {
        this.pageObjs.popUpContainer.innerHTML = `
          <img id="closeBtn" class="room__close-btn" src="pages/main-page/img/pop-ups/close-btn.svg" alt="pc-popUp">
          <object data="pages/main-page/img/pop-ups/pc-popup.svg" type="image/svg+xml" id="popUp" class="room__bg-img room__popup pcPopup"></object>
          `;
        setTimeout(() => {
          this.activatePC();
        }, 1000);
      }

      document.getElementById(item).classList.remove('room__img_type_active');
      const popUp = document.getElementById('popUp');
      const popUpBg = document.createElement('div');
      //здесь использовал promise вместо setTimeout 0
      const promise = new Promise((resolve, reject) => {
        popUpBg.classList.add('room__bg');
        popUpBg.id = 'popupBg';
        this.pageObjs.roomContainer.appendChild(popUpBg);
        resolve('Done');
      });
      promise.then(() => {
        popUp.style.transform = 'translateX(0)';
        popUp.style.zIndex = '50';
        popUpBg.style.background = 'rgba(0,46,136,0.5)';
      });
      this.resize('popUp', this.bg);
    } else if (item === 'coffee' && !this.interactiveObjs[item].disabled) {
      this.audio.coffee.play();
      this.interactiveObjs[item].disabled = true;
      const view = document.getElementById('view');
      document.getElementById(item).style.opacity = 0;
      document.getElementById(item).style.cursor = "auto";
      let coffeeWrap = document.createElement('div');
      coffeeWrap.innerHTML = '<img id="spilledCoffee" class="room__spilledCoffee" src="pages/main-page/img/spilled-coffee.svg" alt="spilled-coffee">';
      view.appendChild(coffeeWrap);
      this.resize('spilledCoffee', this.bg);
      document.getElementById('spilledCoffee').style.opacity = 1;
    }
  }
  activatePC() {
    const svgObject = document.querySelector('.pcPopup').contentDocument;
    const PuzzleBtn = svgObject.getElementById('pcActive');
    const PuzzleBtnText = svgObject.getElementById('textActive');
    const puzzleInnerHtml = `
        <div class="final">
          <div class="pcScreen">
            <p class="pcScreen__winner">Puzzle Completed</p>
            <img class="pcScreen__img" src="pages/main-page/img/puzzle/part1.png">
            <img class="pcScreen__img" src="pages/main-page/img/puzzle/part2.png">
            <img class="pcScreen__img" src="pages/main-page/img/puzzle/part3.png">
            <img class="pcScreen__img" src="pages/main-page/img/puzzle/part4.png">
            <img class="pcScreen__img" src="pages/main-page/img/puzzle/part5.png">
            <img class="pcScreen__img" src="pages/main-page/img/puzzle/part6.png">
            <img class="pcScreen__img" src="pages/main-page/img/puzzle/part7.png">
            <img class="pcScreen__img" src="pages/main-page/img/puzzle/part8.png">
            <img class="pcScreen__img" src="pages/main-page/img/puzzle/part9.png">
            <div class="pcScreen__inner"></div>
            <img id="closeBtn" class="room__close-btn pc-close-btn" src="pages/main-page/img/pop-ups/close-btn.svg" alt="pc-popUp">
          </div> 
        </div>
        `;
    this.addSvgListener(PuzzleBtn, PuzzleBtn, puzzleInnerHtml, this.pcPopupPuzzleMinigameStart, '.pcScreen');
    this.addSvgListener(PuzzleBtnText, PuzzleBtn, puzzleInnerHtml, this.pcPopupPuzzleMinigameStart, '.pcScreen');
  }
  addSvgListener(elem, rect, innerHTML, gameStart, selector) {
    elem.addEventListener('click', () => {
      if (!this.pcScreenActive) {
        rect.setAttribute("fill", "#EDEDED");
        setTimeout(() => {
          const final = document.createElement('div');
          final.innerHTML = innerHTML;
          rect.setAttribute("fill", "white");
          document.getElementById('start-wrapper').appendChild(final);
          gameStart();
          setTimeout(() => {
            document.querySelector(selector).style.opacity = 1;
          }, 0);
          this.pcPopupMinigameClose(final);
        }, 1000);
      }
    });
  }
  pcPopupPuzzleMinigameStart() {
    const container = document.querySelector('.pcScreen');
    container.style.position = 'relative';
    const imgs = document.querySelectorAll('.pcScreen__img');
    let counter = 0;
    const innerContainer = document.querySelector('.pcScreen__inner');
    let xInside, yInside;
    let img;
    container.addEventListener('mousedown', mouseDown, false);

    imgs.forEach((img) => {
      img.style.position = 'absolute';
      img.style.left = `${Math.floor(Math.random() * 320)}px`;
      img.style.top = `${Math.floor(Math.random() * 300)}px`;
    });

    function mouseDown(event) {
      img = event.target;
      if (img.tagName === 'IMG' && !img.disabled) {
        event.preventDefault();
        img.style.cursor = 'pointer';
        img.style.zIndex = 5; //картинка падает на самый нижний слой
        xInside = event.pageX - img.offsetLeft - this.offsetLeft; //координаты клика внутри img
        yInside = event.pageY - img.offsetTop - this.offsetTop;
        container.addEventListener('mousemove', mouseMove, false);
        container.addEventListener('mouseup', mouseUp, false);
      }
    }

    function mouseMove(event) {
      if (img.tagName === 'IMG') {
        event.preventDefault();
        // находим координаты клика внутри container и меняем положение img  
        const insideContainerX = event.pageX - this.offsetLeft - xInside;
        const insideContainerY = event.pageY - this.offsetTop - yInside;
        img.style.left = `${insideContainerX}px`;
        img.style.top = `${insideContainerY}px`;
        //огр. область перемещения картинок размером контейнера + меняем border у контейнера на красный
        addAlarm(insideContainerX, insideContainerY, this);
      }
    }

    function mouseUp(event) {
      event.preventDefault();
      img.style.cursor = 'default';
      img.style.zIndex = 1;
      container.removeEventListener('mousemove', mouseMove);
      container.removeEventListener('mouseup', mouseUp);
      const sides = {
        left: img.offsetLeft,
        right: img.offsetLeft + img.offsetWidth,
        top: img.offsetTop,
        bottom: img.offsetTop + img.offsetHeight,
        contLeft: innerContainer.offsetLeft,
        contRight: innerContainer.offsetLeft + innerContainer.offsetWidth,
        contTop: innerContainer.offsetTop,
        contBottom: innerContainer.offsetTop + innerContainer.offsetHeight,
      };
      const imgArr = Array.from(imgs);

      for (let key in imgArr) {
        if (imgArr[key] === img) {
          if (key < 3 && sides.left >= sides.contLeft + (+key * img.offsetWidth - 30) && sides.right <= sides.contLeft + ((+key + 1) * img.offsetWidth + 30) && sides.bottom <= sides.contBottom - 2 * img.offsetWidth + 30 && sides.top >= sides.contTop) {
            img.disabled = true;
            imgArr[key].style.top = `${sides.contTop + 2}px`;
            imgArr[key].style.left = `${sides.contLeft + key*img.offsetWidth + 1}px`;
            counter += 1;
          } else if (key < 6 && (sides.left >= sides.contLeft + (+key - 3) * img.offsetWidth - 30) && sides.right <= sides.contLeft + ((+key - 2) * img.offsetWidth + 30) && sides.bottom <= sides.contBottom - img.offsetWidth + 30 && sides.top >= sides.contTop + img.offsetWidth - 30) {
            img.disabled = true;
            imgArr[key].style.top = `${sides.contTop +img.offsetHeight+ 1}px`;
            imgArr[key].style.left = `${sides.contLeft + (key-3)*img.offsetWidth + 1}px`;
            counter += 1;
          } else if ((sides.left >= sides.contLeft + (+key - 6) * img.offsetWidth - 30) && sides.right <= sides.contLeft + ((+key - 5) * img.offsetWidth + 30) && sides.bottom <= sides.contBottom && sides.top >= sides.contTop + 2 * img.offsetWidth - 30) {
            img.disabled = true;
            imgArr[key].style.top = `${sides.contTop +img.offsetHeight*2}px`;
            imgArr[key].style.left = `${sides.contLeft + (key-6)*img.offsetWidth + 1}px`;
            counter += 1;
          }
          if (counter >= 9) {
            document.querySelector('.pcScreen__winner').classList.add('pcScreen__winner_type_active');
            setTimeout(() => {
              document.querySelector('.final').remove();
            }, 2000);
          }
        }
      }
    }

    function addAlarm(x, y, container) {
      makeLimits('clientHeight', y, 'top', container);
      makeLimits('clientWidth', x, 'left', container);
      if ((y > 0 && y < container.clientHeight - img.clientHeight) && (x > 0 && x < container.clientWidth - img.clientWidth)) {
        container.classList.remove('alarm');
      }
    }

    function makeLimits(limit, position, side, container) {
      const heightLimit = container[limit] - img[limit];
      if (position <= 0) {
        img.style[side] = 0 + 'px';
        container.classList.add('alarm');
      } else if (position >= heightLimit) {
        img.style[side] = `${heightLimit}px`;
        container.classList.add('alarm');
      }
    }

    container.addEventListener('mouseover', function () {
      if (this.classList.contains('end')) {
        this.classList.remove('end'); // для плавной анимации в обе стороны
      }
      this.classList.add('start');
    });

    container.addEventListener('mouseout', function () {
      this.classList.remove('start');
      this.classList.add('end');
    });
  }
  pcPopupMinigameClose(gameElem) {
    this.gameElem = gameElem;
    const closeBtn = document.querySelector('.pc-close-btn');
    const background = document.querySelector('.final');
    closeBtn.addEventListener('click', () => {
      this.gameElem.remove();
    });
  }
  closePopupByPlayer(self) {
    document.addEventListener('keydown', (e) => {
      if (!self.popupClosed && (e.code === "Enter" || e.code === "Escape")) {
        this.player.popupChangeDisabled = true;
        self.pageObjs.text.innerHTML = self.text.closeBtnText;
        self.interactiveObjs.closeBtn.counter += 1;
        self.closePopup();
        self.showFinal();
      }
    });
  }
  showFinal() {
    if (this.interactiveObjs.closeBtn.counter >= 9) {
      cancelAnimationFrame(this.player.animation);
      setTimeout(() => {
        const final = document.createElement('div');
        final.innerHTML = `
        <div class="final">
          <div class="final__popup">
            <p class="final__text"> Dear friend. Thank You for your interest to my project</p>
            <p class="final__text"> Now you know some more info about Me and I would be happy to
          continue communication with you personally.</p> <p class="final__text"> Please. Click the button below to see my full CV. </p>
            <a id="finalBtn" class="button button__type_final" href="#">Show full CV</a> 
          </div> 
        </div>
        `;
        document.getElementById('start-wrapper').appendChild(final);
        document.getElementById('finalBtn').addEventListener('click', (e) => {
          e.preventDefault();
          this.switchToCV();
        });
      }, 1000);
    }
  }
  closePopup() {
    this.popupClosed = true;
    this.player.active = true;
    const popUpBg = document.querySelector('.room__bg');
    const popUp = document.getElementById('popUp');
    popUp.style.transform = 'translateX(-200%)';
    popUpBg.style.background = 'rgba(0,46,136,0)';
    document.getElementById('closeBtn').style.display = 'none';

    setTimeout(() => {
      this.pageObjs.roomContainer.removeChild(popUpBg);
      this.pageObjs.popUpContainer.innerHTML = '';
    }, 800);
  }
  get animation() {
    return this.player.animation;
  }
}