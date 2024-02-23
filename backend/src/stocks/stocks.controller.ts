import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SolveDto } from './dto/solve.dto';
import { StocksService } from './stocks.service';

@ApiTags('stocks')
@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @ApiOkResponse({ description: 'successfully found a solution' })
  @ApiUnauthorizedResponse({ description: 'access token has expired' })
  @ApiBadRequestResponse({
    description: ['dto is invalid', 'dates are invalid'].join(' or '),
  })
  @HttpCode(HttpStatus.OK)
  @Post('solve')
  solve(solveDto: SolveDto) {
    return this.stocksService.solve(solveDto);
  }
}
