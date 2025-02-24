import { IsString, Length } from 'class-validator';

export class CreatePostSEODto {
    @IsString()
    @Length(1, 160)
    metaTitle: string;

    @IsString()
    @Length(1, 255)
    metaDescription: string;

    @IsString()
    @Length(1, 255)
    metaKeywords: string;
}
