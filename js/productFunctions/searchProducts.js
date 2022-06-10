import { renderProducts } from "./renderProducts.js";

export function filterProducts(products) {
  const filter = document.querySelector(".filter");

  filter.onkeyup = function (event) {
    const filterValue = event.target.value.trim().toLowerCase();

    const filteredProducts = products.filter(function (products) {
      if (
        products.title.toLowerCase().includes(filterValue) ||
        products.description.toLowerCase().includes(filterValue)
      ) {
        return true;
      }
    });

    renderProducts(filteredProducts);
  };
}
