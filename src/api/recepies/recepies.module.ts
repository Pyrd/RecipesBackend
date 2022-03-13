import { Module } from '@nestjs/common';
import { IngredientsModule } from './ingredients/ingredients.module';
import { ItemsModule } from './items/items.module';
import { RecepieModule } from './recepie/recepie.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [ItemsModule, RecepieModule, TagsModule, IngredientsModule],
})
export class RecepiesModule {}
