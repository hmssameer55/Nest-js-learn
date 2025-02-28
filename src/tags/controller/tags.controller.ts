import { Body, Controller, Post } from '@nestjs/common';
import { CreateTagDto } from '../dtos/create-tag.dto';
import { TagsService } from '../service/tags.service';

@Controller('tags')
export class TagsController {
    constructor(private readonly tagsService: TagsService) { }


    @Post()
    public create(@Body() CreateTagDto: CreateTagDto) {
        return this.tagsService.create(CreateTagDto);
    }
}