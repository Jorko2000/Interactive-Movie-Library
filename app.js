// MovieApp Module Pattern
const MovieApp = (() => {

  // CONFIG
  const API_KEY = "YOUR_API_KEY";
  const BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

  // DOM 
  const movieList = document.getElementById("movieList");
  const favoritesList = document.getElementById("favoritesList");
  const errorMsg = document.getElementById("errorMsg");
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modalBody");

  // FETCH 
  async function searchMovies(title) {
    try {
      clearError();

      const res = await fetch(`${BASE_URL}&s=${title}`);
      const data = await res.json();

      if (data.Response === "False") {
        showError(data.Error);
        movieList.innerHTML = "";
        return;
      }

      renderMovies(data.Search);

    } catch (err) {
      showError("Failed to fetch movies");
    }
  }

  async function getMovieDetails(id) {
    try {
      const res = await fetch(`${BASE_URL}&i=${id}`);
      const movie = await res.json();

      modalBody.innerHTML = `
        <h2>${movie.Title}</h2>
        <p><strong>Year:</strong> ${movie.Year}</p>
        <p><strong>Genre:</strong> ${movie.Genre}</p>
        <p><strong>Plot:</strong> ${movie.Plot}</p>
      `;

      modal.classList.remove("hidden");

    } catch {
      showError("Failed to load movie details");
    }
  }

  //  RENDER 
  function renderMovies(movies) {
    movieList.innerHTML = "";

    movies.forEach(movie => {
      const div = document.createElement("div");
      div.className = "movie";

      div.innerHTML = `
        <img src="${movie.Poster !== "N/A" ? movie.Poster : ""}" />
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
        <button class="details-btn">Details</button>
        <button class="fav-btn">⭐</button>
      `;

      div.querySelector(".details-btn")
        .addEventListener("click", () => getMovieDetails(movie.imdbID));

      div.querySelector(".fav-btn")
        .addEventListener("click", () => addToFavorites(movie));

      movieList.appendChild(div);
    });
  }

  function renderFavorites() {
    favoritesList.innerHTML = "";
    const favorites = getFavorites();

    favorites.forEach(movie => {
      const div = document.createElement("div");
      div.className = "movie";

      div.innerHTML = `
        <img src="${movie.Poster !== "N/A" ? movie.Poster : ""}" />
        <h3>${movie.Title}</h3>
        <button class="remove-btn">Remove</button>
      `;

      div.querySelector(".remove-btn")
        .addEventListener("click", () => removeFromFavorites(movie.imdbID));

      favoritesList.appendChild(div);
    });
  }

  // FAVORITES 
  function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  }

  function addToFavorites(movie) {
    let favorites = getFavorites();

    if (!favorites.find(m => m.imdbID === movie.imdbID)) {
      favorites.push(movie);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      renderFavorites();
    }
  }

  function removeFromFavorites(id) {
    let favorites = getFavorites();
    favorites = favorites.filter(m => m.imdbID !== id);

    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites();
  }

  // ERROR 
  function showError(msg) {
    errorMsg.textContent = msg;
  }

  function clearError() {
    errorMsg.textContent = "";
  }

  // EVENTS 
  function setupEventListeners() {
    document.getElementById("searchBtn").addEventListener("click", () => {
      const input = document.getElementById("searchInput").value.trim();

      if (!input) {
        showError("Please enter a movie title");
        return;
      }

      searchMovies(input);
    });

    document.getElementById("closeModal")
      .addEventListener("click", () => modal.classList.add("hidden"));
  }

  //  INIT 
  function init() {
    setupEventListeners();
    renderFavorites();
  }

  // Public API
  return {
    init
  };

})();

// Initialize app
window.addEventListener("load", MovieApp.init);
