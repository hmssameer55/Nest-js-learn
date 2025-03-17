import {
  BadRequestException,
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { DataSource } from 'typeorm';
import { User } from '../user.entity';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';

@Injectable()
export class UsersCreateManyProvider {
  constructor(private readonly datasource: DataSource) {}

  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    let users: User[] = [];

    //create Query Runner Instace
    const queryRunner = this.datasource.createQueryRunner();

    try {
      //connect Query Runner to data source
      await queryRunner.connect();
      //start Transaction
      await queryRunner.startTransaction();
    } catch (error) {
      throw new RequestTimeoutException('Error in connecting to DB');
    }

    try {
      for (let user of createManyUsersDto.users) {
        let newUser = queryRunner.manager.create(User, user);
        let result = await queryRunner.manager.save(newUser);
        users.push(result);
      }

      await queryRunner.commitTransaction();

      //if successful commit
    } catch (error) {
      //if unsuccessful rollback
      await queryRunner.rollbackTransaction();
      throw new ConflictException('could not complete the transaction', {
        description: String(error),
      });
    } finally {
      //release connection
      await queryRunner.release();
    }

    return users;
  }
}
