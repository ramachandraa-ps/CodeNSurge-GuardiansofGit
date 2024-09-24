const weatherApiKey = 'fa0195961d184d47b4940112242409';  
const defaultLocation = 'paris';  // Default location to show weather data

// Fetch weather information
async function fetchWeatherData(location = defaultLocation) {
    let weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${location}`;

    try {
        const response = await fetch(weatherUrl);
        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Display weather information
function displayWeatherData(weatherData) {
    const newsContainer = document.getElementById('newsCards');
    newsContainer.innerHTML = ''; // Clear previous content

    const weatherCard = `
        <div class="col-md-12 weather-card">
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title">Weather in ${weatherData.location.name}, ${weatherData.location.country}</h3>
                    <p class="card-text">Temperature: ${weatherData.current.temp_c}°C</p>
                    <p class="card-text">Condition: ${weatherData.current.condition.text}</p>
                    <p class="card-text">Humidity: ${weatherData.current.humidity}%</p>
                    <img src="${weatherData.current.condition.icon}" alt="Weather Icon">
                    <p class="card-text">Last updated: ${weatherData.current.last_updated}</p>
                </div>
            </div>
        </div>
    `;
    
    newsContainer.innerHTML += weatherCard;
}

// Event listener for the weather link in the navbar
document.getElementById('weatherLink').addEventListener('click', (event) => {
    event.preventDefault(); 
    fetchWeatherData(); // Fetch and display weather for the default location
});