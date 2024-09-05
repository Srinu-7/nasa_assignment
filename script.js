// Your NASA API Key
const apiKey = "H6JyuiCfvQV7NqcsZB6taSGQHc9JxFWhap8eh0w4"; // Replace with your actual API key
const baseUrl = "https://api.nasa.gov/planetary/apod";

// DOM Elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const imageContainer = document.getElementById('image-content');
const searchHistoryList = document.getElementById('search-history');

// Load current image of the day when the page loads
window.onload = () => {
    getCurrentImageOfTheDay();
    addSearchToHistory();
};

// Function to get the current image of the day
function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split("T")[0];
    fetchImage(currentDate);
}

// Function to get the image for the selected date
function getImageOfTheDay(date) {
    fetchImage(date);
    saveSearch(date);
    addSearchToHistory();
}

// Fetch image from NASA API based on the date
function fetchImage(date) {
    const url = `${baseUrl}?api_key=${apiKey}&date=${date}`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            displayImage(data);
        })
        .catch(error => {
            console.error("Error fetching the image:", error);
            imageContainer.innerHTML = `<p>Error fetching image. Please try again later.</p>`;
        });
}

// Display the image or video and details in the UI
function displayImage(data) {
    if (data.media_type === "image") {
        // Display the image if media type is image
        imageContainer.innerHTML = `
            <h3>${data.title}</h3>
            <img src="${data.url}" alt="${data.title}">
            <p>${data.explanation}</p>
        `;
    } else if (data.media_type === "video") {
        // Display the video if media type is video
        imageContainer.innerHTML = `
            <h3>${data.title}</h3>
            <iframe src="${data.url}" frameborder="0" allowfullscreen></iframe>
            <p>${data.explanation}</p>
        `;
    } else {
        // If it's neither an image nor a video
        imageContainer.innerHTML = `<p>Media type not supported.</p>`;
    }
}

// Save search to local storage
function saveSearch(date) {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    if (!searches.includes(date)) {
        searches.push(date);
        localStorage.setItem('searches', JSON.stringify(searches));
    }
}

// Add search history to the UI
function addSearchToHistory() {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    searchHistoryList.innerHTML = ""; // Clear existing list

    searches.forEach(date => {
        let li = document.createElement('li');
        li.textContent = date;
        li.addEventListener('click', () => {
            fetchImage(date);
        });
        searchHistoryList.appendChild(li);
    });
}

// Handle form submission
searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const selectedDate = searchInput.value;
    if (selectedDate) {
        getImageOfTheDay(selectedDate);
    }
});
