import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(96)
  firstname: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(96)
  lastname?: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(72)
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
