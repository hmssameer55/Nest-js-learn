import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Post } from './posts/post.entity';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: async () => ({
        entities: [User, Post],
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '123456',
        database: 'nestjs',
        synchronize: true, //automatically does migrations keeps nestjs and db in sync
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

//use this if hardcoding the values
// TypeOrmModule.forRoot({
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: '123456',
//   database: 'nestjs',
//   entities: [],
//   synchronize: true,
// })
