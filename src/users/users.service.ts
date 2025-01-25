import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  greetAllUsers(id: number, limit: number, page: number): string[] {
    return ['Hello', 'World'];
  }

  getUser(id: number): string {
    const users = [
      {
        id: 1,
        name: 'John Doe',
        email: 'example@gmail.com',
      },
      {
        id: 2,
        name: 'cena Doe',
        email: 'example@gmail.com',
      },
    ];
    return users.find((user) => user.id === id).name;
  }
}
