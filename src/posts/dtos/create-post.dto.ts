import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(15)
  title: string;

  @IsString()
  @MinLength(3)
  @MaxLength(15)
  author: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsArray()
  @IsOptional()
  tags: string[];
}
