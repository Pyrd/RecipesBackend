import { Module } from '@nestjs/common';
import { UserModule } from './auth/user/user.module';
import { ItemsModule } from './recepies/items/items.module';
import { RecepieModule } from './recepies/recepie/recepie.module';
import { RecepiesModule } from './recepies/recepies.module';
import { CommonModule } from './common/common.module';
import { InitModule } from './init/init.module';
import { UserAuthModule } from './auth/auth.module';

@Module({
  imports: [RecepiesModule, UserAuthModule, CommonModule, InitModule],
})
export class ApiModule {}
