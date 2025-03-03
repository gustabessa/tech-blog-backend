import { Type } from 'class-transformer';
import { IsNumber, Max, Min } from 'class-validator';

export abstract class AbstractPaginatedRequestDTO {
  @Min(0)
  @IsNumber()
  @Type(() => Number)
  page: number = 1;

  @Min(5)
  @Max(25)
  @IsNumber()
  @Type(() => Number)
  limit: number = 10;
}
