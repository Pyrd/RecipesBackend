import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemCategoryDto } from './dto/create-item-category.dto';
import { UpdateItemCategoryDto } from './dto/update-item-category.dto';
import { ItemCategory } from './entities/item-category.entity';

@Injectable()
export class ItemCategoryService {
  logger = new Logger(ItemCategoryService.name)
  constructor(@InjectRepository(ItemCategory) private readonly itemCategoryRepository: Repository<ItemCategory>,
  ) {

  }

  async create(CreateItemCategoryDto: CreateItemCategoryDto) {
    const entity = this.itemCategoryRepository.create(CreateItemCategoryDto)
    const itemCategory = await this.itemCategoryRepository.save(entity).catch(() => {
      throw new InternalServerErrorException('Failed to save itemCategory !')
    });

    return itemCategory
  }

  async findAll() {
    const itemCategorys = await this.itemCategoryRepository.find().catch(() => {
      throw new InternalServerErrorException('Failed to find all !')
    });
    return itemCategorys;
  }

  async findOne(id: string) {
    const itemCategory = await this.itemCategoryRepository.findOne(id).catch(() => {
      throw new InternalServerErrorException(`Failed to find itemCategory id: ${id} !`)
    });
    return itemCategory
  }

  async update(id: string, UpdateItemCategoryDto: UpdateItemCategoryDto) {
    const entity = this.itemCategoryRepository.create(UpdateItemCategoryDto);
    entity.id = id
    const itemCategory = await this.itemCategoryRepository.save(UpdateItemCategoryDto).catch(() => {
      throw new InternalServerErrorException(`Failed to update itemCategory id: ${id} !`)
    });
    return itemCategory
  }

  async remove(id: string) {
    await this.itemCategoryRepository.delete(id).catch(() => {
      throw new InternalServerErrorException(`Failed to delete itemCategory id: ${id} !`)
    });
    return { message: 'SUCCESS' }
  }
}
