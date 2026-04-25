import { Test, TestingModule } from '@nestjs/testing';
import { PerfilColaboradorService } from './perfil_colaborador.service';
import { PrismaService } from 'src/database/prisma.service';

const prismaMock = {
  perfilColaborador: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  usuario: {
    findUnique: jest.fn(),
  },
};

describe('PerfilColaboradorService', () => {
  let service: PerfilColaboradorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PerfilColaboradorService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<PerfilColaboradorService>(PerfilColaboradorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
