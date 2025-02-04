import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreatePostDto } from './dtos/create-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly usersService: UsersService) { }
  getAllPosts(userid: number) {
    return [
      {
        title: `Post 1`,
        content: 'This is a post 1',
        author: this.usersService.getUser(userid),
      },
      {
        title: `Post 2`,
        content: 'This is a post 2',
        author: this.usersService.getUser(userid),
      },
    ];
  }

  createPost(CreatePostDto: CreatePostDto) {
    return {
      title: CreatePostDto.title,
      content: CreatePostDto.content,
    };
  }
}
