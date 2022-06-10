import {
  getBasketProducts,
  getBasketSum,
  handleCartRemoveClick,
} from "./productFunctions/basketProductsFunctions.js";
import createMenu from "./components/loggedinMenu.js";

createMenu();
function renderBasket() {
  const basketProducts = getBasketProducts();
  const basketSum = getBasketSum();

  

  const productContainer = document.querySelector(".product-container");
  const priceSummary = document.querySelector(".summary");

  priceSummary.innerHTML = basketSum;

  productContainer.innerHTML = "";

  if (basketProducts.length === 0) {
    productContainer.innerHTML = "Basket is empty";
  }

  

  basketProducts.forEach(function (product) {
    productContainer.innerHTML += `<div class="product-card">
                                             <a href="productdetails.html?id=${product.id}" class="productimg-container">
                                                 <img src="${product.image}" class="product-img">
                                             </a>
                                             <div>
                                                 <h3>${product.title}</h3>
                                                 <p>price: ${product.price}</p>
                                             </div>
                                             <button class="btn added" data-id="${product.id}">Remove</button>
                                         </div>`;
    
  });

  addEventListeners();

}

renderBasket();


function addEventListeners(){
    const removeButtons = document.querySelectorAll(".added");

    removeButtons.forEach((button) => {
        button.addEventListener("click", handleClick);
    });
}

function handleClick() {
    handleCartRemoveClick(this.dataset.id);
      renderBasket();
}