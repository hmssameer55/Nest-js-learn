import {
  Injectable,
  Inject,
  forwardRef,
  BadRequestException,
  RequestTimeoutException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { GetUserParamDto } from './dtos/get-user-param.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, DataSource } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersCreateManyProvider } from './providers/users-create-many.providers';
import { CreateManyUsersDto } from './dtos/create-many-users.dto';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindUserByEmailProvider } from './providers/find-user-by-email.provider';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    @InjectRepository(User)
    private readonly UsersRepository: Repository<User>,

    private readonly usersCreateManyProvider: UsersCreateManyProvider,

    private readonly createUserProvider: CreateUserProvider,

    private readonly findUserByEmailProvider: FindUserByEmailProvider,
  ) {}

  public async createUser(CreateUserDto: CreateUserDto) {
    return this.createUserProvider.createUser(CreateUserDto);
  }

  public async createManyUser(createManyUsersDto: CreateManyUsersDto) {
    return await this.usersCreateManyProvider.createMany(createManyUsersDto);
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

    if (!user) {
      throw new BadRequestException('user does not exist');
    }

    return user;
  }

  public async findUserByEmail(email: string) {
    return await this.findUserByEmailProvider.findUserByEmail(email);
  }
}
