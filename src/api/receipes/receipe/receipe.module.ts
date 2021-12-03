import { Module } from '@nestjs/common';
import { ReceipeService } from './receipe.service';
import { ReceipeController } from './receipe.controller';
import { Receipe } from './entities/receipe.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ReceipeController],
  imports: [TypeOrmModule.forFeature([Receipe])],

  providers: [ReceipeService]
})
export class ReceipeModule { }
