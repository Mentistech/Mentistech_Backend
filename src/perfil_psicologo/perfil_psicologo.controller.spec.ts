import { Test, TestingModule } from '@nestjs/testing';
import { PerfilPsicologoController } from './perfil_psicologo.controller';
import { PerfilPsicologoService } from './perfil_psicologo.service';

const serviceMock = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('PerfilPsicologoController', () => {
  let controller: PerfilPsicologoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerfilPsicologoController],
      providers: [
        {
          provide: PerfilPsicologoService,
          useValue: serviceMock,
        },
      ],
    }).compile();

    controller = module.get<PerfilPsicologoController>(
      PerfilPsicologoController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
