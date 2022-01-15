import { HttpModule, Module } from '@nestjs/common';
import { ItemsModule } from '../recepies/items/items.module';
import { InitController } from './init.controller';
import { InitService } from './init.service';

@Module({
  controllers: [InitController],
  providers: [InitService],
  imports: [HttpModule, ItemsModule],
})
export class InitModule {}
