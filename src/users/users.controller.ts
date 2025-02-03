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
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUserParamDto } from './dtos/get-user-param.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Get('/:id?')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'The users have been successfully retrieved.',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: 'number',
    description: 'The number of items to return',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: 'number',
    description: 'The page number',
    example: 1,
  })
  public getUsers(
    @Param() GetUserParamDto: GetUserParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
  ): string[] {
    return this.UsersService.getAllUsers(GetUserParamDto, limit, page);
  }

  @Post()
  public createUsers(
    @Body() CreateUserDto: CreateUserDto,
    @Headers() headers: any,
    @Ip() ip: any,
  ) {
    // console.log('body: ', CreateUserDto);
    return 'You sent a post request to users';
  }

  @Patch()
  public patchUsers(@Body() PatchUserDto: PatchUserDto) {
    // console.log('body', PatchUserDto);
    return 'You sent a patch request to users';
  }
}
