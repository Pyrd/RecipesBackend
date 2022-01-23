import { ApiProperty } from '@nestjs/swagger';
import { userInfo } from 'os';
import { User } from 'src/api/auth/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Image } from '../../../common/images/entities/image.entity';
import { Instruction } from '../../instructions/entities/instruction.entity';
import { Item } from '../../items/entities/item.entity';
import { RecepieStatus } from '../../shared/recepie-status.enum';
import { Tag } from '../../tags/entities/tag.entity';
import { Metadata } from '../dto/metadata.dto';

@Entity()
export class Recepie {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  title: string;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  description: string;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  duration_label: string;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  duration_unit: string;

  @ApiProperty()
  @Column({
    type: 'jsonb',
    nullable: false,
  })
  instructions: Instruction[];

  @ApiProperty()
  @ManyToMany(() => Item)
  @JoinTable()
  items: Item[];

  @ApiProperty()
  @Column({
    type: 'jsonb',
    nullable: false,
  })
  metadata: Metadata[];

  @ApiProperty()
  @ManyToOne(() => User, (u) => u.recepies)
  author: User;

  @ApiProperty()
  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];

  @ApiProperty()
  @ManyToMany(() => Image)
  @JoinTable()
  images: Image[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  status: RecepieStatus;
}
