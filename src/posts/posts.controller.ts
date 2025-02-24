import { Body, Controller, Param, ParseIntPipe, Ip } from '@nestjs/common';
import { Get, Post, Patch } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly PostsService: PostsService) { }

  @Get('/')
  @ApiOperation({ summary: 'Get a post' })
  public getPosts() {
    return this.PostsService.getAllPosts();
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

  @Patch()
  @ApiOperation({ summary: 'Update a post' })
  @ApiResponse({
    status: 200,
    description: 'The post has been successfully updated.',
  })
  public updatePosts(@Body() patchPostDto: PatchPostDto) {
    console.log(patchPostDto);
  }
}
