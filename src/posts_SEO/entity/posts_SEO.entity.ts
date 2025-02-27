import { Post } from 'src/posts/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class PostSEO {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 160, nullable: false })
    metaTitle: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    metaDescription: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    metaKeywords: string;

    @OneToOne(() => Post, (post: Post) => post.seo, { onDelete: 'CASCADE' })
    @JoinColumn()
    post: Post;
}
