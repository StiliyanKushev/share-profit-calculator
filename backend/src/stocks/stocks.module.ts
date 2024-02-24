import { Module } from '@nestjs/common';
import { StocksDataProvider } from './stocks-data.provider';
import { StocksController } from './stocks.controller';
import { StocksService } from './stocks.service';

@Module({
  providers: [StocksDataProvider, StocksService],
  controllers: [StocksController],
})
export class StocksModule {}
