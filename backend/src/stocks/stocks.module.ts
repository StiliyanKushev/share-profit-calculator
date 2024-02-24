import { Module } from '@nestjs/common';
import { StocksController } from './stocks.controller';
import { StocksService } from './stocks.service';

// warning: chunky boi 🐖
import stockData from '../assets/stockData.json';

@Module({
  providers: [
    StocksService,
    {
      provide: 'STOCKS_DATA',
      useValue: stockData,
    },
  ],
  controllers: [StocksController],
})
export class StocksModule {}
