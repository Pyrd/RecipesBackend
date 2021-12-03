import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { Ingredient } from './entities/ingredient.entity';

@Injectable()
export class IngredientsService {
  logger = new Logger(IngredientsService.name)
  constructor(@InjectRepository(Ingredient) private readonly itemRepository: Repository<Ingredient>,
  ) {

  }

  async create(createIngredientDto: CreateIngredientDto) {
    const entity = this.itemRepository.create(createIngredientDto)
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

  async update(id: string, updateIngredientDto: UpdateIngredientDto) {
    const entity = this.itemRepository.create(updateIngredientDto);
    entity.id = id
    const item = await this.itemRepository.save(updateIngredientDto).catch(() => {
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
