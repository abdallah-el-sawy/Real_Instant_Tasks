let searchInput = document.getElementById("searchInput");
let games = document.getElementById("games");
let favourites = document.getElementById("favouriteContainer");
let favCounter = document.getElementById("favCounter");

// Containers
let gamesContainer = [];
let favouritesContainer;

// Modal data
let modalImage = document.getElementById("modalImage");
let modalTitle = document.getElementById("modalTitle");
let gameName = document.getElementById("gameName");
let gameGenre = document.getElementById("gameGenre");
let gamePlatform = document.getElementById("gamePlatform");
let gamePublisher = document.getElementById("gamePublisher");
let gameDate = document.getElementById("gameDate");
let gameDescription = document.getElementById("gameDescription");
let gameLink = document.getElementById("gameLink");

// loading favourite data from LocalStorage
if (localStorage.getItem("favDB") != null) {
  favouritesContainer = JSON.parse(localStorage.getItem("favDB"));
  displayFavourites();
} else {
  favouritesContainer = [];
}

// Spinner
let loadingSection = document.getElementById("loadingSection");

// Funtions Call
getGames();

// Get Data FROM API
async function getGames() {
  try {
    let data = await fetch("https://www.freetogame.com/api/games");
    let games = await data.json();
    gamesContainer = games;
    console.log(games);
    if (games.length > 0) {
      loadingSection.style.display = "none";
    }
    displayGames(games);
  } catch (error) {
    games.innerHTML = `
    <p class="text-danger text-center fs-3">Error While Loading data Try again!</p>
    `;
    console.log(error);
  }
}

// Display Function
function displayGames(listOfGames) {
  let data = "";
  listOfGames.forEach(function (game) {
    data += `
      <div class = "col-lg-4 col-md-6 col-sm-12">
        <div class = "edited-card my-3">
          <img src="${game.thumbnail}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${game.title}</h5>
            <p class="card-text">${game.genre}</p>
            <button class = "btn btn-danger" onclick = "addFavourite(${game.id})"><i class="fa-solid fa-heart-circle-plus"></i></button>
            <button class = "btn btn-warning" data-bs-toggle="modal" data-bs-target="#detailsModal"  onclick="showDetails(${game.id})">Show Details</button>
            </div>
        </div>
      </div>
    
    `;
  });
  games.innerHTML = data;
}

// Search Function
searchInput.addEventListener("input", function () {
  const value = this.value.toLowerCase();
  const filteredGames = gamesContainer.filter((game) => {
    return game.title.toLowerCase().includes(value);
  });

  displayGames(filteredGames);
});

// Show Details
function showDetails(id) {
  let game = gamesContainer.find(function (game) {
    return game.id === id;
  });
  modalImage.src = game.thumbnail;
  modalTitle.innerHTML = game.title;
  gameGenre.innerHTML = game.genre;
  gamePlatform.innerHTML = game.platform;
  gamePublisher.innerHTML = game.publisher;
  gameDate.innerHTML = game.release_date;
  gameDescription.innerHTML = game.short_description;
  gameLink.href = game.game_url;
}

// Add to favourite function
function addFavourite(id) {
  let game = gamesContainer.find(function (game) {
    return game.id === id;
  });

  let gameExists = favouritesContainer.find(function (game) {
    return game.id === id;
  });

  if (gameExists) {
    alert("Game Already Exists");
    return;
  }

  favouritesContainer.push(game);
  localStorage.setItem("favDB", JSON.stringify(favouritesContainer));
  favCounter.innerText = favouritesContainer.length;
  displayFavourites();
}

// Display Favourites

function displayFavourites() {
  if (favouritesContainer.length === 0) {
    favourites.innerHTML = `
      <p class="fs-5 text-muted">
        No Favourite Games Yet
      </p>
    `;
    favCounter.innerHTML = 0;
    return;
  }

  let data = "";
  favouritesContainer.forEach(function (game) {
    data += `
      <div class = "col-lg-4 col-md-6 col-sm-12">
        <div class = "edited-card my-3">
          <img src="${game.thumbnail}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${game.title}</h5>
            <p class="card-text">${game.genre}</p>
            <button class = "btn btn-danger" onclick = "removeFavourite(${game.id})"><i class="fa-solid fa-heart-circle-minus"></i></button>
            <button class = "btn btn-warning" data-bs-toggle="modal" data-bs-target="#detailsModal"  onclick="showDetails(${game.id})">Show Details</button>
            </div>
        </div>
      </div>
    
    `;
  });
  favourites.innerHTML = data;
}

// Remove From favourites
let emptyFav = document.getElementById("emptyFav");
function removeFavourite(id) {
  let game = favouritesContainer.find(function (game) {
    return game.id === id;
  });
  let gameIndex = favouritesContainer.indexOf(game);
  favouritesContainer.splice(gameIndex, 1);
  localStorage.setItem("favDB", JSON.stringify(favouritesContainer));
  favCounter.innerText = favouritesContainer.length;
  displayFavourites();
}
