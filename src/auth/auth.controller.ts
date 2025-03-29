import { Controller, Get, Body, Post, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-in')
  @HttpCode(200)
  public login(@Body() LoginUserDto: LoginUserDto) {
    return this.authService.login(LoginUserDto);
  }
}
