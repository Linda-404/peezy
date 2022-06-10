import { saveToken, saveUser } from "../utils/storages.js";
import { baseURL } from "../data/api.js";
import displayMessage from "./displayMessage.js";

const form = document.querySelector("#login-Form");
const userEmail = document.querySelector("#email");
const password = document.querySelector("#password");
const message = document.querySelector(".message-container");

form.addEventListener("submit", submitForm);

export function submitForm(event) {
  event.preventDefault();

  message.innerHTML = "";

  const userValue = userEmail.value.trim();
  const passwordValue = password.value.trim();

  if (userValue.length === 0 || passwordValue.length === 0) {
    return displayMessage("warning", "Invalid values", ".message-container");
  }

  doLogin(userValue, passwordValue);
}

async function doLogin(userEmail, password) {
  const url = baseURL + "/auth/local";

  const data = JSON.stringify({ identifier: userEmail, password: password });

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.user) {
      displayMessage("success", "Successfully logged in", ".message-container");
      saveToken(json.jwt);
      saveUser(json.user);

      location.href = "/";
    }

    if (json.error) {
      displayMessage("warning", "Invalid login details", ".message-container");
    }
  } catch (error) {
    console.log(error);
  }
}
