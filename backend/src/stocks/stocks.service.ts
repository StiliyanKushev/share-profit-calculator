import { Inject, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { resolve } from 'path';
import Piscina from 'piscina';
import { SolveDto } from './dto/solve.dto';

/**
 * @warning
 * This is probably a shit solution.
 * TODO(find out how to properly use Piscina with ts-jest)
 *
 * At runtime the worker file `stocks.worker.js`
 * is next to __dirname while in "testing" during jest
 * the file is not built with ts-jest because it's not referenced
 * anywhere, therefor we need to reference the built version
 * instead.
 *
 * @note
 * This is also why package.json has a `pretest:e2e` script
 * that runs `npm run build` to make sure the file is there.
 */
function getWorkerPath() {
  if (existsSync(resolve(__dirname, 'stocks.worker.js'))) {
    return resolve(__dirname, 'stocks.worker.js');
  }
  return resolve(__dirname, '../../dist/stocks/stocks.worker.js');
}

@Injectable()
export class StocksService {
  worker: Piscina;

  constructor(
    @Inject('STOCKS_DATA')
    private readonly stockData: SharedArrayBuffer,
  ) {
    this.worker = new Piscina({
      filename: getWorkerPath(),
      workerData: {
        stockData: this.stockData,
      },
    });
  }

  solve(solveDto: SolveDto) {
    return this.worker.run(solveDto);
  }
}
