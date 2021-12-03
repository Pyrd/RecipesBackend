import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateUserTenantDTO {
  @IsNotEmpty()
  @IsNumber()
  userId: string;

  @IsNotEmpty()
  @IsNumber()
  tenantId: number;
}
