import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDTO } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDTO) {
  lastLogin?: Date;
  confirmationToken?: string;
  confirmed?: boolean;
}
