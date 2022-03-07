import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '~/core/authentication/role.enum';

export class UpdateUserRoleDTO {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
