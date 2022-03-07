import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Image } from '../../../common/images/entities/image.entity';
import { Item } from '../../items/entities/item.entity';

@Entity()
export class Instruction {
  // @ApiProperty()
  // @PrimaryGeneratedColumn('uuid')
  // id: string;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  description: string;

  // @ApiProperty()
  // @ManyToMany(() => Image)
  // @JoinTable()
  // images: Image[];
}
