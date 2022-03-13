import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import { AppModule } from './app.module';
import admin from 'firebase-admin';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  const configService: ConfigService = app.get(ConfigService);
  // logger.setContext('Server')
  const PORT = configService.get('port');
  const firebaseConfig = configService.get('firebase_admin');
  console.log('ok', firebaseConfig);
  await admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig.cert),
    storageBucket: firebaseConfig.storage_bucket,
  });

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  if (configService.get('swagger')) {
    const config = new DocumentBuilder()
      .setTitle('Recepies')
      .setVersion('0.1')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }
  const httpsConfig = configService.get('https');
  if (!httpsConfig.enable) {
    await app.listen(PORT);
    Logger.log(`App is ready on port ${PORT}`, 'Server');
  } else {
    await app.init();
    // console.log('HttpsConfig:', httpsConfig);
    // console.log('process.env.KEY_PATH:', process.env.KEY_PATH);
    const httpsOptions = {
      key: fs.readFileSync(
        `/certs/${httpsConfig.certPath}/privkey.pem`,
        'utf8',
      ),
      cert: fs.readFileSync(
        `/certs/${httpsConfig.certPath}/fullchain.pem`,
        'utf8',
      ),
      ca: fs.readFileSync(`/certs/${httpsConfig.certPath}/chain.pem`, 'utf8'),
    };
    http.createServer(server).listen(PORT);
    https.createServer(httpsOptions, server).listen(443);
    Logger.log(`App is ready on port ${PORT} and ${443}`, 'Server');
  }
}
bootstrap();
