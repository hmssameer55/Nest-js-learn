import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,

    @InjectRepository(Post)
    private PostsRepository: Repository<Post>,
  ) {}
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

  async createPost(CreatePostDto: CreatePostDto) {
    let newPost = this.PostsRepository.create(CreatePostDto);
    newPost = await this.PostsRepository.save(newPost);

    return newPost;
  }
}
