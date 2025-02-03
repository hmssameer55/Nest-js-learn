import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetUserParamDto {
  @ApiPropertyOptional({
    description: 'The id of the user',
    type: 'integer',
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  id?: number;
}
