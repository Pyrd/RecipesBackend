import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Image } from '../../../common/images/entities/image.entity';
import { ItemTypes } from '../../shared/item-types.enum';

@Entity()
export class Item {
  @ApiProperty()
  @PrimaryGeneratedColumn('rowid')
  id: string;

  @ApiProperty()
  @Column({
    nullable: true,
  })
  label_en: string;
  @ApiProperty()
  @Column({
    nullable: true,
  })
  label_fr: string;

  @Column({
    nullable: true,
  })
  code: string;

  @ApiProperty()
  @Index()
  @Column({
    nullable: false,
  })
  letter: string;

  @ApiProperty()
  @Column()
  ingredient_url: string;

  @ApiProperty()
  @ManyToMany(() => Image, { cascade: true, eager: true })
  @JoinTable()
  images: Image[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
