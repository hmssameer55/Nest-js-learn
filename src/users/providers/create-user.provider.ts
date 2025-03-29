import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { HashingProvider } from 'src/auth/providers/hashing.provider';

@Injectable()
export class CreateUserProvider {
  constructor(
    @InjectRepository(User)
    private readonly UsersRepository: Repository<User>,

    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
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

    let hashedPassword = await this.hashingProvider.hashPassword(
      CreateUserDto.password,
    );

    let newUser = this.UsersRepository.create({
      ...CreateUserDto,
      password: hashedPassword,
    });
    newUser = await this.UsersRepository.save(newUser);
    return newUser;
  }
}
