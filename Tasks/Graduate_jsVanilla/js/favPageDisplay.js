import * as all from "./storage.js";
import { displayFavourites } from "./favourites.js";

let favouritesContainer = all.getFavourites();
let favCounter = document.getElementById("favCounter");
let cartCounter = document.getElementById("cartCounter");

// Set counter
favCounter.innerText = favouritesContainer.length;
cartCounter.innerText = all.getCart().length;

// Display favourites
displayFavourites(favouritesContainer);

