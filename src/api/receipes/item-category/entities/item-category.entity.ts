import { ApiProperty } from '@nestjs/swagger';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany, PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { Image } from '../../../common/images/entities/image.entity';

@Entity()
export class ItemCategory {
    @ApiProperty()
    @PrimaryGeneratedColumn('rowid')
    id: string;

    @ApiProperty()
    @Column({
        nullable: false,
    })
    label: string

    @ApiProperty()
    @Column({
        nullable: false,
    })
    description: string

    @ApiProperty()
    @ManyToMany(() => Image)
    @JoinTable()
    images: Image[]

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;
}
