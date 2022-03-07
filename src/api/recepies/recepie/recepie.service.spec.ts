import { Test, TestingModule } from '@nestjs/testing';
import { RecepieService } from './recepie.service';

describe('RecepieService', () => {
  let service: RecepieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecepieService],
    }).compile();

    service = module.get<RecepieService>(RecepieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
