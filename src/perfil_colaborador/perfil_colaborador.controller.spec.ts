import { Test, TestingModule } from '@nestjs/testing';
import { PerfilColaboradorController } from './perfil_colaborador.controller';
import { PerfilColaboradorService } from './perfil_colaborador.service';

describe('PerfilColaboradorController', () => {
  let controller: PerfilColaboradorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerfilColaboradorController],
      providers: [PerfilColaboradorService],
    }).compile();

    controller = module.get<PerfilColaboradorController>(
      PerfilColaboradorController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
