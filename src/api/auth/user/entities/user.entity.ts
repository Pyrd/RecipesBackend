import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Recepie } from 'src/api/recepies/recepie/entities/recepie.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '~/core/auth/role.enum';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryColumn()
  id: string;

  @ApiProperty()
  @Column()
  firebaseUid: string;

  @ApiProperty()
  @Column()
  displayname: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column()
  gender: string;

  @ApiProperty()
  @Column({
    default: Role.DEFAULT_USER,
    nullable: false,
  })
  role: Role;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  lastLogin: Date;

  @Column({ default: false })
  confirmed: boolean;

  @Column({ nullable: true, unique: true })
  @Exclude()
  confirmationToken: string;

  @Column({ default: false })
  disable: boolean;

  @OneToMany(() => Recepie, (r) => r.author)
  recepies: Recepie[];
}
