import { Inject, Injectable } from '@nestjs/common';
import { resolve } from 'path';
import Piscina from 'piscina';
import { SolveDto } from './dto/solve.dto';

@Injectable()
export class StocksService {
  worker: Piscina;

  constructor(
    @Inject('STOCKS_DATA')
    private readonly stockData: SharedArrayBuffer,
  ) {
    this.worker = new Piscina({
      filename: resolve(__dirname, 'stocks.worker.js'),
      workerData: {
        stockData: this.stockData,
      },
    });
  }

  solve(solveDto: SolveDto) {
    return this.worker.run(solveDto);
  }
}
