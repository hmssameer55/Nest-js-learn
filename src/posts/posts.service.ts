import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { PostSEO } from 'src/posts_SEO/entity/posts_SEO.entity';
import { TagsService } from 'src/tags/service/tags.service';
import { PatchPostDto } from './dtos/patch-post.dto';
import { ConfigService } from '@nestjs/config';
import { GetPostsDto } from './dtos/get-post.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly configService: ConfigService,

    private readonly usersService: UsersService,

    private readonly tagsService: TagsService,

    @InjectRepository(Post)
    private PostsRepository: Repository<Post>,

    @InjectRepository(PostSEO)
    private PostsSEORepository: Repository<PostSEO>,
  ) {}

  getAllPosts(postQuery: GetPostsDto) {
    return this.PostsRepository.find({
      // relations: {
      //   author: true, //we can also use cascade true directly in entity file instead of defining relations here
      //   seo: true,
      //   tags: true,
      // },
      take: postQuery.limit, //take means take 10 posts from the database at one time
      skip: (postQuery.page - 1) * postQuery.limit, // 1-1 * 10
    });
  }

  async getUserPosts(id: number) {
    const user = await this.usersService.getUser(id);

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const posts = await this.PostsRepository.find({
      where: {
        author: { id: id },
      },
    });

    return posts;
  }

  async createPost(CreatePostDto: CreatePostDto) {
    //with cascade

    let user = await this.usersService.getUser(CreatePostDto.authorId);

    let tags = await this.tagsService.findMultipleTags(CreatePostDto.tags);

    let newPost = this.PostsRepository.create({
      ...CreatePostDto,
      author: user,
      tags,
    });
    return await this.PostsRepository.save(newPost);
  }

  async deletePost(id: number) {
    // let post = await this.PostsRepository.findOneBy({ id });
    await this.PostsRepository.delete(id);
    // await this.PostsSEORepository.delete(post.seo.id);
    return { message: 'Post deleted successfully' };
  }

  public async updatePost(PatchPostDto: PatchPostDto) {
    //1.find the tags

    let tags = undefined;

    if (PatchPostDto.tags.length > 0) {
      tags = await this.tagsService.findMultipleTags(PatchPostDto.tags);
      if (tags.length !== PatchPostDto.tags.length) {
        throw new BadRequestException('one of the Tags does not exist');
      }
    }
    //2. find the post
    let existingPost = await this.PostsRepository.findOneBy({
      id: PatchPostDto.id,
    });

    if (!existingPost) {
      throw new BadRequestException('Post does not exist');
    }

    //3. update new props
    existingPost.title = PatchPostDto.title ?? existingPost.title;
    existingPost.content = PatchPostDto.content ?? existingPost.content;
    existingPost.postType = PatchPostDto.postType ?? existingPost.postType;
    existingPost.featuredImageUrl =
      PatchPostDto.featuredImageUrl ?? existingPost.featuredImageUrl;
    existingPost.status = PatchPostDto.status ?? existingPost.status;
    existingPost.schema = PatchPostDto.schema ?? existingPost.schema;

    if (tags) {
      existingPost.tags = tags;
    }

    //4. save the post
    return await this.PostsRepository.save(existingPost);
  }
}

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
