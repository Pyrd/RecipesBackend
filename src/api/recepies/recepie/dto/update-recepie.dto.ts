import { PartialType } from '@nestjs/swagger';
import { CreateRecepieDto } from './create-recepie.dto';

export class UpdateRecepieDto extends PartialType(CreateRecepieDto) { }
