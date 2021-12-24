import { CreateItemCategoryDto } from '../../item-category/dto/create-item-category.dto';
import { ItemCategory } from '../../item-category/entities/item-category.entity';
import { ItemTypes } from '../../shared/item-types.enum';

export class CreateItemDto {
  id: string;
  label: string;
  code: string;
  points: number;
  ingredient_url: string;
  description: string;
  category: CreateItemCategoryDto;
}
