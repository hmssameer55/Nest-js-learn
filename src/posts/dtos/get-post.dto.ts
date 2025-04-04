import { IntersectionType } from '@nestjs/swagger';
import { IsDate, IsOptional } from 'class-validator';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination.query.dto';

class BasePostDto {
  @IsDate()
  @IsOptional()
  startDate?: Date;

  @IsDate()
  @IsOptional()
  endDate?: Date;
}

//combining two dto's
export class GetPostsDto extends IntersectionType(
  BasePostDto,
  PaginationQueryDto,
) {}
