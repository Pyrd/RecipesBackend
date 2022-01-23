import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInstructionDto } from './dto/create-instruction.dto';
import { UpdateInstructionDto } from './dto/update-instruction.dto';
import { Instruction } from './entities/instruction.entity';

@Injectable()
export class InstructionsService {
  // logger = new Logger(InstructionsService.name)
  // constructor(@InjectRepository(Instruction) private readonly instructionRepository: Repository<Instruction>,
  // ) {
  // }
  // async create(createInstructionDto: CreateInstructionDto) {
  //   const entity = this.instructionRepository.create(createInstructionDto)
  //   const instruction = await this.instructionRepository.save(entity).catch(() => {
  //     throw new InternalServerErrorException('Failed to save instruction !')
  //   });
  //   return instruction
  // }
  // async findAll() {
  //   const instructions = await this.instructionRepository.find().catch(() => {
  //     throw new InternalServerErrorException('Failed to find all !')
  //   });
  //   return instructions;
  // }
  // async findOne(id: string) {
  //   const instruction = await this.instructionRepository.findOne(id).catch(() => {
  //     throw new InternalServerErrorException(`Failed to find instruction id: ${id} !`)
  //   });
  //   return instruction
  // }
  // async update(id: string, updateInstructionDto: UpdateInstructionDto) {
  //   const entity = this.instructionRepository.create(updateInstructionDto);
  //   entity.id = id
  //   const instruction = await this.instructionRepository.save(updateInstructionDto).catch(() => {
  //     throw new InternalServerErrorException(`Failed to update instruction id: ${id} !`)
  //   });
  //   return instruction
  // }
  // async remove(id: string) {
  //   await this.instructionRepository.delete(id).catch(() => {
  //     throw new InternalServerErrorException(`Failed to delete instruction id: ${id} !`)
  //   });
  //   return { message: 'SUCCESS' }
  // }
}
