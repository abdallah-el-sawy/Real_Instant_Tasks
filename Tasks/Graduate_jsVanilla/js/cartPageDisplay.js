import * as all from "./storage.js";
import { displayCartProducts , calculateTotal } from "./cart.js";

let cartContainer = all.getCart();

let cartCounter = document.getElementById("cartCounter");
let favCounter = document.getElementById("favCounter");

favCounter.innerText = all.getFavourites().length;
cartCounter.innerText = all.getCart().length;

calculateTotal(cartContainer);
displayCartProducts(cartContainer);
