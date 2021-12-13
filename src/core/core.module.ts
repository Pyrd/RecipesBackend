import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { DatabaseModule } from './database/database.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [DatabaseModule, AuthenticationModule, MailModule],
  exports: [AuthenticationModule],
})
export class CoreModule {}
