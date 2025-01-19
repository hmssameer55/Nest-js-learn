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

@Controller('users')
export class UsersController {
  @Get('/:id')
  public getUsers(
    @Param('id', ParseIntPipe) id: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    console.log(limit);
    console.log(page);
    return 'You sent a get request to users';
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
