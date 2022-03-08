import { Module } from '@nestjs/common';
import { RecepieService } from './recepie.service';
import { RecepieController } from './recepie.controller';
import { Recepie } from './entities/recepie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from '../items/items.module';

@Module({
  controllers: [RecepieController],
  imports: [TypeOrmModule.forFeature([Recepie]), ItemsModule],

  providers: [RecepieService],
})
export class RecepieModule {}
