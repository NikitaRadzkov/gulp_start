
// Loading the page
window.onload = function () {
   const parallax = document.querySelector('_parallax');

   if (parallax) {
      const content = document.querySelector('.parallax__container');
      const firstImage = document.querySelector('.images-parallax__first');
      const secondImage = document.querySelector('.images-parallax__second');
      const thirdImage = document.querySelector('.images-parallax__third');

      // Сoefficient
      const forFirst = 40;
      const forSecond = 20;
      const forThird = 10;

      // Animation speed
      const speed = 0.05;

      // Declaring variables
      let positionX = 0, positionY = 0;
      let coordXprocent = 0, coordYprocent = 0;

      function setMouseParallaxStyle() {
         const distX = coordXprocent - positionX;
         const distY = coordYprocent - positionY;

         positionX = positionX + (distX * speed);
         positionY = positionY + (distY * speed);

         // Passing styles
         firstImage.style.cssText = `transform: translate(${positionX / forFirst}%, ${positionY / forFirst}%);`;
         secondImage.style.cssText = `transform: translate(${positionX / forSecond}%, ${positionY / forSecond}%);`;
         thirdImage.style.cssText = `transform: translate(${positionX / forThird}%, ${positionY / forThird}%);`;

         requestAnimationFrame(setMouseParallaxStyle);
      }
      setMouseParallaxStyle();

      parallax.addEventListener("mousemove", function (e) {

         // Getting the width and height of the block
         const parallaxWidth = parallax.offsetWidth;
         const parallaxHeight = parallax.offsetHeight;

         // Zero in the middle
         const coordX = e.pageX - parallaxWidth / 2;
         const coordY = e.pageY - parallaxHeight / 2;

         // Get percent
         coordXprocent = coordX / parallaxWidth * 100;
         coordYprocent = coordY / parallaxHeight * 100;
      });

      // Parallax when scrolling
      let thresholdSets = [];
      for (let i = 0; i <= 1.0; i += 0.005) {
         thresholdSets.push(i);
      }
      const callback = function (entries, observer) {
         const scrollTopProcent = window.pageYOffset / parallax.offsetHeight * 100;
         setMouseParallaxStyle(scrollTopProcent);
      };
      const observer = new IntersectionObserver(callback, {
         threshold: thresholdSets
      });

      observer.observe(document.querySelector('.content'));

      function setParallaxItemsStyle(scrollTopProcent) {
         content.style.cssText = `transform: translate(0%,-${scrollTopProcent / 9}%);`;
         secondImage.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent / 6}%);`;
         thirdImage.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent / 3}%);`;
      }
   }
}