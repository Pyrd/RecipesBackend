import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmUserDTO {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
