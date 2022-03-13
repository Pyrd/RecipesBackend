import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '~/api/auth/user/entities/user.entity';
import { AuthService } from './auth.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [AuthService],
  providers: [AuthService],
})
export class AuthModule {}
