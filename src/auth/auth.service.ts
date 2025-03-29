import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { SignInProvider } from './providers/sign-in.provider';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    private readonly signInProvider: SignInProvider,
  ) {}

  public login(loginUserDto: LoginUserDto) {
    return this.signInProvider.signIn(loginUserDto);
  }

  public IsAuth(): boolean {
    return true;
  }
}
