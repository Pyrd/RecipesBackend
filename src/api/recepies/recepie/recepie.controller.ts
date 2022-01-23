import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RecepieService } from './recepie.service';
import { CreateRecepieDto } from './dto/create-recepie.dto';
import { UpdateRecepieDto } from './dto/update-recepie.dto';

@Controller('recepie')
export class RecepieController {
  constructor(private readonly recepieService: RecepieService) {}

  @Post()
  create(@Body() createRecepieDto: CreateRecepieDto) {
    return this.recepieService.create(createRecepieDto);
  }

  @Get()
  findAll() {
    return this.recepieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recepieService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecepieDto: UpdateRecepieDto) {
    return this.recepieService.update(id, updateRecepieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recepieService.remove(id);
  }
}
