import { Test, TestingModule } from '@nestjs/testing';
import { AnaliseIaController } from './analise_ia.controller';
import { AnaliseIaService } from './analise_ia.service';

describe('AnaliseIaController', () => {
  let controller: AnaliseIaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnaliseIaController],
      providers: [AnaliseIaService],
    }).compile();

    controller = module.get<AnaliseIaController>(AnaliseIaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
