import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReceipeService } from './receipe.service';
import { CreateReceipeDto } from './dto/create-receipe.dto';
import { UpdateReceipeDto } from './dto/update-receipe.dto';

@Controller('receipe')
export class ReceipeController {
  constructor(private readonly receipeService: ReceipeService) { }

  @Post()
  create(@Body() createReceipeDto: CreateReceipeDto) {
    return this.receipeService.create(createReceipeDto);
  }

  @Get()
  findAll() {
    return this.receipeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.receipeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReceipeDto: UpdateReceipeDto) {
    return this.receipeService.update(id, updateReceipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.receipeService.remove(id);
  }
}
