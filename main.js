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

let breakingNewsId = null; // Variable to store the ID of the breaking news article

// Fetch Breaking News from API
async function fetchBreakingNews() {
    let url = `https://newsapi.org/v2/top-headlines?language=${selectedLanguage}&country=${selectedCountry}&pageSize=1&apiKey=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (data.articles.length > 0) {
        breakingNewsId = data.articles[0].url; // Store the breaking news URL
        displayBreakingNews(data.articles[0]);
    }
}

// Display Breaking News
function displayBreakingNews(article) {
    const breakingNewsContainer = document.getElementById('breakingNews');
    
    breakingNewsContainer.innerHTML = `
        <div class="breaking-news-card">
            <a href="${article.url}" target="_blank" class="breaking-news-link">
                <img src="${article.urlToImage}" alt="Breaking News Image" class="breaking-news-img">
                <h5 class="breaking-news-title">${article.title}</h5>
            </a>
        </div>
    `;
}

// Fetch News from API using NewsAPI module
async function fetchNews(page = 1) {
    let url = `https://newsapi.org/v2/top-headlines?language=${selectedLanguage}
    &country=${selectedCountry}
    &category=${selectedCategory}
    &q=${searchQuery}
    &page=${page}
    &pageSize=20
    &apiKey=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();

    // Filter out the breaking news article
    const filteredArticles = data.articles.filter(article => article.url !== breakingNewsId);
    
    displayNews(filteredArticles);
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
// Insert language selection dropdown into the header
const header = document.getElementById('header'); // Assuming you have a header element with this ID
header.innerHTML += `
    <div style="text-align: right; margin-bottom: 10px;">
        <select id="languageSelect">
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="zh">Chinese</option>
            <!-- Add more languages as needed -->
        </select>
    </div>
`;

// Initialize default language
let selectedLanguage = 'en';

// Listen for language selection
document.getElementById('languageSelect').addEventListener('change', function () {
    selectedLanguage = this.value; // Update selected language
    fetchBreakingNews(); // Fetch breaking news in the new language
    fetchNews(currentPage); // Fetch news in the new language
});

// Fetch Breaking News with selected language
async function fetchBreakingNews() {
    let url = `https://newsapi.org/v2/top-headlines?language=${selectedLanguage}&country=${selectedCountry}&pageSize=1&apiKey=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (data.articles.length > 0) {
        breakingNewsId = data.articles[0].url; // Store the breaking news URL
        displayBreakingNews(data.articles[0]);
    }
}

// Fetch News from API with selected language
async function fetchNews(page = 1) {
    let url = `https://newsapi.org/v2/top-headlines?language=${selectedLanguage}
    &country=${selectedCountry}
    &category=${selectedCategory}
    &q=${searchQuery}
    &page=${page}
    &pageSize=20
    &apiKey=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();

    const filteredArticles = data.articles.filter(article => article.url !== breakingNewsId);
    
    displayNews(filteredArticles);
    document.getElementById('resultsInfo').innerHTML = `Welcome to DailyPulse (${data.totalResults} results)`;
}

// Call the initial fetch for breaking news and articles
fetchBreakingNews();
fetchNews();
