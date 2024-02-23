import { Injectable } from '@nestjs/common';
import { SolveDto } from './dto/solve.dto';

@Injectable()
export class StocksService {
  solve(solveDto: SolveDto) {
    solveDto;

    // todo: implement this for real
    return {
      buyDate: 'todo',
      sellDate: 'todo',
      buyPrice: 123123,
      sellPrice: 123123,
      sharesBought: 123123,
      profit: 123123,
    };
  }
}
