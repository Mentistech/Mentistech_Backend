import { Test, TestingModule } from '@nestjs/testing';
import { PerfilPsicologoService } from './perfil_psicologo.service';
import { PrismaService } from 'src/database/prisma.service';

const prismaMock = {
  perfilPsicologo: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  usuario: {
    findUnique: jest.fn(),
  },
};

describe('PerfilPsicologoService', () => {
  let service: PerfilPsicologoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PerfilPsicologoService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<PerfilPsicologoService>(PerfilPsicologoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
