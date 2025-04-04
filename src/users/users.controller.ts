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
import { CreateManyUsersDto } from './dtos/create-many-users.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Get()
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

  @Get('/:id')
  @ApiOperation({ summary: 'Get user' })
  public getUser(@Param('id', ParseIntPipe) id: number) {
    return this.UsersService.getUser(id);
  }

  @Post()
  public createUsers(
    @Body() CreateUserDto: CreateUserDto,
    @Headers() headers: any,
    @Ip() ip: any,
  ) {
    // return 'You sent a post request to users';
    return this.UsersService.createUser(CreateUserDto);
  }

  @Post('create-many')
  public createManyUsers(@Body() createManyUsersDto: CreateManyUsersDto) {
    // return 'You sent a post request to users';
    return this.UsersService.createManyUser(createManyUsersDto);
  }

  @Patch()
  public patchUsers(@Body() PatchUserDto: PatchUserDto) {
    // console.log('body', PatchUserDto);
    return 'You sent a patch request to users';
  }
}
