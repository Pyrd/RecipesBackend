import { Module } from '@nestjs/common';
import { InstructionsService } from './instructions.service';
import { InstructionsController } from './instructions.controller';
import { Instruction } from './entities/instruction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [InstructionsController],
  imports: [TypeOrmModule.forFeature([Instruction])],

  providers: [InstructionsService]
})
export class InstructionsModule { }
