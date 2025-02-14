import { Controller, Get, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post()
  public login(@Body() LoginUserDto: LoginUserDto) {
    const { username, password, id } = LoginUserDto;
    return this.authService.login(username, password, id);
  }
}
