import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { CoreModule } from './core/core.module';
import { User } from './api/auth/user/entities/user.entity';
import configuration from './core/configuration/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recepie } from './api/recepies/recepie/entities/recepie.entity';
import { Tag } from './api/recepies/tags/entities/tag.entity';
import { Image } from './api/common/images/entities/image.entity';
import { Instruction } from './api/recepies/instructions/entities/instruction.entity';
import { ItemCategory } from './api/recepies/item-category/entities/item-category.entity';
import { Item } from './api/recepies/items/entities/item.entity';
import { Ingredient } from './api/recepies/ingredients/entities/ingredient.entity';

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
          entities: [User, Recepie, Ingredient, Item, Instruction, Tag, Image],
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
