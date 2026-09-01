export async function getData(productsContainer,errorr) {
  try {
    let response = await fetch(
      "https://dummyjson.com/products?limit=0",
    );
    let objectData = await response.json();
    productsContainer = objectData.products;
    console.log(productsContainer);
    errorr.classList.remove("d-block");
    errorr.classList.add("d-none");
    localStorage.setItem("products", JSON.stringify(productsContainer));
    return productsContainer;
  } catch (e) {
    console.log(e);
    errorr.classList.remove("d-none");
    errorr.classList.add("d-block");
  }
}


