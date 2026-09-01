// Modal
let exampleModalLabel = document.getElementById("exampleModalLabel");
let modalImage = document.getElementById("modalImage");
let modalTitle = document.getElementById("modalTitle");
let modalCategory = document.getElementById("modalCategory");
let modalPrice = document.getElementById("modalPrice");
let modalRating = document.getElementById("modalRating");
let modalWarranty = document.getElementById("modalWarranty");
let modalStock = document.getElementById("modalStock");
let modalDescription = document.getElementById("modalDescription");
let modalBrand = document.getElementById("modalBrand");
let modalDiscount = document.getElementById("modalDiscount");
let modalShipping = document.getElementById("modalShipping");
let modalReturn = document.getElementById("modalReturn");

function showDetailsInModal(product) {
  modalImage.src = product.thumbnail;

  modalTitle.innerHTML = product.title;

  modalCategory.innerHTML = `Category : ${product.category}`;

  modalPrice.innerHTML = `Price : EGP ${product.price.toFixed(2)}`;

  modalRating.innerHTML = `
    Rating : ${product.rating}
    <i class="fa-solid fa-star modal-star"></i>
  `;

  modalWarranty.innerHTML = `
    Warranty : ${product.warrantyInformation}
  `;

  modalStock.innerHTML = `
    Stock : ${product.stock} items
  `;

  modalBrand.innerHTML = `
    Brand : ${product.brand || "N/A"}
  `;

  modalDiscount.innerHTML = `
    Discount : ${Math.round(product.discountPercentage)}% OFF
  `;

  modalShipping.innerHTML = `
    Shipping : ${product.shippingInformation}
  `;

  modalReturn.innerHTML = `
    Return Policy : ${product.returnPolicy}
  `;

  modalDescription.innerHTML = product.description;
}

export { showDetailsInModal };
