import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  public getAllUsers(id: number, limit: number, page: number): any {
    const isAuth = this.authService.IsAuth();

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

    if (isAuth) {
      return users;
    } else {
      return 'You are not authenticated';
    }
  }

  getUser(id: number) {
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
    return users.find((user) => user.id === id);
  }
}
