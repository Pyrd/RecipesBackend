import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { auth } from 'firebase-admin';
import { Repository } from 'typeorm';
import { User } from '~/api/auth/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  verifyJwt(jwt: string): Promise<auth.DecodedIdToken> {
    return auth().verifyIdToken(jwt);
  }

  getUserFromJwt(uid): Promise<User> {
    return this.userRepository.findOne({ firebaseUid: uid });
  }

  createUserFromFirebase(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
