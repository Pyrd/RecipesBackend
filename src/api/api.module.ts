import { Module } from '@nestjs/common';
import { UserModule } from './auth/user/user.module';
import { ItemsModule } from './receipes/items/items.module';
import { ReceipeModule } from './receipes/receipe/receipe.module';
import { ReceipesModule } from './receipes/receipes.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [ReceipesModule, AuthModule, CommonModule],
})
export class ApiModule { }
