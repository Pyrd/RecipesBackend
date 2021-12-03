import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  logger = new Logger(ItemsService.name)
  constructor(@InjectRepository(Item) private readonly itemRepository: Repository<Item>,
  ) {

  }

  async create(createItemDto: CreateItemDto) {
    const entity = this.itemRepository.create(createItemDto)
    const item = await this.itemRepository.save(entity).catch(() => {
      throw new InternalServerErrorException('Failed to save item !')
    });

    return item
  }

  async findAll() {
    const items = await this.itemRepository.find().catch(() => {
      throw new InternalServerErrorException('Failed to find all !')
    });
    return items;
  }

  async findOne(id: string) {
    const item = await this.itemRepository.findOne(id).catch(() => {
      throw new InternalServerErrorException(`Failed to find item id: ${id} !`)
    });
    return item
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    const entity = this.itemRepository.create(updateItemDto);
    entity.id = id
    const item = await this.itemRepository.save(updateItemDto).catch(() => {
      throw new InternalServerErrorException(`Failed to update item id: ${id} !`)
    });
    return item
  }

  async remove(id: string) {
    await this.itemRepository.delete(id).catch(() => {
      throw new InternalServerErrorException(`Failed to delete item id: ${id} !`)
    });
    return { message: 'SUCCESS' }
  }
}
