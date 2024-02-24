import { workerData } from 'worker_threads';
import { SolveDto } from './dto/solve.dto';

const { stockData }: { stockData: SharedArrayBuffer } = workerData;
const bufferView = new Float64Array(stockData);

module.exports = (solveDto: SolveDto) => {
  let minPriceDate = bufferView[0];
  let minPrice = bufferView[1];
  let maxProfit = 0;
  let buyPrice = 0;
  let sellPrice = 0;
  let buyDate = 0;
  let sellDate = 0;
  let sharesBought = 0;

  let foundPotentialBuyPrice = false;

  // difference_between_unix_timestamps / one_hour * 2
  // where (2) is for both <timestamp> and <price> in each entry

  // note: this only works because we know the timestamps
  //     : have *exactly* one hour separation

  const hourInMs = 1000 * 60 * 60;

  const offsetLeft =
    Math.floor(
      Math.abs(solveDto.startUnixTimestamp - bufferView[0]) / hourInMs,
    ) * 2;
  const offsetRight =
    Math.floor(Math.abs(solveDto.endUnixTimestamp - bufferView[0]) / hourInMs) *
    2;

  const length = bufferView.length - 1;

  for (let i = offsetLeft; i < Math.min(offsetRight, length); i += 2) {
    const stock = {
      timestamp: bufferView[i],
      price: bufferView[i + 1],
    };

    if (stock.price > solveDto.funds && !foundPotentialBuyPrice) {
      continue;
    }

    foundPotentialBuyPrice = true;

    if (stock.price < minPrice) {
      minPrice = stock.price;
      minPriceDate = stock.timestamp;
    }

    // (stock.price - minPrice) is the difference in a single share's price
    // (solveDto.funds / minPrice) is how many shares *could* be bought
    const profit = (stock.price - minPrice) * (solveDto.funds / minPrice);
    if (profit > maxProfit) {
      maxProfit = profit;
      buyPrice = minPrice;
      sellPrice = stock.price;
      buyDate = minPriceDate;
      sellDate = stock.timestamp;
      sharesBought = solveDto.funds / buyPrice;
    }
  }

  if (!foundPotentialBuyPrice) {
    return {
      profit: 0,
      buyPrice: 0,
      sellPrice: 0,
      buyDate: 0,
      sellDate: 0,
      sharesBought: 0,
    };
  }

  return {
    profit: maxProfit,
    sharesBought,
    buyPrice,
    sellPrice,
    buyDate: new Date(buyDate).toUTCString(),
    sellDate: new Date(sellDate).toUTCString(),
  };
};
