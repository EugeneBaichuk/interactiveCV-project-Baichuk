export default class StartPageStart {
  constructor(container, switchToMain, switchToCV) {
    this.container = container;
    this.switchToMain = switchToMain;
    this.switchToCV = switchToCV;
    this.container = container;
    this.start(container);
  }
  start() {
    this.container.innerHTML = `
    <section class="start-page">
    <div class="start-page__item">
      <div class="start-page__text-block">
        <p class="start-page__text start-page__text_type_header"> Hello, dear Friend! </p> 
        <p class="start-page__text"> Here is my <span class="start-page__bold-text">interactive CV</span> in the form of a quest room.</p>
        <p class="start-page__text"> Interacting with the objects in the room, you can find information about me, my skills and collect all parts of my CV.</p> 
        <div class="start-page__text-pos">
          <p class="start-page__text start-page__text_pos_changed"> Your character is controlled with the <span class="start-page__italic-text">arrows on the keyboard</span> and with <span class="start-page__italic-text">the mouse.</span ></p> 
          <img src="pages/start-page/img/arrows.svg" alt="arrows" class="start-page__sprites start-page__sprites_type_arrows">
          <img src="pages/start-page/img/generic-mouse.svg" alt="mouse" class="start-page__sprites start-page__sprites_type_mouse"> 
        </div> 
        <div class="start-page__text-pos">
          <p class="start-page__text start-page__text_pos_changed"> To interact with objects <span class ="start-page__italic-text"> press: LMB or Enter. </span></p>
          <img src="pages/start-page/img/mouse-left-click.svg" alt = "mouse-left-click" class="start-page__sprites start-page__sprites_type_left-btn">
          <img src="pages/start-page/img/enter-key.svg" alt="enter-key" class="start-page__sprites start-page__sprites_type_enter">
        </div> 
      </div> 
      <a id="start-btn" class="button button__type_cv-page" href="#"> Start Quest</a> 
      <a id="skip-btn" class="button button__type_cv-page button__type_skip-btn" href="#"> Skip quest and show CV</a> 
      <img class="start-page__corner" src="pages/start-page/img/corner.svg" alt="corner">
    </div> 
    <img class="start-page__person" src="pages/start-page/img/start-head.svg" alt="head.img">
    </section>
    `;
    document.getElementById('start-btn').addEventListener('click', (e) => {
      e.preventDefault();
      this.switchToMain();
    });
    document.getElementById('skip-btn').addEventListener('click', (e) => {
      e.preventDefault();
      this.switchToCV();
    });
  }
}