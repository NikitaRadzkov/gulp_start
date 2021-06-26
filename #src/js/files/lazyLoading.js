
const lazyImages = document.querySelectorAll('*[data-src], *[data-srcset]');
const loadMapBlock = document.querySelector('_load-map');
const windowHeight = document.documentElement.clientHeight
const loadMoreBlock = document.querySelector('_load-more');

let lazyImagesPositions = [];
if (lazyImages.lenght > 0) {
   lazyImages.forEach(img => {
      if (img.dataset.src || img.dataset.srcset) {
         lazyImagesPositions.push(img.getBoundingClientRect().top + pageYOffset);
         lazyScrollCheck();
      }
   });
}

window.addEventListener('scroll', lazyScroll);

function lazyScroll() {
   if (document.querySelectorAll('*[data-src], *[data-srcset]').length > 0) {
      lazyScrollCheck();
   }
   if (!loadMapBlock.classList.contains(`_loaded`)) {
      getMap();
   }
   if (!loadMoreBlock.classList.contains(`_loading`)) {
      loadMore();
   }
}

function lazyScrollCheck() {
   let imgIndex = lazyImagesPositions.findIndex(
      item => pageYOffset > item - windowHeight
   );
   if (imgIndex >= 0) {
      if (lazyImagesPositions[imgIndex].dataset.src) {
         lazyImages[imgIndex].src = lazyImages[imgIndex].dataset.src;
         lazyImages[imgIndex].removeAttribute('data-scr');
      } else if (lazyImagesPositions[imgIndex].dataset.src) {
         lazyImages[imgIndex].src = lazyImages[imgIndex].dataset.srcset;
         lazyImages[imgIndex].removeAttribute('data-scrset');
      }
      delete lazyImagesPositions[imgIndex];
   }
}

function getMap() {
   const loadMapBlockPos = loadMapBlock.getBoundingClientRect().top + pageYOffset;
   if (pageYOffset > loadMapBlockPos - windowHeight) {
      const loadMapUrl = loadMapBlock.dataset.map;
      if (loadMapUrl) {
         loadMapBlock.insertAdjacentHTML(
            'beforeend',
            `<iframe src="${loadMapUrl}" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`
         );
         loadMapBlock.classList.add(`_loaded`);
      }
   }
}

function loadMore() {
   const loadMoreBlockPos = loadMapBlock.getBoundingClientRect().top + pageYOffset;
   const loadMoreBlockHeight = loadMoreBlock.offsetHeight;

   if (pageYOffset > (loadMoreBlockPos + loadMoreBlockHeight) - windowHeight) {
      getContent();
   }
}

async function getContent() {
   if (!document.querySelector('._loading-icon')) {
      loadMoreBlock.insertAdjacentHTML(
         'beforeend',
         `<div class="_loading-icon"></div>`
      );
   }
   loadMoreBlock.classList.add('_loading');
   // loading address or HTML file
   let response = await fetch('_more.html', {
      method: 'GET',
   });
   if (response.ok) {
      let result = await response.text();
      loadMoreBlock.insertAdjacentHTML('beforeend', result);
      loadMoreBlock.classList.remove('_loading');
      if (document.querySelector('._loading-icon')) {
         document.querySelector('._loading-icon').remove();
      }
   } else {
      alert("Error");
   }
}

