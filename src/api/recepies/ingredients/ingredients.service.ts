import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { Ingredient } from './entities/ingredient.entity';

@Injectable()
export class IngredientsService {
  logger = new Logger(IngredientsService.name)
  constructor(@InjectRepository(Ingredient) private readonly ingredientRepository: Repository<Ingredient>,
  ) {

  }

  async create(createIngredientDto: CreateIngredientDto) {
    const entity = this.ingredientRepository.create(createIngredientDto)
    const ingredient = await this.ingredientRepository.save(entity).catch(() => {
      throw new InternalServerErrorException('Failed to save ingredient !')
    });

    return ingredient
  }

  async findAll() {
    const ingredients = await this.ingredientRepository.find().catch(() => {
      throw new InternalServerErrorException('Failed to find all !')
    });
    return ingredients;
  }

  async findOne(id: string) {
    const ingredient = await this.ingredientRepository.findOne(id).catch(() => {
      throw new InternalServerErrorException(`Failed to find ingredient id: ${id} !`)
    });
    return ingredient
  }

  async update(id: string, updateIngredientDto: UpdateIngredientDto) {
    const entity = this.ingredientRepository.create(updateIngredientDto);
    entity.id = id
    const ingredient = await this.ingredientRepository.save(updateIngredientDto).catch(() => {
      throw new InternalServerErrorException(`Failed to update ingredient id: ${id} !`)
    });
    return ingredient
  }

  async remove(id: string) {
    await this.ingredientRepository.delete(id).catch(() => {
      throw new InternalServerErrorException(`Failed to delete ingredient id: ${id} !`)
    });
    return { message: 'SUCCESS' }
  }
}
