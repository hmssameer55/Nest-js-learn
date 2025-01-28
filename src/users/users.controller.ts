import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  ParseIntPipe,
  DefaultValuePipe,
  Headers,
  Ip,
  ValidationPipe,
  Patch,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}
  @Get('/:id')
  public getUsers(
    @Param('id', ParseIntPipe) id: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ): string[] {
    return this.UsersService.getAllUsers(id, limit, page);
  }

  @Post()
  public createUsers(
    @Body() CreateUserDto: CreateUserDto,
    @Headers() headers: any,
    @Ip() ip: any,
  ) {
    console.log('body: ', CreateUserDto);
    return 'You sent a post request to users';
  }

  @Patch()
  public patchUsers(@Body() PatchUserDto: PatchUserDto) {
    console.log('body', PatchUserDto);
    return 'You sent a patch request to users';
  }
}
