import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { PostType } from './enums/postType.enum';
import { PostStatus } from './enums/postStatus.enum';
import { PostSEO } from 'src/posts_SEO/entity/posts_SEO.entity';

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

  @OneToOne(() => PostSEO, {
    cascade: true
  })
  @JoinColumn()
  seo: PostSEO;

  tags: string[];
}
