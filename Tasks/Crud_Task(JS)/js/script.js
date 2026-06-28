let productName = document.getElementById('productName');
let productPrice = document.getElementById('productPrice');
let productCat = document.getElementById('productCat');
let productDesc = document.getElementById('productDesc');
let Search = document.getElementById('search');

let mainBtn = document.getElementById('mainBtn');

let productNameAlert = document.getElementById('productNameAlert');
let searchAlert = document.getElementById('searchAlert');
let productPriceAlert = document.getElementById('productPriceAlert');
let productCatAlert = document.getElementById('productCatAlert');
let productDescAlert = document.getElementById('productDescAlert');


let currnetIndex;


let productsContainer;

if (localStorage.getItem('Products') != null) {
  productsContainer = JSON.parse(localStorage.getItem('Products'));
  displayProducts()
}
else {
  productsContainer = [];
}


// Add Product Function
mainBtn.addEventListener('click', addProduct);

function addProduct() {

  // validation
  if (!productNameValidation() || !productPriceValidation() || !productCatValidation() || !productDescValidation()) {
    alert('invalid Data Entered Can\'t add the product');
    return;
  }


  let productInfo = {
    name: productName.value,
    price: productPrice.value,
    cat: productCat.value,
    desc: productDesc.value
  }

  if (mainBtn.innerHTML != 'Add Product') {
    updateProduct(currnetIndex);
    productsContainer.splice(currnetIndex, 1, productInfo);
    mainBtn.innerHTML = 'Add Product';
    mainBtn.classList.replace('btn-outline-warning', 'btn-outline-primary')
  }
  else {
    productsContainer.push(productInfo);
  }
  localStorage.setItem('Products', JSON.stringify(productsContainer));
  clearForm();
  displayProducts();
}


// Clear Form Function
function clearForm() {
  productName.value = '';
  productPrice.value = '';
  productCat.value = '';
  productDesc.value = '';
  productName.classList.remove("is-valid", "is-invalid");
  productNameAlert.classList.add("d-none");
  productPrice.classList.remove("is-valid", "is-invalid");
  productPriceAlert.classList.add("d-none");
  productCat.classList.remove("is-valid", "is-invalid");
  productCatAlert.classList.add("d-none");
  productDesc.classList.remove("is-valid", "is-invalid");
  productDescAlert.classList.add("d-none");
}


// Display Products Function
function displayProducts() {
  let data = ``;
  for (let i = 0; i < productsContainer.length; i++) {
    data += `
        <tr>
          <td>${i + 1}</td>
          <td>${productsContainer[i].name}</td>
          <td>${productsContainer[i].price}</td>
          <td>${productsContainer[i].cat}</td>
          <td>${productsContainer[i].desc}</td>
          <td><button class="btn btn-warning" onclick="updateProduct(${i})">Update</button></td>
          <td><button class="btn btn-danger" onclick="removeProduct(${i})">Delete</button></td>
        </tr>
    `
  }
  document.getElementById('rowData').innerHTML = data;
}


// Remove Product Function
function removeProduct(index) {
  productsContainer.splice(index, 1);
  localStorage.setItem('Products', JSON.stringify(productsContainer));
  displayProducts();
}


//Update Function
function updateProduct(index) {
  currnetIndex = index;
  productName.value = productsContainer[index].name;
  productPrice.value = productsContainer[index].price;
  productCat.value = productsContainer[index].cat;
  productDesc.value = productsContainer[index].desc;

  mainBtn.classList.replace('btn-outline-primary', 'btn-outline-warning');
  mainBtn.innerHTML = 'Update Product';
}

// ############### { Search Function : Task } ###########################
Search.addEventListener('keyup', function () {
  search(this.value);
});
function search(word) {
  let data = '';
  let found = false; // -> for the validation


  for (let i = 0; i < productsContainer.length; i++) {
    if (productsContainer[i].name.toLowerCase().includes(word.toLowerCase())) {

      found = true;

      data += `
        <tr>
          <td>${i + 1}</td>
          <td>${productsContainer[i].name}</td>
          <td>${productsContainer[i].price}</td>
          <td>${productsContainer[i].cat}</td>
          <td>${productsContainer[i].desc}</td>
          <td><button class="btn btn-warning" onclick="updateProduct(${i})">Update</button></td>
          <td><button class="btn btn-danger" onclick="removeProduct(${i})">Delete</button></td>
        </tr>
      `
    }
  }

  // validation Part
  if (!found) {
    searchAlert.classList.remove('d-none');
  }
  else {
    searchAlert.classList.add('d-none');
  }

  document.getElementById('rowData').innerHTML = data;
}




// All Validations 

// ProductName Validation Function
productName.addEventListener('keyup', productNameValidation);
function productNameValidation() {
  if (productName.value.trim() === "") {
    productName.classList.remove("is-valid", "is-invalid");
    productNameAlert.classList.add("d-none");
    return false;
  }

  let regex = /^[A-Z][A-Za-z0-9 ]{0,}$/;

  if (regex.test(productName.value)) {
    productName.classList.add('is-valid');
    productName.classList.remove('is-invalid');
    productNameAlert.classList.add('d-none')
    return true;
  }
  else {
    productName.classList.add('is-invalid');
    productName.classList.remove('is-valid');
    productNameAlert.classList.remove('d-none');
    return false;
  }


}

// Product price Validation
productPrice.addEventListener('keyup', productPriceValidation);
function productPriceValidation() {

  if (productPrice.value.trim() === "") {
    productPrice.classList.remove("is-valid", "is-invalid");
    productPriceAlert.classList.add("d-none");
    return false;
  }

  let regex = /^\d+(\.\d+)?$/;


  if (regex.test(productPrice.value)) {
    productPrice.classList.add('is-valid');
    productPrice.classList.remove('is-invalid');
    productPriceAlert.classList.add('d-none')
    return true;
  }
  else {
    productPrice.classList.add('is-invalid');
    productPrice.classList.remove('is-valid');
    productPriceAlert.classList.remove('d-none')
    return false;
  }
}

// product Category Validation
productCat.addEventListener('keyup' , productCatValidation);
function productCatValidation(){
  let regex = /^[A-Za-z ,]{2,}$/;

  if (productCat.value.trim() === "") {
    productCat.classList.remove("is-valid", "is-invalid");
    productCatAlert.classList.add("d-none");
    return false;
  }

  if (regex.test(productCat.value)) {
    productCat.classList.add('is-valid');
    productCat.classList.remove('is-invalid');
    productCatAlert.classList.add('d-none')
    return true;
  }
  else {
    productCat.classList.add('is-invalid');
    productCat.classList.remove('is-valid');
    productCatAlert.classList.remove('d-none')
    return false;
  }
}


// product Description Validation
productDesc.addEventListener('keyup' , productDescValidation);
function productDescValidation(){
  let regex = /^[A-Za-z0-9 ,]{2,}$/;

  if (productDesc.value.trim() === "") {
    productDesc.classList.remove("is-valid", "is-invalid");
    productDescAlert.classList.add("d-none");
    return false;
  }

  if (regex.test(productDesc.value)) {
    productDesc.classList.add('is-valid');
    productDesc.classList.remove('is-invalid');
    productDescAlert.classList.add('d-none')
    return true;
  }
  else {
    productDesc.classList.add('is-invalid');
    productDesc.classList.remove('is-valid');
    productDescAlert.classList.remove('d-none')
    return false;
  }
}








