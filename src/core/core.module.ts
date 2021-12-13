import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { DatabaseModule } from './database/database.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [DatabaseModule, AuthenticationModule, MailModule],
  exports: [AuthenticationModule],
})
export class CoreModule {}
