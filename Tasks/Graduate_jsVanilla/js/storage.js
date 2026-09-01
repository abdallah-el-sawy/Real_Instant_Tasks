// product functions
function getProducts() {
  return JSON.parse(localStorage.getItem("products")) || [];
}

function setProducts(productsContainer) {
  localStorage.setItem("products", JSON.stringify(favouritesContainer));
}

// fav functions
function getFavourites() {
  return JSON.parse(localStorage.getItem("favourites")) || [];
}

function setFavourites(favouritesContainer) {
  localStorage.setItem("favourites", JSON.stringify(favouritesContainer));
}

// cart functions
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function setCart(cartContainer) {
  localStorage.setItem("cart", JSON.stringify(cartContainer));
}

export {
  setProducts,
  setFavourites,
  setCart,
  getProducts,
  getFavourites,
  getCart,
};
