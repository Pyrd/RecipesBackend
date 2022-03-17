import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Readable } from 'typeorm/platform/PlatformTools';
import { User } from '~/api/auth/user/entities/user.entity';
import { GetUser } from '~/core/auth/auth.decorator';
import { AuthGuard } from '~/core/auth/auth.guard';
import { CreateRecepieDto } from './dto/create-recepie.dto';
import { UpdateRecepieDto } from './dto/update-recepie.dto';
import { RecepieService } from './recepie.service';

@Controller('recepie')
export class RecepieController {
  logger = new Logger(RecepieController.name);
  constructor(private readonly recepieService: RecepieService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseGuards(AuthGuard)
  create(@Body() createRecepieDto: CreateRecepieDto, @GetUser() user: User) {
    createRecepieDto.author = user;

    return this.recepieService.create(createRecepieDto);
  }
  @Get()
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async initIngredients(
    @GetUser() user,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // console.log(file);

    const resp = await this.recepieService
      .importRecepiesFromJSON(file, user.storedUser)
      .catch((err) => {
        this.logger.error(err);
        throw new InternalServerErrorException({
          message: 'ERROR',
          error: err.message,
        });
      });
    return { message: 'SUCCESS', ...resp };
  }

  @Get('export')
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
  async getExploreRecepie() {
    return this.recepieService.generateExploreRecepie();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
  findItemsOfOne(@Param('id') id: string) {
    return this.recepieService.findItemsOfOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateRecepieDto: UpdateRecepieDto) {
    return this.recepieService.update(id, updateRecepieDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.recepieService.remove(id);
  }
}
