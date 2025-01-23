import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  greetAllUsers(id: number, limit: number, page: number): string[] {
    return ['Hello', 'World'];
  }
}
