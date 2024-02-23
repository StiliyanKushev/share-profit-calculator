import { IsNumber, IsPositive } from 'class-validator';

export class SolveDto {
  @IsNumber()
  @IsPositive()
  startUnixTimestamp: number;

  @IsNumber()
  @IsPositive()
  endUnixTimestamp: number;

  @IsNumber()
  @IsPositive()
  funds: number;
}
