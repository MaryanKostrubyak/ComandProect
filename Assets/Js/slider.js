window.addEventListener("load", function() {
    const sliderContainer = document.querySelector('.slider-container');
    const prevArrow = document.querySelector('.arrow--prev');
    const nextArrow = document.querySelector('.arrow--next');
    const items = document.querySelectorAll('.shop__item');
    const itemCount = items.length;
    let currentItem = 0;
  
    function showItem(index) {
      items.forEach(item => {
        item.style.display = 'none';
      });
      items[index].style.display = 'block';
    }
  
    function nextItem() {
      currentItem = (currentItem + 1) % itemCount;
      showItem(currentItem);
    }
  
    function prevItem() {
      currentItem = (currentItem - 1 + itemCount) % itemCount;
      showItem(currentItem);
    }
  
    prevArrow.addEventListener('click', prevItem);
    nextArrow.addEventListener('click', nextItem);
  
    showItem(currentItem);
  });