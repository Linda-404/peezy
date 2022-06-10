import { getUsername } from "../utils/storages.js";

export function renderProducts(productsToRender) {
  const productsContainer = document.querySelector(".products-container");
  const userName = getUsername();

  let reDirect = "";

  if (userName) {
    reDirect = "editProduct";
  } else {
    reDirect = "productdetails";
  }

  productsContainer.innerHTML = "";

  productsToRender.forEach(function (products) {
    let imageUrl = "";
    if (products.image) {
      imageUrl = products.image.url;
    } else if (products.image_url) {
      imageUrl = products.image_url;
    }

    productsContainer.innerHTML += `<div class="product-card">
                                            <a href="${reDirect}.html?id=${products.id}" class="productimg-container">
                                                <img src="${imageUrl}" class="product-img">
                                            </a>
                                            <div>
                                                <h3>${products.title}</h3>
                                                <h4>${products.description}</h4>
                                                <p>price: ${products.price}</p>
                                            </div>
                                            <a href="${reDirect}.html?id=${products.id}" class="btn">View more</a>
                                        </div>`;
  });
}
