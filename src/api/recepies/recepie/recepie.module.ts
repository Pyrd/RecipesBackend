import { Module } from '@nestjs/common';
import { RecepieService } from './recepie.service';
import { RecepieController } from './recepie.controller';
import { Recepie } from './entities/recepie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [RecepieController],
  imports: [TypeOrmModule.forFeature([Recepie])],

  providers: [RecepieService]
})
export class RecepieModule { }
