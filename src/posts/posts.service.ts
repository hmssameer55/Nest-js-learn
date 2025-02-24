import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { PostSEO } from 'src/posts_SEO/entity/posts_SEO.entity';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,

    @InjectRepository(Post)
    private PostsRepository: Repository<Post>,

    @InjectRepository(PostSEO)
    private PostsSEORepository: Repository<PostSEO>,
  ) { }


  getAllPosts() {
    return this.PostsRepository.find({
      relations: ['seo'],
    });
  }

  // async createPost(CreatePostDto: CreatePostDto) { //without cascade

  //   let metaSEO = CreatePostDto.seo ? this.PostsSEORepository.create(CreatePostDto.seo) : null;

  //   if (metaSEO) {
  //     metaSEO = await this.PostsSEORepository.save(metaSEO);
  //   }

  //   let newPost = this.PostsRepository.create(CreatePostDto);

  //   if (metaSEO) {
  //     newPost.seo = metaSEO;
  //   }

  //   newPost = await this.PostsRepository.save(newPost);

  //   return newPost;
  // }


  async createPost(CreatePostDto: CreatePostDto) { //with cascade
    let newPost = this.PostsRepository.create(CreatePostDto);
    newPost = await this.PostsRepository.save(newPost);
    return newPost;
  }
}
