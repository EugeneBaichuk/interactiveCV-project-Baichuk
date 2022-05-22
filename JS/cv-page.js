'use strict';

function cvPageStart(container) {
  container.innerHTML = `
    <section>
      <object class="cv" type="image/svg+xml" data="pages/cv-page/cv.svg"></object>
      <a id="cvBtn" href="#" class="button button__type_cv"> Return </a> 
    </section>
    `;
  document.getElementById('cvBtn').addEventListener('click', (e) => {
    e.preventDefault();
    switchToStart();
  });
}