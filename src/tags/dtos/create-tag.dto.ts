import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUrl,
    MaxLength,
    MinLength,
} from 'class-validator';

export class CreateTagDto {
    @ApiProperty({
        example: 'title',
        description: 'The name of the tag',
        format: 'string',
        minLength: 3,
        maxLength: 96,
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(96)
    name: string;

    @ApiProperty({
        example: 'slug',
        description: 'The slug of the tag',
        format: 'string',
        minLength: 3,
        maxLength: 250,
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(250)
    slug: string;

    @ApiProperty({
        example: 'description',
        description: 'The description of the tag',
        format: 'string',
        minLength: 3,
        maxLength: 500,
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(500)
    description: string;

    @ApiPropertyOptional({
        example: 'featuredImageUrl',
        description: 'Featured Image url',
        format: 'string',
        minLength: 3,
        maxLength: 256,
        required: false,
    })
    @IsUrl()
    @IsOptional()
    @MaxLength(500)
    featuredImageUrl: string;
}