import { Test, TestingModule } from '@nestjs/testing';
import { PerfilColaboradorService } from './perfil_colaborador.service';

describe('PerfilColaboradorService', () => {
  let service: PerfilColaboradorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PerfilColaboradorService],
    }).compile();

    service = module.get<PerfilColaboradorService>(PerfilColaboradorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
