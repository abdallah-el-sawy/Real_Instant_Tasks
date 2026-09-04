import * as all from "./storage.js";
import { showDetailsInModal } from "./modal.js";
import { cart } from "./cart.js";


let favourites = document.getElementById("favourites");
let favCounter = document.getElementById("favCounter");
let favFloatBtn = document.getElementById("favFloatBtn");

let favouritesContainer = all.getFavourites();

// Add to favourites
function favourite(id, productsContainer, favouritesContainer) {
  let product = productsContainer.find((element) => {
    return element.id === id;
  });

  let exists = favouritesContainer.some((element) => {
    return element.id === id;
  });

  if (exists) {
    window.alert("This Product Already Exists in your Favourites!");
    return;
  }

  favouritesContainer.push(product);

  all.setFavourites(favouritesContainer);

  favCounter.innerText = favouritesContainer.length;

  if (favCounter) {
    favCounter.innerText = all.getFavourites().length;
  } 

  window.alert("Product added to Favourites successfully!");
}

// Display favourites
function displayFavourites(favouritesContainer) {
  let data = "";

  if (favouritesContainer.length === 0) {
    data = `
        <p class="text-center text-muted fs-3 fw-3">
          There are no favourites Yet
        </p>
      `;

    favourites.innerHTML = data;

    favFloatBtn.classList.add("d-none");

    return;
  }
  favouritesContainer.forEach((element) => {
    data += `
        <div class="col-12">
          <div class="fav-product-card">

            <!-- Product Image -->
            <div class="fav-image-wrapper">

              <img
                src="${element.thumbnail}"
                alt="${element.title}"
                class="fav-product-image"
              />

              <span class="fav-discount">
                -${Math.round(element.discountPercentage)}%
              </span>

            </div>

            <!-- Product Info -->
            <div class="fav-product-info">

              <span class="fav-category">
                ${element.category}
              </span>

              <h5 class="fav-title">
                ${element.title}
              </h5>

              <div class="fav-rating">

                <span class="fav-stars">
                  ${"★".repeat(Math.round(element.rating))}
                </span>

                <span class="fav-rating-number">
                  ${element.rating}
                </span>

              </div>

            </div>

            <!-- Price -->
            <div class="fav-price">

              <span class="fav-old-price">
                EGP ${(
                  element.price /
                  (1 - element.discountPercentage / 100)
                ).toFixed(2)}
              </span>

              <span class="fav-new-price">
                EGP ${element.price.toFixed(2)}
              </span>

            </div>

            <!-- Actions -->
            <div class="fav-actions">

              <button
                class="fav-remove-btn"
                data-id="${element.id}"
                title="Remove from favourites"
              >
                <i class="fa-solid fa-heart-circle-xmark"></i>
              </button>

              <button
                class="fav-details-btn"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                data-id="${element.id}"
                title="View details"
              >
                <i class="fa-solid fa-eye"></i>
              </button>

              <button
                class="fav-cart-btn"
                data-id="${element.id}"
                title="Add to cart"
              >
                <i class="fa-solid fa-cart-plus"></i>
              </button>

            </div>

          </div>
        </div>
      `;
  });

  favourites.innerHTML = data;

  // Details Events
  addFavouriteDetailsEvents(favouritesContainer);

  // Remove Events
  let favButtons = document.querySelectorAll(".fav-remove-btn");

  favButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let id = Number(button.dataset.id);

      removeFavourites(id, favouritesContainer);
    });
  });

  // add to cart from favourites
  let cartButtons = document.querySelectorAll(".fav-cart-btn");
  cartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let id = Number(button.dataset.id);

      cart(id, favouritesContainer, all.getCart());
    });
  });
}

function addFavouriteDetailsEvents(favouritesContainer) {
  let detailsButtons = document.querySelectorAll(".fav-details-btn");

  detailsButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let id = Number(button.dataset.id);

      let product = favouritesContainer.find((element) => {
        return element.id === id;
      });

      showDetailsInModal(product);
    });
  });
}

// Remove from favourites
function removeFavourites(id, favouritesContainer) {
  favouritesContainer = favouritesContainer.filter((element) => {
    return element.id !== id;
  });

  all.setFavourites(favouritesContainer);

  favCounter.innerText = favouritesContainer.length;

  displayFavourites(favouritesContainer);
}

export {
  favourite,
  displayFavourites,
  removeFavourites,
  favouritesContainer,
  favCounter,
};
