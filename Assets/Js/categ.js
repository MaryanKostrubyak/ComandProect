const categories = document.querySelectorAll('.category');
const sliderItems = document.querySelectorAll('.shop__item');
const categoriesContainer = document.querySelector('.categories');

let currentCategory = '';

categories.forEach((category) => {
  category.addEventListener('click', (e) => {
    const categoryValue = e.target.dataset.category;
    currentCategory = categoryValue;
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const jsonData = JSON.parse(xhr.responseText);
        const categoryData = jsonData.find(item => item.category === categoryValue);
        if (categoryData) {
          const data = categoryData.data;
          data.forEach((item, index) => {
            const shopItem = sliderItems[index]; 
            const img = shopItem.querySelector('.shop__photo');
            const name = shopItem.querySelector('.shop__text:nth-child(2)');
            const price = shopItem.querySelector('.shop__text:nth-child(3)');
            const button = shopItem.querySelector('.shop__button');

            img.src = item.image;
            img.alt = item.name;
            name.textContent = item.name;
            price.textContent = `${item.price.toFixed(2)} грн`;
          });
          for (let i = data.length; i < sliderItems.length; i++) {
            const shopItem = sliderItems[i];
            shopItem.innerHTML = ''; 
          }
        } 
      }
    };
    xhr.open('GET', 'Json/food.json', true);
    xhr.send();
  });
});