import * as all from "./storage.js";
import { showDetailsInModal } from "./modal.js";
import { favourite } from "./favourites.js";

let cartbody = document.getElementById("cartbody");
let cartCounter = document.getElementById("cartCounter");
let cartFloatBtn = document.getElementById("cartFloatBtn");

// Price
let totalItems = document.getElementById("totalItems");
let cartTotal = document.getElementById("cartTotal");

function cart(id, productsContainer, cartContainer, quantity) {
  let product = productsContainer.find((element) => {
    return id === element.id;
  });

  for (let i = 0; i < quantity; i++) {
    cartContainer.push(product);
  }
  all.setCart(cartContainer);
  cartCounter.innerText = cartContainer.length;
  all.setCart(cartContainer);

  if (cartCounter) {
    cartCounter.innerText = cartContainer.length;
  }

  if (cartFloatBtn) {
    cartFloatBtn.classList.remove("d-none");
  }

  window.alert("Product added to cart successfully!");
}

// function display cart
function displayCartProducts(cartContainer) {
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
    <div class="col-12">
      <div class="cart-product-card">

        <!-- Product Image -->
        <div class="cart-image-wrapper">

          <img
            src="${element.thumbnail}"
            alt="${element.title}"
            class="cart-product-image"
          />

          <span class="cart-discount">
            -${Math.round(element.discountPercentage)}%
          </span>

        </div>

        <!-- Product Info -->
        <div class="cart-product-info">

          <span class="cart-category">
            ${element.category}
          </span>

          <h5 class="cart-title">
            ${element.title}
          </h5>

          <div class="cart-rating">

            <span class="cart-stars">
              ${"★".repeat(Math.round(element.rating))}
            </span>

            <span class="cart-rating-number">
              ${element.rating}
            </span>

          </div>

        </div>

        <!-- Price -->
        <div class="cart-price">

          <span class="cart-old-price">
            EGP ${(
              element.price /
              (1 - element.discountPercentage / 100)
            ).toFixed(2)}
          </span>

          <span class="cart-new-price">
            EGP ${element.price.toFixed(2)}
          </span>

        </div>

        <!-- Actions -->
        <div class="cart-actions">

          <button
            class="cart-details-btn"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            data-id="${element.id}"
            title="View details"
          >
            <i class="fa-solid fa-eye"></i>
          </button>

          <button
            class="cart-fav-btn"
            data-id="${element.id}"
            title="Add to favourites"
          >
            <i class="fa-solid fa-heart"></i>
          </button>

          <button
            class="cart-remove-btn"
            data-id="${element.id}"
            title="Remove from cart"
          >
            <i class="fa-regular fa-circle-xmark"></i>
          </button>

        </div>

      </div>
    </div>
  `;
    });
  }
  cartbody.innerHTML = data;
  // Details Events
  addCartDetailsEvents(cartContainer);

  // Remove Events
  let cartButtons = document.querySelectorAll(".cart-remove-btn");

  cartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let id = Number(button.dataset.id);
      removeFromCart(id, cartContainer);
    });
  });

  // add to fav from cart

  let favButtons = document.querySelectorAll(".cart-fav-btn");

  favButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let id = Number(button.dataset.id);

      let product = cartContainer.find((element) => {
        return element.id === id;
      });

      favourite(id, cartContainer, all.getFavourites());
    });
  });
}

// show details in cart page
function addCartDetailsEvents(cartContainer) {
  let detailsButtons = document.querySelectorAll(".cart-details-btn");

  detailsButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let id = Number(button.dataset.id);

      let product = cartContainer.find((element) => {
        return element.id === id;
      });

      showDetailsInModal(product);
    });
  });
}

// Remove from cart
function removeFromCart(id, cartContainer) {
  let index = cartContainer.findIndex((element) => {
    return element.id === id;
  });

  if (index !== -1) {
    cartContainer.splice(index, 1);
  }

  all.setCart(cartContainer);
  cartCounter.innerText = cartContainer.length;
  displayCartProducts(cartContainer);
}

// function calculate total
function calculateTotal(cartContainer) {
  let total = 0;

  cartContainer.forEach((element) => {
    total += element.price;
  });

  totalItems.innerText = cartContainer.length;
  cartTotal.innerText = `EGP ${total.toFixed(2)}`;
}

export { cart, displayCartProducts, removeFromCart , calculateTotal};
