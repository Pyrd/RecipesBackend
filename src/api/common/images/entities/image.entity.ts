import { ApiProperty } from '@nestjs/swagger';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Image {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty()
    @Column({
        nullable: false,
    })
    size: number;
    @ApiProperty()
    @Column({
        nullable: false,
    })
    mimetype: string;
    @ApiProperty()
    @Column({
        nullable: false,
    })
    url: string;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;


}
