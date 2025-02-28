import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from '../entity/tags.entity';
import { CreateTagDto } from '../dtos/create-tag.dto';

@Injectable()
export class TagsService {
    constructor(

        @InjectRepository(Tag)
        private readonly tagsRepository: Repository<Tag>
    ) { }


    public async create(CreateTagDto: CreateTagDto) {
        let tag = this.tagsRepository.create(CreateTagDto);
        return await this.tagsRepository.save(tag);
    }
}