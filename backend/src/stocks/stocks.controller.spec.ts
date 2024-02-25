import { Test, TestingModule } from '@nestjs/testing';
import { SolveDto } from './dto/solve.dto';
import { StocksController } from './stocks.controller';
import { StocksService } from './stocks.service';

describe('StocksController', () => {
  let controller: StocksController;
  let service: StocksService;

  beforeEach(async () => {
    const mockStocksService = {
      solve: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [StocksController],
      providers: [
        {
          provide: StocksService,
          useValue: mockStocksService,
        },
      ],
    }).compile();

    controller = module.get<StocksController>(StocksController);
    service = module.get<StocksService>(StocksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('solve', () => {
    it('should call stocksService.solve with the correct parameters', async () => {
      const solveDto: SolveDto = {
        startUnixTimestamp: 1073167200000,
        endUnixTimestamp: 1708852400000,
        funds: 120,
      };

      controller.solve(solveDto);
      expect(service.solve).toHaveBeenCalledWith(solveDto);
    });
  });
});
