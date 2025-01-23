import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  getAllPosts(id: number) {
    return [{ title: `Post ${id}`, content: 'This is a post' }];
  }
}
