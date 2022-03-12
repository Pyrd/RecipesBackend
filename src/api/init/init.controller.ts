import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InitService } from './init.service';

@Controller('init')
export class InitController {
  constructor(private readonly initService: InitService) {}

  @Post('ingredients')
  @UseInterceptors(FileInterceptor('file'))
  initIngredients(@UploadedFile() file: Express.Multer.File) {
    // console.log(file);``
    this.initService.initIngredients(file);

    return { message: 'IMPORTING' };
  }
}
