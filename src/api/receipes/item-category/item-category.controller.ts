import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemCategoryService } from './item-category.service';
import { CreateItemCategoryDto } from './dto/create-item-category.dto';
import { UpdateItemCategoryDto } from './dto/update-item-category.dto';

@Controller('item-category')
export class ItemCategoryController {
  constructor(private readonly itemCategoryService: ItemCategoryService) { }

  @Post()
  create(@Body() createItemCategoryDto: CreateItemCategoryDto) {
    return this.itemCategoryService.create(createItemCategoryDto);
  }

  @Get()
  findAll() {
    return this.itemCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemCategoryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemCategoryDto: UpdateItemCategoryDto) {
    return this.itemCategoryService.update(id, updateItemCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemCategoryService.remove(id);
  }
}
