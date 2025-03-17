import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'First name of the user',
    minLength: 3,
    maxLength: 96,
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(96)
  firstname: string;

  @ApiPropertyOptional({
    description: 'Last name of the user (optional)',
    minLength: 3,
    maxLength: 96,
    example: 'Doe',
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(96)
  lastname?: string;

  @ApiProperty({
    description: 'Email address of the user',
    maxLength: 72,
    example: 'user@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(72)
  email: string;

  @ApiProperty({
    description: 'Strong password for the user',
    example: 'Str0ngP@ssw0rd!',
  })
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
