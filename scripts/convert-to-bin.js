const fs = require('fs');
const path = require('path');

// Path to your JSON file
const jsonFilePath = path.join(process.cwd(), 'stockData.json');
// Output binary file path
const binFilePath = path.join(process.cwd(), 'stockData.bin');

// Read and parse the JSON file
const jsonContent = fs.readFileSync(jsonFilePath, 'utf8');
const stockData = JSON.parse(jsonContent);

// Create a buffer for the binary data
// Since each record consists of two 64-bit floats, and there are stockData.length records
const buffer = new ArrayBuffer(stockData.length * 16);
const view = new Float64Array(buffer);

stockData.forEach((record, index) => {
    // For each record, set the timestamp and price in the view
    view[index * 2] = record.timestamp;
    view[index * 2 + 1] = record.price;
});

// Write the buffer to a binary file
fs.writeFileSync(binFilePath, Buffer.from(view.buffer));
console.log(`Converted ${stockData.length} records to binary format at '${binFilePath}'`);