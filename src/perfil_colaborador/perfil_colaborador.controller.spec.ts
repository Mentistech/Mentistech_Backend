import { Test, TestingModule } from '@nestjs/testing';
import { PerfilColaboradorController } from './perfil_colaborador.controller';
import { PerfilColaboradorService } from './perfil_colaborador.service';

const serviceMock = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('PerfilColaboradorController', () => {
  let controller: PerfilColaboradorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerfilColaboradorController],
      providers: [
        {
          provide: PerfilColaboradorService,
          useValue: serviceMock,
        },
      ],
    }).compile();

    controller = module.get<PerfilColaboradorController>(
      PerfilColaboradorController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
