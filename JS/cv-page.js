'use strict';

function cvPageStart(container) {
  container.innerHTML = `
    <section>
      <object class="cv" type="image/svg+xml" data="pages/cv-page/cv.svg"></object>
      <a id="cvBtn" href="#" class="button button__type_cv"> Return </a> 
    </section>
    `;

  setTimeout(() => {
    const svgObject = document.querySelector('.cv').contentDocument;
    const rect = svgObject.querySelector('.github');
    rect.addEventListener('click', () => {
      document.location.href = 'https://github.com/EugeneBaichuk';
    });
  }, 100);

  document.getElementById('cvBtn').addEventListener('click', (e) => {
    e.preventDefault();
    switchToStart();
  });



}