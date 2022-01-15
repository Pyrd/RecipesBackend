import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '~/api/recepies/items/entities/item.entity';
import { CreateImageDto } from './dto/create-image.dto';
import { Image } from './entities/image.entity';

@Injectable()
export class ImagesService {
  logger = new Logger(ImagesService.name);
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async createEntity(createItemDto: CreateImageDto) {
    return this.imageRepository.create(createItemDto);
  }

  async create(createItemDto: CreateImageDto) {
    const entity = this.imageRepository.create(createItemDto);
    const item = await this.imageRepository.save(entity).catch((err) => {
      console.error(err);
      throw new InternalServerErrorException('Failed to save item !');
    });

    return item;
  }

  async findAll() {
    const items = await this.imageRepository.find().catch(() => {
      throw new InternalServerErrorException('Failed to find all !');
    });
    return items;
  }
}
