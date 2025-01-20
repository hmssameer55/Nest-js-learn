import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  greetAllUsers(): string {
    return 'Hello users john, cena, miz';
  }
}
