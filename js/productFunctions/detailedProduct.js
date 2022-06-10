import { getBasketProducts, handleClick } from "./basketProductsFunctions.js";

export function detailedProduct(details) {
  const detailContainer = document.querySelector(".detail-container");
  const basketProducts = getBasketProducts();

  detailContainer.innerHTML = "";

  const addedProduct = basketProducts.find(function (productAdded) {
    return parseInt(productAdded.id) === details.id;
  });

  let cssClass = "full";

  if (addedProduct) {
    cssClass = "added";
  }

  let imageUrl = "";

  if (details.image) {
    imageUrl = details.image.url;
  } else if (details.image_url) {
    imageUrl = details.image_url;
  }

  detailContainer.innerHTML += `<div>
                                        <img src="${imageUrl}" class="detail-img">
                                    </div>
                                    <div class="detail-content">
                                        <div class="padding">
                                            <h1>${details.title}</h1>
                                            <h3>Price: ${details.price}</h3>
                                        </div>
                                        <div class="padding">
                                            <h4>Sizes:</h4>
                                            <div>
                                                <button class="btn-small">EU 37</button>
                                                <button class="btn-small">EU 38</button>
                                                <button class="btn-small">EU 39</button>
                                                <button class="btn-small">EU 40</button>
                                                <button class="btn-small">EU 42</button>
                                                <button class="btn-small">EU 43</button>
                                            </div>
                                        </div>
                                        <div class="padding">
                                            <div>
                                                <button class="${cssClass} btn add-btn" data-id="${details.id}" data-img="${imageUrl}" data-title="${details.title}" data-price="${details.price}">Add to basket</button>
                                            </div>
                                        </div>
                                        <div class="padding">
                                            <h4>Product details:</h4>
                                            <p>${details.description}</p>
                                        </div>
                                    </div>`;

  const addButton = document.querySelector(".add-btn");

  addButton.addEventListener("click", handleClick);
}
