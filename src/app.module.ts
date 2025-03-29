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
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    TagsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        entities: [User, Post, Tag, PostSEO], //no need to enter all the entities one by one here if autoLoadEntities is true and Typeorm.forfeature is added in all module imports
        autoLoadEntities: true,
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: configService.get('DB_SYNC'), //automatically does migrations keeps nestjs and db in sync
      }),
    }),
    // (async () => {
    //   const AdminJS = (await import('adminjs')).default;
    //   const { Database, Resource } = await import('@adminjs/typeorm');
    //   const { AdminModule } = await import('@adminjs/nestjs');
    //   const { ComponentLoader } = await import('adminjs');
    //   const importExportFeature = (await import('@adminjs/import-export'))
    //     .default;

    //   AdminJS.registerAdapter({ Resource, Database });

    //   const loader = new ComponentLoader();

    //   return AdminModule.createAdminAsync({
    //     useFactory: () => ({
    //       adminJsOptions: {
    //         rootPath: '/admin',
    //         componentLoader: loader,
    //         branding: {
    //           companyName: 'NestJS Admin Panel',
    //           // logo: 'http://localhost:3000/static/logo.png', // ✅ Or any external logo
    //           // favicon: 'http://localhost:3000/static/favicon.ico', // Optional
    //           withMadeWithLove: false, // Optional
    //         },

    //         resources: [
    //           {
    //             resource: User,
    //             features: [importExportFeature({ componentLoader: loader })],
    //           },
    //           {
    //             resource: Post,
    //             options: {
    //               properties: {
    //                 title: {
    //                   isTitle: true,
    //                   isSearchable: true,
    //                 },
    //                 content: {
    //                   type: 'richtext', // Optional - shows rich editor UI
    //                 },
    //               },
    //             },
    //             features: [importExportFeature({ componentLoader: loader })],
    //           },

    //           {
    //             resource: Tag,
    //             features: [importExportFeature({ componentLoader: loader })],
    //           },
    //         ],
    //       },
    //     }),
    //   });
    // })(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
