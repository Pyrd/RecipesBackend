import { Logger, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AuthenticationModule } from './authentication/authentication.module';
import { DatabaseModule } from './database/database.module';
import { HttpExceptionsFilter } from './error-handler/http-exception.filter';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [DatabaseModule, AuthenticationModule, MailModule],
  exports: [AuthenticationModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionsFilter,
    },
  ],
})
export class CoreModule {
  constructor() {
    const logger = new Logger('SERVER');
    process.on('unhandledRejection', (reason) => {
      logger.error(`[unhandledRejection]: ${reason}`);
    });
    process.on('uncaughtException', (error) => {
      logger.error(`[uncaughtException]: ${error}/${error.stack}`);
    });
  }
}
