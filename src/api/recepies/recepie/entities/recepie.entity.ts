import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/api/auth/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Image } from '../../../common/images/entities/image.entity';
import { RecepieAccess } from '../../shared/recepie-access.enum';
import { RecepieCookType } from '../../shared/recepie-cook-type.enum';
import { RecepieStatus } from '../../shared/recepie-status.enum';
import { RecepieType } from '../../shared/recepie-type.enum';
import { Tags } from '../../shared/tag.enum';

@Entity()
export class Recepie {
  @ApiProperty()
  @PrimaryColumn()
  id: string;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  name: string;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  description: string;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  person_count: number;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  person_count_unit: string;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  difficulty: number;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  cost: number;
  @ApiProperty()
  @Column({
    nullable: true,
  })
  type: RecepieType;

  @ApiProperty()
  @Column({
    nullable: true,
  })
  cook_type: RecepieCookType;

  @ApiProperty()
  @Column({
    nullable: true,
  })
  total_duration: number;

  @ApiProperty()
  @Column({
    type: 'jsonb',
    nullable: true,
  })
  duration: {
    estimated_prepare_time: number;
    estimated_cook_time: number;
    estimated_rest_time: number;
  };

  @ApiProperty()
  @Column({
    type: 'simple-array',
    nullable: false,
  })
  instructions: string[];

  @ApiProperty()
  @Column({
    type: 'jsonb',
    nullable: false,
  })
  items: Array<{
    item_id: number;
    count: number;
    unit: string;
    complement: string;
  }>;

  @ApiProperty()
  @ManyToOne(() => User, (u) => u.recepies, { nullable: true })
  @JoinTable()
  author: User;

  @ApiProperty()
  @Column({ type: 'simple-array', nullable: true })
  tags: Tags[];

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
  @ApiProperty()
  @Column({
    nullable: false,
  })
  access: RecepieAccess;
}
