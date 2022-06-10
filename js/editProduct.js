import { baseURL } from "./data/api.js";
import createMenu from "./components/loggedinMenu.js";
import { getToken } from "./utils/storages.js";
import displayMessage from "./components/displayMessage.js";
import { deleteButton } from "./components/deleteButton.js";

const token = getToken();

if (!token) {
  document.location.href = "/";
}

createMenu();

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

if (!id) {
  document.location.href = "/";
}

const productURL = baseURL + "/products/" + id;

const form = document.querySelector("#editProduct-Form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const featuredCheckbox = document.querySelector("#featuredCheckbox");
const image = document.querySelector("#image-url");
const idInput = document.querySelector("#id");
const message = document.querySelector(".add-message");

(async function () {
  try {
    const response = await fetch(productURL);
    const details = await response.json();

    title.value = details.title;
    price.value = details.price;
    description.value = details.description;
    idInput.value = details.id;
    featuredCheckbox.checked = details.featured;

    deleteButton(details.id);
  } catch (error) {
    console.log(error);
  } finally {
    form.style.display = "block";
  }
})();

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  message.innerHTML = "";

  const titleValue = title.value.trim();
  const priceValue = parseFloat(price.value);
  const descriptionValue = description.value.trim();
  const featured = featuredCheckbox.checked;
  const imageValue = image.value.trim();
  const idValue = idInput.value;

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

  updateProduct(
    titleValue,
    priceValue,
    descriptionValue,
    imageValue,
    idValue,
    featured
  );
}

async function updateProduct(title, price, description, image, id, featured) {
  const url = baseURL + "/products/" + id;

  const data = JSON.stringify({
    title: title,
    price: price,
    description: description,
    image_url: image,
    featured: featured,
  });

  const options = {
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.updated_at) {
      displayMessage("success", "Product updated", ".add-message");
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
