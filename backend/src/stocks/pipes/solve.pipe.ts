import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { SolveDto } from 'stocks/dto/solve.dto';

@Injectable()
export class SolveValidationPipe implements PipeTransform {
  transform(value: SolveDto) {
    if (value.startUnixTimestamp >= value.endUnixTimestamp) {
      throw new BadRequestException('Dates cannot overlap.');
    }
    return value;
  }
}
