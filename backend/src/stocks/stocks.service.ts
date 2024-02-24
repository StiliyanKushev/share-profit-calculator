import { Inject, Injectable } from '@nestjs/common';
import { SolveDto } from './dto/solve.dto';

@Injectable()
export class StocksService {
  constructor(
    @Inject('STOCKS_DATA')
    private readonly stockData: { timestamp: number; price: number }[],
  ) {}

  solve(solveDto: SolveDto) {
    // Filter the data for the specified time range
    const filtered = this.stockData.filter(
      (x) =>
        x.timestamp >= solveDto.startUnixTimestamp &&
        x.timestamp <= solveDto.endUnixTimestamp,
    );

    if (filtered.length === 0) {
      return {
        maxProfit: 0,
        buyPrice: 0,
        sellPrice: 0,
        buyDate: 0,
        sellDate: 0,
      };
    }

    let minPrice = filtered[0].price;
    let minPriceDate = filtered[0].timestamp;
    let maxProfit = 0;
    let buyPrice = 0;
    let sellPrice = 0;
    let buyDate = 0;
    let sellDate = 0;
    let sharesBought = 0;

    let foundPotentialBuyPrice = false;

    filtered.forEach((stock) => {
      if (stock.price > solveDto.funds && !foundPotentialBuyPrice) {
        return;
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
    });

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
  }
}
