import { Injectable } from '@nestjs/common';

@Injectable()
export class ImagesService {
  create() {
    return 'This action adds a new image';
  }

  findOne(id: string) {
    return `This action returns a #${id} image`;
  }
  remove(id: string) {
    return `This action removes a #${id} image`;
  }
}
