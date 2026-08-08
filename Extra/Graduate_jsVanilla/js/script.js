// Catch Elements
let errorr = document.getElementById("error");
let products = document.getElementById("products");
let searchInput = document.getElementById("searchInput");
let favourites = document.getElementById("favourites");
let searchError = document.getElementById("searchError");
let favCounter = document.getElementById("favCounter");
let cartCounter = document.getElementById("cartCounter");
let cartSection = document.getElementById("cartbody");
let links = document.querySelectorAll(".nav-link");
let cartFloatBtn = document.getElementById("cartFloatBtn");
let favFloatBtn = document.getElementById("favFloatBtn");
let year = document.getElementById("year");

// Dynamic Year Part
const currentYear = new Date();
year.innerHTML = currentYear.getFullYear();

// Modal Data
let exampleModalLabel = document.getElementById("exampleModalLabel");
let modalImage = document.getElementById("modalImage");
let modalTitle = document.getElementById("modalTitle");
let modalCategory = document.getElementById("modalCategory");
let modalPrice = document.getElementById("modalPrice");
let modalRating = document.getElementById("modalRating");
let modalWarranty = document.getElementById("modalWarranty");
let modalStock = document.getElementById("modalStock");

// local storage part
let productsContainer = JSON.parse(localStorage.getItem("products")) || [];
let favouritesContainer = JSON.parse(localStorage.getItem("favourites")) || [];
let cartContainer = JSON.parse(localStorage.getItem("cart")) || [];

// Call Funtions
getData();

// Floating Button
if (cartContainer.length > 0) {
  cartFloatBtn.classList.remove("d-none");
}

// Favourites Button
if (favouritesContainer.length > 0) {
  favFloatBtn.classList.remove("d-none");
}

//links Active  , deactive
links.forEach((link, index) => {
  link.addEventListener("click", () => {
    links.forEach((item) => {
      item.classList.remove("active");
    });
    link.classList.add("active");
  });
});

if (favouritesContainer) {
  displayFavourites();
  favCounter.innerText = favouritesContainer.length;
}

if (cartContainer) {
  displayCartProducts();
  cartCounter.innerText = cartContainer.length;
}

// Get data From Api
async function getData() {
  try {
    let response = await fetch(
      "https://dummyjson.com/products/category/groceries",
    );
    let objectData = await response.json();
    productsContainer = objectData.products;
    console.log(productsContainer);
    errorr.classList.remove("d-block");
    errorr.classList.add("d-none");
    localStorage.setItem("products", JSON.stringify(productsContainer));
    displayProducts();
  } catch (e) {
    console.log(e);
    errorr.classList.remove("d-none");
    errorr.classList.add("d-block");
  }
}

// display Products
function displayProducts() {
  let data = "";
  productsContainer.forEach((element) => {
    data += `
      <div class = "col-lg-3 col-md-6 col-sm-12">
        <div class = "card m-2">
          <img src = "${element.thumbnail}" alt = "${element.title}" class = "w-100"/>
          <div class = "card-body">
            <h5 class="card-title">${element.title}</h5>
            <span class = "text-success">${element.price}$</span>
            <div class="d-flex gap-2">
              <button class="btn details-btn" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="showDetailsInModal(${element.id})">Show Details</button>
              <button class="btn fav-btn" onclick = "favourite(${element.id})">
                <i class="fa-solid fa-heart-circle-plus"></i>
              </button>
              <button class="btn cart-btn" onclick = "cart(${element.id})">
                <i class="fa-solid fa-cart-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  });
  products.innerHTML = data;
}

// search Function
searchInput.addEventListener("input", () => {
  search(searchInput.value);
});
function search(word) {
  let data = "";
  let found = false;
  productsContainer.forEach((element) => {
    if (element.title.toLowerCase().includes(word.toLowerCase())) {
      found = true;
      data += `
      <div class = "col-lg-3 col-md-6 col-sm-12">
        <div class = "card m-2">
          <img src = "${element.thumbnail}" alt = "${element.title}" class = "w-100"/>
          <div class = "card-body">
            <h5 class="card-title">${element.title}</h5>
            <span class = "text-success">${element.price}$</span>
            <div class="d-flex gap-2">
              <button class="btn details-btn" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="showDetailsInModal(${element.id})">Show Details</button>
              <button class="btn fav-btn">
                <i class="fa-solid fa-heart-circle-plus"></i>
              </button>
              <button class="btn cart-btn">
                <i class="fa-solid fa-cart-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      `;
    }
  });

  if (found) {
    searchError.classList.add("d-none");
    searchError.classList.remove("d-block");
  } else {
    searchError.classList.remove("d-none");
    searchError.classList.add("d-block");
  }

  products.innerHTML = data;
}

//===========================Favourite=================================
// Favourite function
function favourite(id) {
  let product = productsContainer.find((element) => {
    return id === element.id;
  });

  let exists = favouritesContainer.find((element) => {
    return element.id === id;
  });

  if (exists) {
    window.alert("This Product Already Exists in your Favourites!");
    return;
  } else {
    favouritesContainer.push(product);
    localStorage.setItem("favourites", JSON.stringify(favouritesContainer));
    favCounter.innerText = favouritesContainer.length;
    favFloatBtn.classList.remove("d-none");
    displayFavourites();
  }
}

// function display favoutrites
function displayFavourites() {
  let data = "";
  if (favouritesContainer.length === 0) {
    data = `
        <p class="text-center text-muted fs-3 fw-3">
          There are no favourites Yet
        </p>
    `;
  } else {
    favouritesContainer.forEach((element) => {
      data += `
      <div class = "col-lg-3 col-md-6 col-sm-12">
        <div class = "card m-2">
          <img src = "${element.thumbnail}" alt = "${element.title}" class = "w-100"/>
          <div class = "card-body">
            <h5 class="card-title">${element.title}</h5>
            <span class = "text-success">${element.price}$</span>
            <div class="d-flex gap-2">
              <button class="btn details-btn" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="showDetailsInModal(${element.id})">Show Details</button>
              <button class="btn fav-btn" onclick = "removeFavourites(${element.id})">
                <i class="fa-solid fa-heart-circle-xmark"></i>
              </button>
              <button class="btn cart-btn" onclick = "cart(${element.id})">
                <i class="fa-solid fa-cart-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    });
  }
  favourites.innerHTML = data;
}

// Remove from favourites
function removeFavourites(id) {
  let product = favouritesContainer.findIndex((element) => {
    return element.id === id;
  });
  favouritesContainer.splice(product, 1);
  localStorage.setItem("favourites", JSON.stringify(favouritesContainer));
  favCounter.innerText = favouritesContainer.length;
  if (favouritesContainer.length === 0) {
    favFloatBtn.classList.add("d-none");
  }
  displayFavourites();
}

//====================================================================

//===========================cart=================================
// cart function
function cart(id) {
  let product = productsContainer.find((element) => {
    return id === element.id;
  });

  let exists = cartContainer.find((element) => {
    return element.id === id;
  });

  if (exists) {
    window.alert("This Product Already Exists in the cart!");
    return;
  } else {
    cartContainer.push(product);
    localStorage.setItem("cart", JSON.stringify(cartContainer));
    cartCounter.innerText = cartContainer.length;
    cartFloatBtn.classList.remove("d-none");
    displayCartProducts();
  }
}

// function display cart
function displayCartProducts() {
  let data = "";
  if (cartContainer.length === 0) {
    data = `
        <p class="text-center text-muted fs-3 fw-3">
          There are no items in the cart Yet!
        </p>
    `;
  } else {
    cartContainer.forEach((element) => {
      data += `
      <div class = "col-lg-3 col-md-6 col-sm-12">
        <div class = "card m-2">
          <img src = "${element.thumbnail}" alt = "${element.title}" class = "w-100"/>
          <div class = "card-body">
            <h5 class="card-title">${element.title}</h5>
            <span class = "text-success">${element.price}$</span>
            <div class="d-flex gap-2">
              <button class="btn details-btn" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="showDetailsInModal(${element.id})">Show Details</button>
              <button class="btn fav-btn" onclick = "favourite(${element.id})">
                <i class="fa-solid fa-heart-circle-plus"></i>
              </button>
              <button class="btn cart-btn" onclick = "removeFromCart(${element.id})">
                <i class="fa-regular fa-circle-xmark"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    });
  }
  cartSection.innerHTML = data;
}

// Remove from cart
function removeFromCart(id) {
  let product = cartContainer.findIndex((element) => {
    return element.id === id;
  });
  cartContainer.splice(product, 1);
  localStorage.setItem("cart", JSON.stringify(cartContainer));
  cartCounter.innerText = cartContainer.length;
  if (cartContainer.length === 0) {
    cartFloatBtn.classList.add("d-none");
  }
  displayCartProducts();
}

//====================================================================

// Modal
function showDetailsInModal(id) {
  let product = productsContainer.find((element) => {
    return element.id === id;
  });

  modalImage.src = product.thumbnail;
  modalTitle.innerHTML = product.title;
  modalCategory.innerHTML = `Category : ${product.category}`;
  modalPrice.innerHTML = `Price :  ${product.price}$`;
  modalRating.innerHTML = `Rating:  ${product.rating} <i class="fa-solid fa-star" style="color: rgb(255, 212, 59);"></i>`;
  modalWarranty.innerHTML = `Warranty: ${product.warrantyInformation}`;
  modalStock.innerHTML = `Stock Availability: ${product.availabilityStatus}`;
}
