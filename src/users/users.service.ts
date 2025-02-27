import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { GetUserParamDto } from './dtos/get-user-param.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    @InjectRepository(User)
    private UsersRepository: Repository<User>,
  ) { }

  public async createUser(CreateUserDto: CreateUserDto) {
    const existingUser = await this.UsersRepository.findOne({
      where: { email: CreateUserDto.email },
    });

    let newUser = this.UsersRepository.create(CreateUserDto);
    newUser = await this.UsersRepository.save(newUser);

    return newUser;
  }

  public getAllUsers(
    GetUserParamDto?: GetUserParamDto,
    limit?: number,
    page?: number,
  ): any {
    // console.log('GetUserParamDto: ', GetUserParamDto.id);
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

  public async getUser(id: number) {
    const user = await this.UsersRepository.findOneBy({ id });
    return user;
  }
}
