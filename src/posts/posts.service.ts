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


  // getAllPosts() {
  //   return this.PostsRepository.find({
  //     relations: ['seo'],
  //   });
  // }

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

  getAllPosts() {
    return this.PostsRepository.find({
      relations: {
        author: true,
        seo: true,
      }
    });
  }


  async createPost(CreatePostDto: CreatePostDto) { //with cascade

    let user = await this.usersService.getUser(CreatePostDto.authorId)

    let newPost = this.PostsRepository.create({ ...CreatePostDto, author: user });
    newPost = await this.PostsRepository.save(newPost);
    return newPost;
  }

  async deletePost(id: number) {
    // let post = await this.PostsRepository.findOneBy({ id });
    await this.PostsRepository.delete(id);
    // await this.PostsSEORepository.delete(post.seo.id);
    return { message: 'Post deleted successfully' };

  }
}
