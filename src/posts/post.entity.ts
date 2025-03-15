import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { PostType } from './enums/postType.enum';
import { PostStatus } from './enums/postStatus.enum';
import { PostSEO } from 'src/posts_SEO/entity/posts_SEO.entity';
import { User } from 'src/users/user.entity';
import { Tag } from 'src/tags/entity/tags.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'enum',
    enum: PostType,
    nullable: false,
    default: PostType.POST,
  })
  postType: PostType;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  slug: string;

  @Column({
    type: 'enum',
    enum: PostStatus,
    nullable: false,
    default: PostStatus.DRAFT,
  })
  status: PostStatus;

  @Column({
    type: 'text',
    nullable: true,
  })
  content: string;

  @Column({
    type: 'varchar',
    length: 25,
    nullable: true,
  })
  schema: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  featuredImageUrl: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  publishedAt: Date;

  @OneToOne(() => PostSEO, (postSeo) => postSeo.post, {
    cascade: true, // to save the seo when we save the post
    // eager: true, //eager means when we fetch the post the seo will also be fetched
  })
  seo: PostSEO;

  @ManyToOne(() => User, (user) => user.posts, {
    // eager: true // to fetch the author when we fetch the post
  })
  author: User;

  @ManyToMany(() => Tag, (tag)=> tag.posts)
  @JoinTable()
  tags: Tag[];
}
