import { Test, TestingModule } from '@nestjs/testing';
import { AnaliseIaService } from './analise_ia.service';

describe('AnaliseIaService', () => {
  let service: AnaliseIaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnaliseIaService],
    }).compile();

    service = module.get<AnaliseIaService>(AnaliseIaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
