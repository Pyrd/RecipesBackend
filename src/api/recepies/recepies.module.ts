import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { RecepieModule } from './recepie/recepie.module';
import { InstructionsModule } from './instructions/instructions.module';
import { TagsModule } from './tags/tags.module';
import { IngredientsModule } from './ingredients/ingredients.module';

@Module({
  imports: [
    ItemsModule,
    RecepieModule,
    InstructionsModule,
    TagsModule,
    IngredientsModule,
  ],
})
export class RecepiesModule {}
