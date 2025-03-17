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

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    @InjectRepository(User)
    private readonly UsersRepository: Repository<User>,

    private readonly usersCreateManyProvider: UsersCreateManyProvider,
  ) {}

  public async createUser(CreateUserDto: CreateUserDto) {
    let existingUser = undefined;

    try {
      existingUser = await this.UsersRepository.findOne({
        where: { email: CreateUserDto.email },
      });
    } catch (error) {
      throw new RequestTimeoutException('connection to db failed');
    }

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    let newUser = this.UsersRepository.create(CreateUserDto);
    newUser = await this.UsersRepository.save(newUser);
    return newUser;
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
}
