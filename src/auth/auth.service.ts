import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  public login(username: string, password: string, id: number): any {
    return this.usersService.getUser(id);
  }

  public IsAuth(): boolean {
    return true;
  }
}
