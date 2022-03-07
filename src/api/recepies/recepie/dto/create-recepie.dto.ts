import { User } from '~/api/auth/user/entities/user.entity';
import { RecepieAccess } from '../../shared/recepie-access.enum';
import { RecepieCookType } from '../../shared/recepie-cook-type.enum';
import { RecepieType } from '../../shared/recepie-type.enum';
import { Tags } from '../../shared/tag.enum';

export class CreateRecepieDto {
  name: string;
  description: string;
  tags: Tags[];
  author: User;
  instructions: string[];
  items: Array<{
    item_id: number;
    count: number;
    unit: string;
    complement: string;
  }>;
  access: RecepieAccess;
  type: RecepieType;
  cook_type: RecepieCookType;
  person_count: number;
  person_count_unit: string;
  total_duration: number;
  duration: {
    estimated_prepare_time: number;
    estimated_cook_time: number;
    estimated_rest_time: number;
  };
  difficulty: number;
  cost: number;
}
