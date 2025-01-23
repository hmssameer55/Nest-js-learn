import { Body, Controller, Param, ParseIntPipe, Ip } from '@nestjs/common';
import { Get, Post, Patch } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly PostsService: PostsService) {}

  @Get('/:id')
  public getPosts(@Param('id', ParseIntPipe) id: number, @Ip() ip: any) {
    return this.PostsService.getAllPosts(id);
  }

  @Post()
  public createPosts(@Body() CreatePostDto: CreatePostDto) {
    return 'You sent a post request to posts';
  }

  @Patch()
  public patchPosts(@Body() PatchPostDto: PatchPostDto) {
    return 'You sent a patch request to posts';
  }
}
