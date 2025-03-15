import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Tag } from '../entity/tags.entity';
import { CreateTagDto } from '../dtos/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  public async create(CreateTagDto: CreateTagDto) {
    let tag = this.tagsRepository.create(CreateTagDto);
    return await this.tagsRepository.save(tag);
  }

  public async findMultipleTags(tagIds: number[]) {
    return await this.tagsRepository.find({
      where: {
        id: In(tagIds),
      },
    });
  }

  public async delete(id:number){
    await this.tagsRepository.delete(id)

    return {
      deleted:true,
      id:id
    }
  }

  public async softDelete(id:number){
    await this.tagsRepository.softDelete(id)
    return{
      deleted:true,
      id:id
    }
  }
}
