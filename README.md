#  Interactive Movie Library

##  Project Overview

This is a browser-based JavaScript application that allows users to search for movies using the OMDb API, view details, and manage a list of favorite movies stored locally.



##  Features

*  Search movies by title
*  View detailed movie information
*  Add movies to favorites
*  Remove movies from favorites
*  Favorites persist using localStorage
*  Error handling for invalid input and API issues



##  Technologies Used

* HTML
* CSS
* JavaScript (Vanilla JS)
* OMDb API (REST API)
* localStorage



##  Concepts Demonstrated

* DOM manipulation (createElement, appendChild, querySelector)
* Event handling
* Async/Await & Fetch API
* REST API integration
* Local storage data persistence
* Module Pattern (design pattern)



##  Project Structure

/movie-library
│── index.html
│── style.css
│── app.js



## ⚙️ Setup Instructions

1. Clone or download the project

2. Get a free API key from: https://www.omdbapi.com/apikey.aspx

3. Open `app.js` and replace:

   const API_KEY = "YOUR_API_KEY";

4. Open `index.html` in your browser



##  How It Works

* User enters a movie title and clicks "Search"
* App sends a request to OMDb API
* Results are dynamically rendered on the page
* Clicking "Details" shows more info
* Clicking  adds movie to favorites
* Favorites are saved in localStorage
* Favorites are loaded automatically on page load



##  Error Handling

* Empty search input is validated
* API errors (e.g. "Movie not found") are handled
* Friendly messages are shown to the user



##  Bonus Features

* Module Pattern for clean code organization
* Favorites auto-load on page refresh



##  Future Improvements

* Add loading spinner
* Improve UI design
* Add pagination
* Enable search on Enter key



##  Author

Student Project – JS Foundations Exam
