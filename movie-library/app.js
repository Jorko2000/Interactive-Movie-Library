// Module Pattern Implementation
const MovieApp = (() => {

    const API_KEY = "YOUR_API_KEY"; 
    const BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

    // DOM Elements
    const searchInput = document.querySelector("#searchInput");
    const searchBtn = document.querySelector("#searchBtn");
    const resultsDiv = document.querySelector("#results");
    const detailsDiv = document.querySelector("#movieDetails");
    const favoritesDiv = document.querySelector("#favorites");
    const errorMsg = document.querySelector("#errorMsg");

    // Fetch Movies (Search)
  
    const searchMovies = async (query) => {
        try {
            clearError();

            if (!query.trim()) {
                throw new Error("Please enter a movie title.");
            }
            
     // Async/Await + Fetch API
            
            const response = await fetch(`${BASE_URL}&s=${query}`);
            const data = await response.json();

            if (data.Response === "False") {
                throw new Error("Movie not found.");
            }

            renderMovies(data.Search);
        } catch (err) {
            showError(err.message);
        }
    };

    // Fetch Movie Details
  
    const getMovieDetails = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}&i=${id}`);
            const movie = await response.json();

            renderDetails(movie);
        } catch {
            showError("Failed to load movie details.");
        }
    };

  
    // Render Movie List
  
    const renderMovies = (movies) => {
        resultsDiv.innerHTML = "";

        movies.forEach(movie => {
            const div = document.createElement("div");
            div.classList.add("movie");

            div.innerHTML = `
                <img src="${movie.Poster}" alt="">
                <h3>${movie.Title}</h3>
                <p>${movie.Year}</p>
                <button data-id="${movie.imdbID}">Details</button>
                <button data-fav='${JSON.stringify(movie)}'>❤️</button>
            `;

            // Event: Details
            div.querySelector("button[data-id]")
                .addEventListener("click", () => getMovieDetails(movie.imdbID));

            // Event: Add to favorites
            div.querySelector("button[data-fav]")
                .addEventListener("click", () => addToFavorites(movie));

            resultsDiv.appendChild(div);
        });
    };

    // Render Movie Details

    const renderDetails = (movie) => {
        detailsDiv.innerHTML = `
            <h2>${movie.Title}</h2>
            <img src="${movie.Poster}">
            <p><strong>Year:</strong> ${movie.Year}</p>
            <p><strong>Genre:</strong> ${movie.Genre}</p>
            <p>${movie.Plot}</p>
        `;
    };

    // Favorites Logic (localStorage)
  
    const getFavorites = () => {
        return JSON.parse(localStorage.getItem("favorites")) || [];
    };

    const saveFavorites = (favorites) => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    };

    const addToFavorites = (movie) => {
        const favorites = getFavorites();

        if (!favorites.find(m => m.imdbID === movie.imdbID)) {
            favorites.push(movie);
            saveFavorites(favorites);
            renderFavorites();
        }
    };

    const removeFromFavorites = (id) => {
        let favorites = getFavorites();
        favorites = favorites.filter(m => m.imdbID !== id);
        saveFavorites(favorites);
        renderFavorites();
    };

    const renderFavorites = () => {
        favoritesDiv.innerHTML = "";

        const favorites = getFavorites();

        favorites.forEach(movie => {
            const div = document.createElement("div");
            div.classList.add("movie");

            div.innerHTML = `
                <img src="${movie.Poster}">
                <h4>${movie.Title}</h4>
                <button data-remove="${movie.imdbID}">❌</button>
            `;

            div.querySelector("button")
                .addEventListener("click", () => removeFromFavorites(movie.imdbID));

            favoritesDiv.appendChild(div);
        });
    };

    // Error Handling

    const showError = (msg) => {
        errorMsg.textContent = msg;
    };

    const clearError = () => {
        errorMsg.textContent = "";
    };

    // Event Listeners
    
    const init = () => {
        searchBtn.addEventListener("click", () => {
            searchMovies(searchInput.value);
        });

        // Load favorites on page load
        renderFavorites();
    };

    return { init };

})();

// Initialize App
document.addEventListener("DOMContentLoaded", MovieApp.init);
