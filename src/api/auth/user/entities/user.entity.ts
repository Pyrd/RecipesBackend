import { ApiProperty } from '@nestjs/swagger';
import { Receipe } from 'src/api/receipes/receipe/entities/receipe.entity';
import { Role } from 'src/core/auth/role.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  firstname: string;

  @ApiProperty()
  @Column()
  lastname: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column({ nullable: true })
  passwordHash: string;

  @ApiProperty()
  @Column()
  phone: string;



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
  confirmationToken: string;

  @Column({ default: false })
  disable: boolean;

  @OneToMany(() => Receipe, r => r.author)
  receipes: Receipe[]
}
