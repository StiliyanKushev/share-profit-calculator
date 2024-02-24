const fs = require('fs');

// Utility function to generate random price changes
function getRandomPriceChange(previousPrice) {
    const maxChangePercent = 0.05; // Max change is ±5%
    const change = previousPrice * maxChangePercent * (Math.random() > 0.5 ? 1 : -1);
    let newPrice = previousPrice + change;
    // Ensure the price never goes below 10
    if (newPrice < 10) {
        newPrice = 10;
    }
    return newPrice;
}

// Generates stock price data
function generateStockData(startDate, endDate, basePrice) {
    const data = [];
    let currentPrice = basePrice;
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        currentPrice = getRandomPriceChange(currentPrice);
        data.push({
            timestamp: +currentDate,
            price: Math.floor(currentPrice)
        });

        // Increment the date
        currentDate.setHours(currentDate.getHours() + 1);
    }

    return data;
}

const startDate = new Date('1980-01-01T00:00:00Z');
const endDate = new Date('2024-12-31T23:59:00Z');
const basePrice = 100;

// Generate the data
const stockData = generateStockData(startDate, endDate, basePrice);

// Write the data to a JSON file
fs.writeFile('stockData.json', JSON.stringify(stockData, null, 2), 'utf8', (err) => {
    if (err) {
        console.log('An error occurred while writing JSON Object to File.', err);
    } else {
        console.log('JSON file has been saved.');
    }
});