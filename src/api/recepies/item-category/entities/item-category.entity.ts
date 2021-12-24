import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Image } from '../../../common/images/entities/image.entity';
import { Item } from '../../items/entities/item.entity';

@Entity()
export class ItemCategory {
  @ApiProperty()
  @PrimaryColumn()
  id: string;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  label: string;

  @ApiProperty()
  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Item, (r) => r.category)
  items: Item[];

  @ApiProperty()
  @ManyToMany(() => Image)
  @JoinTable()
  images: Image[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
