export function getBasketProducts() {
  const basketProducts = localStorage.getItem("basketProducts");

  if (!basketProducts) {
    return [];
  } else {
    return JSON.parse(basketProducts);
  }
}

export function getBasketSum() {
  const basketProducts = JSON.parse(localStorage.getItem("basketProducts"));
  let sum = 0;

  basketProducts.forEach((product) => {
    sum += parseFloat(product.price);
  });
  return sum;
}

export function handleClick() {
  this.classList.toggle("full");
  this.classList.toggle("added");

  if (this.innerText === "Add to basket") {
    this.innerText = "Remove";
  } else {
    this.innerText = "Add to basket";
  }

  const id = this.dataset.id;
  const image = this.dataset.img;
  const title = this.dataset.title;
  const price = this.dataset.price;

  const currentBasketProducts = getBasketProducts();

  const productAdded = currentBasketProducts.find(function (product) {
    return product.id === id;
  });

  if (!productAdded) {
    const product = { id: id, image: image, title: title, price: price };

    currentBasketProducts.push(product);

    saveBasketProducts(currentBasketProducts);
  } else {
    const newBasketProducts = currentBasketProducts.filter(function (product) {
      return product.id !== id;
    });
    saveBasketProducts(newBasketProducts);
  }
}

export function handleCartRemoveClick(id) {
  const currentBasketProducts = getBasketProducts();

  const newBasketProducts = currentBasketProducts.filter(function (product) {
    return product.id !== id;
  });
  saveBasketProducts(newBasketProducts);
}

function saveBasketProducts(basketProducts) {
  localStorage.setItem("basketProducts", JSON.stringify(basketProducts));
}
