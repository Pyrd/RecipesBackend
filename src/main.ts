import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig: ConfigService = app.get('ConfigService');
  const PORT = appConfig.get('appPort');

  // if (appConfig.get('authEnabled') === 'true') {
  //   app.useGlobalGuards(new (AuthGuard(AZURE_STRATEGY_NAME))());
  // }
  //if (appConfig.get('roleEnabled') == 'true') app.useGlobalGuards(new RolesGuard(new Reflector(), appConfig));

  app.enableCors();
  app.setGlobalPrefix('api');

  await app.listen(PORT);
  console.log(
    `Application Started on port ${PORT} (Environnement: ${appConfig.get(
      'appEnv',
    )} )`,
  );
}
bootstrap();
