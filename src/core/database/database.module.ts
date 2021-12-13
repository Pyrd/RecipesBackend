import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '~/api/auth/user/entities/user.entity';
import { Ingredient } from '~/api/recepies/ingredients/entities/ingredient.entity';
import { Instruction } from '~/api/recepies/instructions/entities/instruction.entity';
import { Item } from '~/api/recepies/items/entities/item.entity';
import { Recepie } from '~/api/recepies/recepie/entities/recepie.entity';
import { Tag } from '~/api/recepies/tags/entities/tag.entity';
import { Image } from '~/api/common/images/entities/image.entity';

@Module({
  imports: [
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
          dropSchema: false,
          logging: false,
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
  ],
})
export class DatabaseModule {}
