import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Image } from '../../../common/images/entities/image.entity';
import { ItemCategory } from '../../item-category/entities/item-category.entity';
import { ItemTypes } from '../../shared/item-types.enum';

@Entity()
export class Item {
  @ApiProperty()
  @PrimaryColumn()
  id: string;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  code: string;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  label: string;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  description: string;

  // @ApiProperty()
  // @Column({
  //   nullable: false,
  // })
  // category: ItemCategory;

  @ApiProperty()
  @ManyToOne(() => ItemCategory, (u) => u.items, { eager: true })
  category: ItemCategory;

  @ApiProperty()
  @Column()
  points: number;
  @ApiProperty()
  @Column()
  ingredient_url: string;
  @ApiProperty()
  @ManyToMany(() => Image)
  @JoinTable()
  images: Image[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
