import { Module } from '@nestjs/common';
import { UserModule } from './auth/user/user.module';
import { ItemsModule } from './recepies/items/items.module';
import { RecepieModule } from './recepies/recepie/recepie.module';
import { RecepiesModule } from './recepies/recepies.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { InitModule } from './init/init.module';

@Module({
  imports: [RecepiesModule, AuthModule, CommonModule, InitModule],
})
export class ApiModule { }
