import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Logger,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InitService } from './init.service';

@Controller('init')
export class InitController {
  logger: Logger = new Logger(InitController.name);
  constructor(private readonly initService: InitService) {}

  @Post('ingredients')
  @UseInterceptors(FileInterceptor('file'))
  async initIngredients(@UploadedFile() file: Express.Multer.File) {
    // console.log(file);``
    const resp = await this.initService.initIngredients(file).catch((err) => {
      this.logger.error(err);
      return { message: 'ERROR', error: err.message };
    });

    return { message: 'SUCCESS', ...resp };
  }
}
