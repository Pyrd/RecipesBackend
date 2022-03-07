import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { RecepieService } from './recepie.service';
import { CreateRecepieDto } from './dto/create-recepie.dto';
import { UpdateRecepieDto } from './dto/update-recepie.dto';
import { User } from '~/api/auth/user/entities/user.entity';
import { GetUser } from '~/core/authentication/auth.decorator';

@Controller('recepie')
export class RecepieController {
  constructor(private readonly recepieService: RecepieService) {}

  @Post()
  create(@Body() createRecepieDto: CreateRecepieDto, @GetUser() user: User) {
    createRecepieDto.author = user;
    Logger.log(`>>>>>>>>>> ${JSON.stringify(user, null, 2)}`);
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
