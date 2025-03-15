import { Body, Controller, Delete, ParseIntPipe, Post, Query } from '@nestjs/common';
import { CreateTagDto } from '../dtos/create-tag.dto';
import { TagsService } from '../service/tags.service';

@Controller('tags')
export class TagsController {
    constructor(private readonly tagsService: TagsService) { }


    @Post()
    public create(@Body() CreateTagDto: CreateTagDto) {
        return this.tagsService.create(CreateTagDto);
    }

    @Delete()
    public delete(@Query('id', ParseIntPipe) id:number){
        return this.tagsService.delete(id)
    }

    @Delete('soft-delete')
    public softDelete(@Query('id', ParseIntPipe) id:number){
        return this.tagsService.softDelete(id)
    }
}