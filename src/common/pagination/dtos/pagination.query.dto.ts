import { IsPositive, IsOptional, IsString } from 'class-validator';

// we can combine this with any dto's of many types the below attrs all are optional
export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  page?: number = 1;

  @IsOptional()
  @IsPositive()
  limit?: number = 5;

  @IsOptional()
  @IsString()
  route?: string = '/posts';
}
