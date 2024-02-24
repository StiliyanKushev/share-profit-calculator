import { readFileSync } from 'fs';
import path from 'path';

// read the binary data
const binaryFilePath = path.join(__dirname, '../assets/stockData.bin');
const binaryData = readFileSync(binaryFilePath);

// allocate shared array buffer
const sharedBuffer = new SharedArrayBuffer(binaryData.length);

// write into the shared array buffer
const bufferView = new Uint8Array(sharedBuffer);
bufferView.set(new Uint8Array(binaryData));

export const StocksDataProvider = {
  provide: 'STOCKS_DATA',
  useValue: sharedBuffer,
};
