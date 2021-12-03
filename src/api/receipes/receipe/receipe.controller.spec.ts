import { Test, TestingModule } from '@nestjs/testing';
import { ReceipeController } from './receipe.controller';
import { ReceipeService } from './receipe.service';

describe('ReceipeController', () => {
  let controller: ReceipeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceipeController],
      providers: [ReceipeService],
    }).compile();

    controller = module.get<ReceipeController>(ReceipeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
