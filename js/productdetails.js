import { detailedProduct } from "./productFunctions/detailedProduct.js";
import { baseURL } from "./data/api.js";
import displayMessage from "./components/displayMessage.js";
import createMenu from "./components/loggedinMenu.js";

createMenu();

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

if (!id) {
  document.location.href = "/";
}

const productURL = baseURL + "/products/" + id;

async function getProduct() {
  try {
    const response = await fetch(productURL);
    const details = await response.json();

    document.title = details.title;

    detailedProduct(details);
  } catch (error) {
    console.log(error);
    displayMessage("error", "An error occured", ".detail-container");
  }
}

getProduct();
