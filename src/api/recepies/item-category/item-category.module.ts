import { Module } from '@nestjs/common';
import { ItemCategoryService } from './item-category.service';
import { ItemCategoryController } from './item-category.controller';
import { ItemCategory } from './entities/item-category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ItemCategoryController],
  imports: [TypeOrmModule.forFeature([ItemCategory])],
  exports: [ItemCategoryService],
  providers: [ItemCategoryService],
})
export class ItemCategoryModule {}
