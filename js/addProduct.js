import displayMessage from "./components/displayMessage.js";
import createMenu from "./components/loggedinMenu.js";
import { getToken } from "./utils/storages.js";
import { baseURL } from "./data/api.js";

const token = getToken();

if (!token) {
  document.location.href = "/";
}

createMenu();

const form = document.querySelector("#addProduct-Form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const featuredCheckbox = document.querySelector("#featuredCheckbox");
const image = document.querySelector("#image-url");
const message = document.querySelector(".add-message");

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  message.innerHTML = "";

  const titleValue = title.value.trim();
  const priceValue = parseFloat(price.value);
  const descriptionValue = description.value.trim();
  const featured = featuredCheckbox.checked;
  const imageValue = image.value.trim();

  if (
    titleValue.length === 0 ||
    isNaN(priceValue) ||
    descriptionValue.length === 0
  ) {
    return displayMessage(
      "warning",
      "Please supply proper values",
      ".add-message"
    );
  }

  addProduct(titleValue, priceValue, descriptionValue, imageValue, featured);
}

async function addProduct(title, price, description, image, featured) {
  const url = baseURL + "/products";

  const data = JSON.stringify({
    title: title,
    price: price,
    description: description,
    image_url: image,
    featured: featured,
  });

  const token = getToken();

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.created_at) {
      displayMessage("success", "Product created", ".add-message");
      form.reset();
    }

    if (json.error) {
      displayMessage("error", json.message, ".add-message");
    }
  } catch (error) {
    console.log(error);
    displayMessage("error", "An error occured", ".add-message");
  }
}
