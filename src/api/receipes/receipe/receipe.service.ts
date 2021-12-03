import { Injectable } from '@nestjs/common';
import { CreateReceipeDto } from './dto/create-receipe.dto';
import { UpdateReceipeDto } from './dto/update-receipe.dto';

@Injectable()
export class ReceipeService {
  create(createReceipeDto: CreateReceipeDto) {
    return 'This action adds a new receipe';
  }

  findAll() {
    return `This action returns all receipe`;
  }

  findOne(id: string) {
    return `This action returns a #${id} receipe`;
  }

  update(id: string, updateReceipeDto: UpdateReceipeDto) {
    return `This action updates a #${id} receipe`;
  }

  remove(id: string) {
    return `This action removes a #${id} receipe`;
  }
}
