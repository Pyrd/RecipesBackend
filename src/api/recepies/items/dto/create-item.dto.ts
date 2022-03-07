import { CreateImageDto } from '~/api/common/images/dto/create-image.dto';

export class CreateItemDto {
  label_fr?: string;
  label_en?: string;
  letter: string;
  ingredient_url: string;
  images: CreateImageDto[];
}
