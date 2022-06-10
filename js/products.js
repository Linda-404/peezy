import { baseURL } from "./data/api.js";
import { renderProducts } from "./productFunctions/renderProducts.js";
import { filterProducts } from "./productFunctions/searchProducts.js";
import displayMessage from "./components/displayMessage.js";
import createMenu from "./components/loggedinMenu.js";

const productsURL = baseURL + "/products";

createMenu();

async function getProducts() {
  try {
    const response = await fetch(productsURL);
    const products = await response.json();

    renderProducts(products);
    filterProducts(products);
  } catch (error) {
    console.log(error);
    displayMessage("error", "An error occured", ".products-container");
  }
}

getProducts();
