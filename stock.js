// stock.js

// Fetch stock data
async function fetchStockData() {
    const stockApiKey = '19f885fb7b0e35366bd888a85f4216ec';  // Replace with your actual API key
    const stockSymbol = 'AAPL';  // You can change this to any other stock symbol if needed
    const stockUrl = `http://api.marketstack.com/v1/eod?access_key=${stockApiKey}&symbols=${stockSymbol}`;

    try {
        const response = await fetch(stockUrl);
        const data = await response.json();
        displayStockData(data);
    } catch (error) {
        console.error('Error fetching stock data:', error);
    }
}

// Display stock information
function displayStockData(stockData) {
    const newsContainer = document.getElementById('newsCards'); // Assuming newsCards is the container
    newsContainer.innerHTML = ''; // Clear previous content

    const stock = stockData.data[0]; // Assuming the API returns an array of stock data

    const stockCard = `
        <div class="col-md-12 stock-card">
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title">${stock.symbol} Stock Data</h3>
                    <p class="card-text">Date: ${stock.date}</p>
                    <p class="card-text">Open: $${stock.open}</p>
                    <p class="card-text">Close: $${stock.close}</p>
                    <p class="card-text">High: $${stock.high}</p>
                    <p class="card-text">Low: $${stock.low}</p>
                    <p class="card-text">Volume: ${stock.volume}</p>
                </div>
            </div>
        </div>
    `;

    newsContainer.innerHTML += stockCard;
}

// Event listener for the stock link in the navbar
document.getElementById('stockLink').addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('resultsInfo').innerHTML = ''; // Clear DailyPulse message
    fetchStockData(); // Fetch and display stock data for the selected symbol
});
