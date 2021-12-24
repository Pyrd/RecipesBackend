import { HttpModule, Module } from '@nestjs/common';
import { ItemCategoryModule } from '../recepies/item-category/item-category.module';
import { ItemsModule } from '../recepies/items/items.module';
import { InitController } from './init.controller';
import { InitService } from './init.service';

@Module({
  controllers: [InitController],
  providers: [InitService],
  imports: [HttpModule, ItemsModule, ItemCategoryModule],
})
export class InitModule {}
