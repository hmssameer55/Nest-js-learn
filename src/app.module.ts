import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Post } from './posts/post.entity';
import { Tag } from './tags/entity/tags.entity';
import { PostSEO } from './posts_SEO/entity/posts_SEO.entity';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    TagsModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: async () => ({
        entities: [User, Post, Tag, PostSEO], //no need to enter all the entities one by one here if autoLoadEntities is true and Typeorm.forfeature is added in all module imports
        autoLoadEntities: true,
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
export class AppModule { }

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
