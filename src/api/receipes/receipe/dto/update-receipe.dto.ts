import { PartialType } from '@nestjs/swagger';
import { CreateReceipeDto } from './create-receipe.dto';

export class UpdateReceipeDto extends PartialType(CreateReceipeDto) {}
