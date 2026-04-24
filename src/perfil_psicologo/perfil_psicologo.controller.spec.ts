import { Test, TestingModule } from '@nestjs/testing';
import { PerfilPsicologoController } from './perfil_psicologo.controller';
import { PerfilPsicologoService } from './perfil_psicologo.service';

describe('PerfilPsicologoController', () => {
  let controller: PerfilPsicologoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerfilPsicologoController],
      providers: [PerfilPsicologoService],
    }).compile();

    controller = module.get<PerfilPsicologoController>(
      PerfilPsicologoController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
