// import section
import { getData } from "./api.js";
import { showDetailsInModal } from "./modal.js";
import * as all from "./storage.js";
import { favourite } from "./favourites.js";
import { cart } from "./cart.js";

// Catch Elements
let errorr = document.getElementById("error");
let products = document.getElementById("products");
let searchInput = document.getElementById("searchInput");
let searchError = document.getElementById("searchError");
let favCounter = document.getElementById("favCounter");
let cartCounter = document.getElementById("cartCounter");
let links = document.querySelectorAll(".nav-link");
let cartFloatBtn = document.getElementById("cartFloatBtn");
let favFloatBtn = document.getElementById("favFloatBtn");
let year = document.getElementById("year");
let categorylinks = document.querySelectorAll(".category-link");

// local storage part
let productsContainer = all.getProducts();
let favouritesContainer = all.getFavourites();
let cartContainer = all.getCart();

//filterization
categorylinks.forEach((link, index) => {
  link.addEventListener("click", (element) => {
    let category = link.dataset.category;
    let filteredData = productsContainer.filter((element) => {
      return element.category === category;
    });
    console.log(filteredData);
    if (category != "all") {
      displayProducts(filteredData);
    } else {
      displayProducts(productsContainer);
    }
  });

  link.addEventListener("click", () => {
    categorylinks.forEach((item) => {
      item.classList.remove("active");
    });
    link.classList.add("active");
  });
});

// Dynamic Year Part
const currentYear = new Date();
year.innerHTML = currentYear.getFullYear();

// Fav Counter , cart counter
favCounter.innerText = favouritesContainer.length;
cartCounter.innerText = cartContainer.length;

// Floating Button
if (cartContainer.length > 0) {
  cartFloatBtn.classList.remove("d-none");
}

// Floating Button Fav
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

// if (favouritesContainer) {
//   displayFavourites();
//   favCounter.innerText = favouritesContainer.length;
// }

// if (cartContainer) {
//   displayCartProducts();
//   cartCounter.innerText = cartContainer.length;
// }

// Function Call
loadDataFromApi();

// Get data From Api
async function loadDataFromApi() {
  productsContainer = await getData(productsContainer, errorr);
  displayProducts(productsContainer);
}

// display Products
function displayProducts(displayedContainer) {
  let data = "";
  displayedContainer.forEach((element) => {
    data += `
    <div class=" col-lg-4 col-md-6 col-sm-12">
      <div class="product-card">

        <!-- Product Image -->
        <div class="product-image-wrapper">

          <img
            src="${element.thumbnail}"
            alt="${element.title}"
            class="product-image w-100 p-3"
          />

          <span class="discount-badge">
            -${Math.round(element.discountPercentage)}%
          </span>


          <!-- Favourite Button -->
          <button
            class="fav-btn product-fav-btn"
            data-id="${element.id}"
          >
            <i class="fa-solid fa-heart"></i>
          </button>

        </div>

        <!-- Product Body -->
        <div class="product-body">

          <span class="product-category">
            ${element.category}
          </span>

          <h5 class="product-title">
            ${element.title}
          </h5>

          <!-- Rating -->
          <div class="product-rating">

            <span class="stars">
              ${"★".repeat(Math.round(element.rating))}
            </span>

            <span class="rating-number">
              ${element.rating}
            </span>

          </div>

          <!-- Price -->
          <div class="product-price">

            <span class="old-price">
              EGP ${(element.price / (1 - element.discountPercentage / 100)).toFixed(2)}
            </span>

            <span class="new-price">
              EGP ${element.price.toFixed(2)}
            </span>

          </div>

          <!-- Quantity -->
          <div class="quantity-section">

            <span class="quantity-label">
              Quantity
            </span>

            <div class="quantity-counter">

              <button class="quantity-btn">
                −
              </button>

              <span class="quantity-number">
                1
              </span>

              <button class="quantity-btn">
                +
              </button>

            </div>

          </div>

          <!-- Buttons -->
          <div class="product-actions">

            <button
              class="btn details-btn"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              data-id="${element.id}"
            >
              <i class="fa-solid fa-eye"></i>
              Details
            </button>

            <!-- Cart Button -->
            <button
              class="btn cart-btn add-cart-btn"
              data-id="${element.id}"
            >
              <i class="fa-solid fa-cart-plus"></i>
              Add to Cart
            </button>

          </div>

        </div>

      </div>
    </div>
  `;
  });
  products.innerHTML = data;
  addDetails();
  addFavouriteEvents();
  addCartEvents();
  addQuantityEvents();
}

// quantity->cart
function addQuantityEvents() {
  let quantityButtons = document.querySelectorAll(".quantity-btn");

  quantityButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let quantityNumber =
        button.parentElement.querySelector(".quantity-number");

      let quantity = Number(quantityNumber.innerText);

      if (button.innerText === "+") {
        quantity++;
      }

      if (button.innerText === "−" && quantity > 1) {
        quantity--;
      }

      quantityNumber.innerText = quantity;
    });
  });
}

// Add Details for modal in search
function addDetails() {
  let detailsButtons = document.querySelectorAll(".details-btn");

  detailsButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let id = Number(button.dataset.id);

      let product = productsContainer.find((element) => {
        return element.id === id;
      });

      showDetailsInModal(product);
    });
  });
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
    <div class=" col-lg-4 col-md-6 col-sm-12">
      <div class="product-card">

        <!-- Product Image -->
        <div class="product-image-wrapper">

          <img
            src="${element.thumbnail}"
            alt="${element.title}"
            class="product-image w-100 p-3"
          />

          <span class="discount-badge">
            -${Math.round(element.discountPercentage)}%
          </span>

          <button
            class="fav-btn product-fav-btn"
            data-id="${element.id}"
          >
            <i class="fa-solid fa-heart"></i>
          </button>

        </div>

        <!-- Product Body -->
        <div class="product-body">

          <span class="product-category">
            ${element.category}
          </span>

          <h5 class="product-title">
            ${element.title}
          </h5>

          <!-- Rating -->
          <div class="product-rating">

            <span class="stars">
              ${"★".repeat(Math.round(element.rating))}
            </span>

            <span class="rating-number">
              ${element.rating}
            </span>

          </div>

          <!-- Price -->
          <div class="product-price">

            <span class="old-price">
              EGP ${(element.price / (1 - element.discountPercentage / 100)).toFixed(2)}
            </span>

            <span class="new-price">
              EGP ${element.price.toFixed(2)}
            </span>

          </div>

          <!-- Quantity -->
          <div class="quantity-section">

            <span class="quantity-label">
              Quantity
            </span>

            <div class="quantity-counter">

              <button class="quantity-btn">
                −
              </button>

              <span class="quantity-number">
                1
              </span>

              <button class="quantity-btn">
                +
              </button>

            </div>

          </div>

          <!-- Buttons -->
          <div class="product-actions">

            <button
              class="btn details-btn"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              data-id="${element.id}"
            >
              <i class="fa-solid fa-eye"></i>
              Details
            </button>

            <button
              class="btn cart-btn add-cart-btn"
              data-id="${element.id}"
            >
              <i class="fa-solid fa-cart-plus"></i>
              Add to Cart
            </button>

          </div>

        </div>

      </div>
    </div>
  `;
    }
    products.innerHTML = data;
  });

  if (found) {
    searchError.classList.add("d-none");
    searchError.classList.remove("d-block");
  } else {
    searchError.classList.remove("d-none");
    searchError.classList.add("d-block");
  }

  products.innerHTML = data;
  addDetails();
}

//========================== Favourite =================================
function addFavouriteEvents() {
  let favButtons = document.querySelectorAll(".product-fav-btn");

  favButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let id = Number(button.dataset.id);

      favourite(id, productsContainer, favouritesContainer);

      favCounter.innerText = favouritesContainer.length;
      if (favouritesContainer.length > 0) {
        favFloatBtn.classList.remove("d-none");
      }
    });
  });
}

//=========================== cart =================================

function addCartEvents() {
  let cartButtons = document.querySelectorAll(".add-cart-btn");
  cartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let id = Number(button.dataset.id);

      let quantityNumber = button.closest(".product-card").querySelector(".quantity-number");

      let quantity = Number(quantityNumber.innerText);

      cart(id, productsContainer, cartContainer , quantity);
      cartCounter.innerText = cartContainer.length;
    });
  });
}
