import { clearStorage } from "../utils/storages.js";

export default function logOutButton() {
  const logOutButton = document.querySelector("#logout");

  if (logOutButton) {
    logOutButton.addEventListener("click", doLogOut);

    function doLogOut() {
      const logOut = confirm("Do you want to log out?");

      if (logOut) {
        clearStorage();
        document.location.href = "/";
      }
    }
  }
}
