import { Module } from '@nestjs/common';
import { TagsService } from './service/tags.service';
import { TagsController } from './controller/tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entity/tags.entity';

@Module({
  controllers: [TagsController],
  providers: [TagsService],
  exports: [TagsService],
  imports: [TypeOrmModule.forFeature([Tag])],
})
export class Tags { }
