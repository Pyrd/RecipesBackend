import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RecepieService } from './recepie.service';
import { CreateRecepieDto } from './dto/create-recepie.dto';
import { UpdateRecepieDto } from './dto/update-recepie.dto';
import { User } from '~/api/auth/user/entities/user.entity';
import { GetUser } from '~/core/authentication/auth.decorator';
import JwtAuthenticationGuard from '~/core/authentication/jwt-authentication.guard';

@Controller('recepie')
export class RecepieController {
  constructor(private readonly recepieService: RecepieService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  create(
    @Body() createRecepieDto: CreateRecepieDto,
    @GetUser() user: User,
    @Req() request,
  ) {
    createRecepieDto.author = user;

    return this.recepieService.create(createRecepieDto);
  }

  @Get()
  findAll() {
    return this.recepieService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query('addItems') val = false) {
    if (val) {
      const [recepie, items] = await Promise.all([
        this.recepieService.findOne(id),
        this.recepieService.findItemsOfOne(id),
      ]);
      recepie.items = items;
      return recepie;
    } else {
      return this.recepieService.findOne(id);
    }
  }

  @Get(':id/items')
  findItemsOfOne(@Param('id') id: string) {
    return this.recepieService.findItemsOfOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthenticationGuard)
  update(@Param('id') id: string, @Body() updateRecepieDto: UpdateRecepieDto) {
    return this.recepieService.update(id, updateRecepieDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard)
  remove(@Param('id') id: string) {
    return this.recepieService.remove(id);
  }
}
