import { baseURL } from "../data/api.js";
import { getToken } from "../utils/storages.js";

export function deleteButton(id) {
  const container = document.querySelector(".delete");

  container.innerHTML = `<button type="button" class="delete-btn btn">Delete</button>`;

  const button = document.querySelector("button.delete-btn");

  button.addEventListener("click", deleteProduct);

  async function deleteProduct() {
    const doDelete = confirm("Do you want to delete this?");

    if (doDelete) {
      const url = baseURL + "/products/" + id;
      const token = getToken();

      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(url, options);
        const json = await response.json();

        document.location.href = "/products.html";
      } catch (error) {
        console.log(error);
      }
    }
  }
}
