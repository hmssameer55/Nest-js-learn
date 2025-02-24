import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
