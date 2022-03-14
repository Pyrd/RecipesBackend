import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Role } from '~/core/auth/role.enum';

export class CreateUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  gender: string;

  @IsString()
  displayname: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsNumber()
  @IsOptional()
  tenantId: number;

  @IsEnum(Role)
  @IsOptional()
  role: Role;
}
