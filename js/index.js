import { saveToken, saveUser } from "./utils/storages.js";
import { submitForm } from "./components/logInFunctions.js";
import { baseURL } from "./data/api.js";
import { getUsername } from "./utils/storages.js";
import displayMessage from "./components/displayMessage.js";
import createMenu from "./components/loggedinMenu.js";

const homeURL = baseURL + "/home";
const productURL = baseURL + "/products";
const userName = getUsername();

let reDirect = "";

if (userName) {
  reDirect = "editProduct";
} else {
  reDirect = "productdetails";
}

createMenu();

async function getHomeContent() {
  const banner = document.querySelector(".banner");

  try {
    const response = await fetch(homeURL);
    const json = await response.json();

    banner.style.backgroundImage = `url("${json.hero_banner.url}")`;
  } catch (error) {
    console.log(error);
  }
}

getHomeContent();

async function getProducts() {
  const productContainer = document.querySelector(".product-container");

  productContainer.innerHTML = "";

  try {
    const response = await fetch(productURL);
    const products = await response.json();

    for (let i = 0; i < products.length; i++) {
      if (products[i].featured) {
        let imageUrl = "";
        if (products[i].image) {
          imageUrl = products[i].image.url;
        } else if (products[i].image_url) {
          imageUrl = products[i].image_url;
        }

        productContainer.innerHTML += `<div class="product-card featured">
                                            <a href="${reDirect}.html?id=${products[i].id}" class="productimg-container"><img src="${imageUrl}" class="product-img"></a>
                                            <div>
                                                <h3>${products[i].title}</h3>
                                                <p>price: ${products[i].price}</p>
                                            </div>
                                            <a href="${reDirect}.html?id=${products[i].id}" class="btn">View more</a>
                                        </div>`;
      }
    }
  } catch (error) {
    console.log(error);
    displayMessage("error", "An error occured", ".product-container");
  }
}

getProducts();

submitForm();
