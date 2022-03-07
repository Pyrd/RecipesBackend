import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecepieDto } from './dto/create-recepie.dto';
import { UpdateRecepieDto } from './dto/update-recepie.dto';
import { Recepie } from './entities/recepie.entity';

@Injectable()
export class RecepieService {
  logger = new Logger(RecepieService.name);
  constructor(
    @InjectRepository(Recepie)
    private readonly recepieRepository: Repository<Recepie>,
  ) {}

  async create(createRecepieDto: CreateRecepieDto) {
    const entity = this.recepieRepository.create(createRecepieDto);
    const recepie = await this.recepieRepository.save(entity).catch(() => {
      throw new InternalServerErrorException('Failed to save recepie !');
    });

    return recepie;
  }

  async findAll() {
    const recepies = await this.recepieRepository.find().catch(() => {
      throw new InternalServerErrorException('Failed to find all !');
    });
    return recepies;
  }

  async findOne(id: string) {
    const recepie = await this.recepieRepository.findOne(id).catch(() => {
      throw new InternalServerErrorException(
        `Failed to find recepie id: ${id} !`,
      );
    });
    return recepie;
  }

  async update(id: string, updateRecepieDto: UpdateRecepieDto) {
    const entity = this.recepieRepository.create(updateRecepieDto);
    entity.id = id;
    const recepie = await this.recepieRepository
      .save(updateRecepieDto)
      .catch(() => {
        throw new InternalServerErrorException(
          `Failed to update recepie id: ${id} !`,
        );
      });
    return recepie;
  }

  async remove(id: string) {
    await this.recepieRepository.delete(id).catch(() => {
      throw new InternalServerErrorException(
        `Failed to delete recepie id: ${id} !`,
      );
    });
    return { message: 'SUCCESS' };
  }
}
