import { Test, TestingModule } from '@nestjs/testing';
import { ReceipeService } from './receipe.service';

describe('ReceipeService', () => {
  let service: ReceipeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReceipeService],
    }).compile();

    service = module.get<ReceipeService>(ReceipeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
