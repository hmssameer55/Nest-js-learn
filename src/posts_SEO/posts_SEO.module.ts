import { Module } from '@nestjs/common';
import { Posts_SEOService } from './service/posts_SEO.service';
import { Posts_SEOController } from './controller/posts_SEO.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostSEO } from './entity/posts_SEO.entity';

@Module({
  controllers: [Posts_SEOController],
  providers: [Posts_SEOService],
  exports: [Posts_SEOService],
  imports: [TypeOrmModule.forFeature([PostSEO])],
})
export class Posts_SEO { }