import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { CoreModule } from './core/core.module';
import { User } from './api/auth/user/entities/user.entity';
import configuration from './core/configuration/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipe } from './api/receipes/receipe/entities/receipe.entity';
import { Tag } from './api/receipes/tags/entities/tag.entity';
import { Image } from './api/common/images/entities/image.entity';
import { Instruction } from './api/receipes/instructions/entities/instruction.entity';
import { ItemCategory } from './api/receipes/item-category/entities/item-category.entity';
import { Item } from './api/receipes/items/entities/item.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        const dbConf = config.get('database');
        return {
          type: 'postgres',
          host: dbConf.host,
          username: dbConf.username,
          database: dbConf.database,
          password: dbConf.password,
          port: dbConf.port,
          entities: [User, Receipe, Item, ItemCategory, Instruction, Tag, Image],
          synchronize: true,
          dropSchema: true,
          logging: true,
          // ssl: {
          //   ca: process.env.SSL_CERT,
          // },
          // ssl: false,
          // extra: {
          //   ssl: {
          //     rejectUnauthorized: false,
          //   },
          // },
        };
      },
      inject: [ConfigService],
    }),
    ApiModule,
    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
