import { Test, TestingModule } from '@nestjs/testing';
import { PerfilPsicologoService } from './perfil_psicologo.service';

describe('PerfilPsicologoService', () => {
  let service: PerfilPsicologoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PerfilPsicologoService],
    }).compile();

    service = module.get<PerfilPsicologoService>(PerfilPsicologoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
