import { workerData } from 'worker_threads';
import { SolveDto } from './dto/solve.dto';
import { solve } from './stocks.solve';

const { stockData }: { stockData: SharedArrayBuffer } = workerData;
const bufferView = new Float64Array(stockData);

module.exports = (solveDto: SolveDto) => {
  return solve(solveDto, bufferView);
};
