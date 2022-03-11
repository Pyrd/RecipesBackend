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
  ClassSerializerInterceptor,
  UseInterceptors,
  Res,
  UploadedFile,
  NotFoundException,
} from '@nestjs/common';
import { RecepieService } from './recepie.service';
import { CreateRecepieDto } from './dto/create-recepie.dto';
import { UpdateRecepieDto } from './dto/update-recepie.dto';
import { User } from '~/api/auth/user/entities/user.entity';
import { GetUser } from '~/core/authentication/auth.decorator';
import JwtAuthenticationGuard from '~/core/authentication/jwt-authentication.guard';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Readable } from 'typeorm/platform/PlatformTools';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('recepie')
export class RecepieController {
  constructor(private readonly recepieService: RecepieService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  create(@Body() createRecepieDto: CreateRecepieDto, @GetUser() user: User) {
    createRecepieDto.author = user;

    return this.recepieService.create(createRecepieDto);
  }
  @Get()
  findAll(
    @Query('skip') skip: number,
    @Query('take') take: number,
    @Query('keyword') keyword: string,
  ) {
    return this.recepieService.findAll({
      skip,
      take,
      keyword,
    });
  }

  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  initIngredients(@UploadedFile() file: Express.Multer.File) {
    // console.log(file);
    return this.recepieService.importRecepiesFromJSON(file);
  }

  @Get('export')
  async exportAll(@Res() res) {
    const resp = await this.recepieService.exportAll();
    const time = new Date().getTime();
    res.header(
      'Content-Disposition',
      `attachment; filename="export_recepies-${time}.json"`,
    );

    const json = JSON.stringify(resp);
    const buffer = Buffer.from(json);
    const file = Readable.from(buffer);
    file.pipe(res);
  }

  @Get('explore')
  async getExploreRecepie() {
    return this.recepieService.generateExploreRecepie();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query('addItems') val = false) {
    if (val) {
      const recepie = await this.recepieService.findOne(id);
      if (!recepie) {
        throw new NotFoundException();
      }
      recepie.items = await this.recepieService.findItemsOfOne(recepie);
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
