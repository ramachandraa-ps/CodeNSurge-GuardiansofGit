const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;
// Main JavaScript logic for the News App

const apiKey = '0dd1785deb4e4a7aa18d66e322dc2fb5';
let currentPage = 1;
let selectedLanguage = 'en';
let selectedCategory = '';
let selectedCountry = 'us';
let searchQuery = '';

// Fetch News from API using NewsAPI module
async function fetchNews(page = 1) {
    let url = `https://newsapi.org/v2/top-headlines?language=${selectedLanguage}&country=${selectedCountry}&category=${selectedCategory}&q=${searchQuery}&page=${page}&pageSize=20&apiKey=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();

    displayNews(data.articles);
    document.getElementById('resultsInfo').innerHTML = `Welcome to DailyPulse (${data.totalResults} results)`;
}

// Display News Cards (4 per row)
function displayNews(articles) {
    const newsContainer = document.getElementById('newsCards');
    newsContainer.innerHTML = '';

    articles.forEach(article => {
        const newsCard = `
            <div class="col-md-3">
                <a href="${article.url}" target="_blank" class="card-link"> <!-- Make the entire card clickable -->
                    <div class="card">
                        <img src="${article.urlToImage}" class="card-img-top" alt="News Image">
                        <div class="card-body">
                            <h5 class="card-title">${article.title}</h5>
                            <p class="card-text">${article.description}</p>
                        </div>
                    </div>
                </a>
            </div>
        `;
        newsContainer.innerHTML += newsCard;
    });
}


// Category Selection
document.querySelectorAll('[data-category]').forEach(categoryLink => {
    categoryLink.addEventListener('click', function () {
        selectedCategory = this.getAttribute('data-category');
        fetchNews(currentPage);
    });
});

// Pagination Buttons
document.getElementById('nextPage').addEventListener('click', () => {
    currentPage++;
    fetchNews(currentPage);
});

document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchNews(currentPage);
    }
});

// Initial Fetch
fetchNews();
// Search functionality
document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission
    const query = document.getElementById('searchInput').value.toLowerCase();
    fetchNewsBySearch(query);
});

// Fetch News by Search Query
async function fetchNewsBySearch(query) {
    let url = `https://newsapi.org/v2/everything?q=${query}&language=${selectedLanguage}&apiKey=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();

    displayNews(data.articles);
    document.getElementById('resultsInfo').innerHTML = `Search Results for "${query}" (${data.totalResults} results)`;
}
