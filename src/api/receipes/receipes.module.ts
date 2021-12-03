import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { ReceipeModule } from './receipe/receipe.module';
import { InstructionsModule } from './instructions/instructions.module';
import { TagsModule } from './tags/tags.module';
import { ItemCategoryModule } from './item-category/item-category.module';

@Module({
    imports: [ItemsModule, ReceipeModule, InstructionsModule, TagsModule, ItemCategoryModule,]
})
export class ReceipesModule { }
