import { INestApplication } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
// import { AuthGuard } from '@nestjs/passport';
import { AppModule } from './app.module';

export async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);
  //   const appConfig: ConfigService = app.get('ConfigService');

  //   if (appConfig.get('authEnabled') === 'true') {
  //     app.useGlobalGuards(new (AuthGuard(AZURE_STRATEGY_NAME))());
  //   }
  //if (appConfig.get('roleEnabled') == 'true') app.useGlobalGuards(new RolesGuard(new Reflector(), appConfig));

  app.enableCors();
  app.setGlobalPrefix('api');

  //   const logger: ILoggerService = app.get('LoggerService');
  //   app.useLogger(logger);

  await app.init();
  console.log(`Application Started on Azure`);
  return app;
}
