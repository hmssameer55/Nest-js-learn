import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Ip,
  Query,
  Delete,
} from '@nestjs/common';
import { Get, Post, Patch } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetPostsDto } from './dtos/get-post.dto';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly PostsService: PostsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  public getPosts(@Query() postQuery: GetPostsDto) {
    return this.PostsService.getAllPosts(postQuery);
  }

  @Get('/user')
  @ApiOperation({ summary: 'Get all posts user-specific' })
  public getUserPosts(@Query('id', ParseIntPipe) id: number) {
    return this.PostsService.getUserPosts(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({
    status: 201,
    description: 'The post has been successfully created.',
  })
  @ApiOperation({ summary: 'Create a new post' })
  public createPosts(@Body() createPostsDto: CreatePostDto) {
    return this.PostsService.createPost(createPostsDto);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete a post' })
  @ApiResponse({
    status: 200,
    description: 'The post has been successfully deleted.',
  })
  public deletePosts(@Query('id', ParseIntPipe) id: number) {
    return this.PostsService.deletePost(id);
  }

  @Patch()
  @ApiOperation({ summary: 'Update a post' })
  @ApiResponse({
    status: 200,
    description: 'The post has been successfully updated.',
  })
  public updatePosts(@Body() patchPostDto: PatchPostDto) {
    return this.PostsService.updatePost(patchPostDto);
  }
}
