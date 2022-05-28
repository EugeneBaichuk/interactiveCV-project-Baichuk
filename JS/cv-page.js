export default class CvPageStart {
  constructor(switchToStart) {
    this.switchToStart = switchToStart;
    this.startWrapper = document.getElementById('start-wrapper');
    this.start();
  }

  start() {
    this.startWrapper.innerHTML = `
    <section>
      <object class="cv" type="image/svg+xml" data="pages/cv-page/cv.svg"></object>
      <a id="cvBtn" href="#" class="button button__type_cv"> Return </a> 
    </section>
    `;
    this.addEventHandler();
  }
  addEventHandler() {
    return document.getElementById('cvBtn').addEventListener('click', (e) => {
      e.preventDefault();
      this.switchToStart();
    });
  }
}