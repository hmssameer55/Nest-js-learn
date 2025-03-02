import {
  isArray,
  IsArray,
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PostType } from '../enums/postType.enum';
import { PostStatus } from '../enums/postStatus.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreatePostSEODto } from 'src/posts_SEO/dto/create-post-seo.dto';
import { Type } from 'class-transformer';

export class CreatePostDto {
  @ApiProperty({
    example: 'title',
    description: 'The title of the post',
    format: 'string',
    minLength: 3,
    maxLength: 15,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(96)
  title: string;

  @ApiProperty({
    example: 'post',
    description: 'The type of the post',
    enum: PostType,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(PostType)
  postType: PostType;

  @ApiProperty({
    example: 'slug',
    description: 'The slug of the post',
    format: 'string',
    minLength: 3,
    maxLength: 15,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  slug: string;

  @ApiProperty({
    example: 'published',
    description: 'The status of the post',
    enum: PostStatus,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(PostStatus)
  status: PostStatus;

  @ApiPropertyOptional({
    example: 'lorem ipsum diufdi dsifu dfiudf difud ',
    description: 'The content of the post (optional)',
    format: 'string',
    minLength: 10,
    maxLength: 500,
  })
  @IsString()
  @IsOptional()
  @MinLength(10)
  @MaxLength(100)
  content?: string;

  @ApiPropertyOptional({
    example: 'schema',
    description: 'The schema of the post (optional)',
    format: 'string',
    minLength: 3,
    maxLength: 15,
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(25)
  schema?: string;

  @ApiPropertyOptional({
    example: 'featuredImageUrl',
    description: 'The featured image url of the post (optional)',
    format: 'string',
  })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  featuredImageUrl?: string;

  @ApiPropertyOptional({
    example: '2021-08-24T00:00:00.000Z',
    description: 'The published date of the post (optional)',
    format: 'date-time',
  })
  @IsISO8601()
  @IsOptional()
  publishedAt?: Date;

  @ApiPropertyOptional({
    type: 'array',
    example: [1, 2],
    description: 'The tags of the post (optional)',
  })
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  tags?: number[];

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => CreatePostSEODto)
  seo: CreatePostSEODto | null;

  @ApiProperty({
    example: 1,
    description: 'The id of the author of the post',
    format: 'number',
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  authorId: number;
}
