import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PatchUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'id name of the user',
    example: 1,
  })
  id: number;

  @ApiPropertyOptional({
    description: 'First name of the user',
    example: 'John',
  })
  firstname?: string;

  @ApiPropertyOptional({ description: 'Last name of the user', example: 'Doe' })
  lastname?: string;

  @ApiPropertyOptional({
    description: 'Email address of the user',
    example: 'user@example.com',
  })
  email?: string;

  @ApiPropertyOptional({
    description: 'Strong password for the user',
    example: 'Str0ngP@ssw0rd!',
  })
  password?: string;
}
