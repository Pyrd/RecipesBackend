import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Colors } from '../../shared/colors.enum';

@Entity()
export class Tag {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  label: string;

  @ApiProperty()
  @Column({
    default: Colors.BLUE,
    nullable: false,
  })
  color: Colors;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
