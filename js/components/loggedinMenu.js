import { getUsername } from "../utils/storages.js";
import logOutButton from "./logoutButton.js";

export default function createMenu() {
  const { pathname } = document.location;

  const menuContainer = document.querySelector(".loggedin-menu");

  const username = getUsername();

  let authLink = `<div class="nav-link">Login</div>`;

  if (username) {
    authLink = `<a href="addProduct.html" class="${
      pathname === "/addproduct.html" ? "active" : ""
    } nav-link">Add Product</a>
                    <div id="logout" class="nav-link">Log out</div>`;
  }

  menuContainer.innerHTML = `<div class="menu">
                                ${authLink}
                            </div>`;

  logOutButton();
}
