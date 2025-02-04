import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

export class PatchPostDto extends PartialType(CreatePostDto) {
    @ApiProperty({
        example: 1,
        description: 'The id of the post',
        format: 'int32',
        required: true,
    })
    @IsInt()
    @IsNotEmpty()
    id: number;
}
