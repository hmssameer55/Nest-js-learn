import { IsPositive, IsOptional } from 'class-validator';

// we can combine this with any dto's of many types
export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  page?: number = 1;

  @IsOptional()
  @IsPositive()
  limit?: number = 5;
}
