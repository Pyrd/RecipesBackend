import { Injectable } from '@nestjs/common';
import { CreateRecepieDto } from './dto/create-recepie.dto';
import { UpdateRecepieDto } from './dto/update-recepie.dto';

@Injectable()
export class RecepieService {
  create(createRecepieDto: CreateRecepieDto) {
    return 'This action adds a new recepie';
  }

  findAll() {
    return `This action returns all recepie`;
  }

  findOne(id: string) {
    return `This action returns a #${id} recepie`;
  }

  update(id: string, updateRecepieDto: UpdateRecepieDto) {
    return `This action updates a #${id} recepie`;
  }

  remove(id: string) {
    return `This action removes a #${id} recepie`;
  }
}
