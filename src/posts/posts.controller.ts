import { Body, Controller, Param, ParseIntPipe, Ip } from '@nestjs/common';
import { Get, Post, Patch } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('posts')
@ApiTags('posts')
export class PostsController {
  constructor(private readonly PostsService: PostsService) { }

  @Get('/:id')
  public getPosts(@Param('id', ParseIntPipe) userid: number) {
    return this.PostsService.getAllPosts(userid);
  }
}
