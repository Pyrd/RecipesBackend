import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { Role } from '~/core/authentication/role.enum';

export class UpdateUserRoleDTO {
  @IsNotEmpty()
  @IsNumber()
  userId: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
