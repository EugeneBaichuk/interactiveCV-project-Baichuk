'use strict'; {
  game = {
    person: {
      width: 200,
      id: 'head',
    },
    interactiveObjs: {
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
    bg: {
      width: 808,
      height: 889
    },
    text: {
      helloText: 'Hello. My name is <span class="person__span">Sherlock</span>, and I\'m going to find information about the best Junior Frontend Developer. <br><br> Could you help me? <br><br> Let\'s try to look at the objects in the room.',
      hobbyText: 'Do you agree that it\'s important to maintain work-life balance? <br><br>I think he has a lot of hobbies and rather interesting life.',
      photoText: 'Ohh, what a handsome man!',
      pcText: 'I consider, this is one of his projects. We can have a break and play a game for a minute. <br><br>Did you notice this cool yellow duckling?',
      'hard-shelfText': 'Bingo!<br><br>We have found essential information about this Junior\'s hard skills.<br><br>It\'s interesting...',
      certificateText: 'Let\'s see. He finished "IT&#8209;academy" courses in Grodno. <br><br> In my opinion, these courses are some of the best in Belarus. Their graduates have good enough skills to become Junior Developers.',
      'learn-shelfText': 'This is his diploma.<br><br>Let\'s see if he has a higher education.<br><br>Yes, he has!',
      coffeeText: 'Oops...',
      booksText: 'These are B2 level English books.<br><br>I guessed this guy knew English.',
      workbookText: 'His employment record book... <br><br> He works as a marketing specialist at JSC "Grodno Azot". <br><br> I think this background also may be usefull.',
      mobileText: 'We have found some of his contact details and usefull links.<br><br> His name is Eugene. Hi, Eugene!',
    },
    start() {
      this.started = true;
      this.init();
      this.resize();
      this.changeText();
    },
    init() {
      this.initContainer(startWrapper);
      this.initText();
    },
    initContainer(container) {
      container = document.getElementById('start-wrapper');
      container.innerHTML = `
    <div class='main-container' id='container'>
    <section id="roomContainer" class="room">
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
      <img id ="head" class="person__img" src="pages/main-page/img/head.svg" alt="">
    </section>
    </div>
    `;
    },
    initText() {
      const text = document.createElement('div');
      const head = document.getElementById('head');
      text.classList.add('person__text');
      text.id = 'text';
      text.innerHTML = this.text.helloText;
      document.querySelector('.person').insertBefore(text, head);
    },
    resize() {
      const room = document.getElementById('room');
      const roomContainer = document.getElementById('roomContainer');
      const bgObj = document.getElementById('bg');
      let width = this.bg.width;
      let height = this.bg.height;
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
        this.setObjSizeAndPos(widthIndex, heightIndex, item);
      }
      let head = document.getElementById(this.person.id);
      head.style.width = `${this.person.width * widthIndex}px`;
    },
    setObjSizeAndPos(widthIndex, heightIndex, item) {
      let obj = document.getElementById(item);
      obj.style.top = (this.interactiveObjs[item].top * heightIndex) + 'px';
      obj.style.left = (this.interactiveObjs[item].left * widthIndex) + 'px';
      obj.style.width = (this.interactiveObjs[item].width * widthIndex) + 'px';
      obj.style.height = (this.interactiveObjs[item].height * heightIndex) + 'px';
    },
    changeText() {
      const roomContainer = document.getElementById('roomContainer');
      const text = document.getElementById('text');
      const Objs = Object.keys(this.interactiveObjs);
      roomContainer.addEventListener('click', (e) => {
        Objs.forEach(item => {
          if (e.target.id === item) {
            text.innerHTML = this.text[`${item}Text`];
          }
        });
      });
    }
  };

  // window.addEventListener('DOMContentLoaded', () => {
  game.start();
  // // });
  window.addEventListener('resize', () => {
    game.resize();
  });
}