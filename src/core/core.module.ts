import { ClassSerializerInterceptor, Logger, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { HttpExceptionsFilter } from './error-handler/http-exception.filter';
import { FirebaseStorageModule } from './firebase-storage/firebase-storage.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [DatabaseModule, AuthModule, FirebaseStorageModule, MailModule],
  exports: [AuthModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
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
