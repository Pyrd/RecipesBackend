import { Injectable } from '@nestjs/common';
import { UserService } from 'src/api/auth/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/api/auth/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) { }

  async validateUser(email: string, password: string) {
    console.log(password, email);
    const retrieved = await this.userRepo.findOne({ email: email }); // this.userService.findOne(email);

    if (!retrieved) {
      return null;
    }
    console.log(retrieved.passwordHash);
    const bcryptResult = bcrypt.compareSync(password, retrieved.passwordHash);

    if (bcryptResult && retrieved) {
      const { passwordHash, ...user } = retrieved;
      return user;
    }
    return null;
  }

  async login(user: any) {
    this.userRepo.update(user.id, {
      lastLogin: new Date(),
    });
    return {
      access_token: this.jwtService.sign(user),
      user: user,
    };
  }
}
