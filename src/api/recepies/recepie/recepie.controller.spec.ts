import { Test, TestingModule } from '@nestjs/testing';
import { RecepieController } from './recepie.controller';
import { RecepieService } from './recepie.service';

describe('RecepieController', () => {
  let controller: RecepieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecepieController],
      providers: [RecepieService],
    }).compile();

    controller = module.get<RecepieController>(RecepieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
