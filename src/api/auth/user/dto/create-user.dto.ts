import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Role } from '~/core/authentication/role.enum';

export class CreateUserDTO {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsNumber()
  @IsOptional()
  tenantId: number;

  @IsEnum(Role)
  role: Role;
}
