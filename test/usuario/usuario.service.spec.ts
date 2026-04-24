import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/database/prisma.service';
import { Papel } from 'src/usuario/dto/create-usuario.dto';
import { UsuarioService } from 'src/usuario/usuario.service';

jest.mock('bcrypt', () => ({
  hash: jest.fn<(...args: any[]) => any>().mockResolvedValue('hashed_senha'),
}));

const prismaMock = {
  usuario: {
    create: jest.fn<(...args: any[]) => any>(),
    findMany: jest.fn<(...args: any[]) => any>(),
    findUnique: jest.fn<(...args: any[]) => any>(),
    update: jest.fn<(...args: any[]) => any>(),
    delete: jest.fn<(...args: any[]) => any>(),
  },
};

describe('UsuarioService', () => {
  let service: UsuarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuarioService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('deve hashear a senha e criar o usuário no banco', async () => {
      const dto = {
        nome: 'João Silva',
        email: 'joao@email.com',
        senha: 'senha123',
        papel: Papel.COLABORADOR,
      };
      const registroCriado = {
        id: 'uuid-1',
        nome: dto.nome,
        email: dto.email,
        senhaHash: 'hashed_senha',
        papel: dto.papel,
      };
      prismaMock.usuario.create.mockResolvedValue(registroCriado);

      const result = await service.create(dto);

      expect(bcrypt.hash).toHaveBeenCalledWith('senha123', 10);
      expect(prismaMock.usuario.create).toHaveBeenCalledWith({
        data: {
          nome: dto.nome,
          email: dto.email,
          papel: dto.papel,
          senhaHash: 'hashed_senha',
        },
      });
      expect(result).toEqual(registroCriado);
    });
  });

  describe('findAll', () => {
    it('deve retornar todos os usuários', async () => {
      const usuarios = [
        { id: 'uuid-1', nome: 'João', email: 'joao@email.com' },
        { id: 'uuid-2', nome: 'Maria', email: 'maria@email.com' },
      ];
      prismaMock.usuario.findMany.mockResolvedValue(usuarios);

      const result = await service.findAll();

      expect(prismaMock.usuario.findMany).toHaveBeenCalledTimes(1);
      expect(result).toEqual(usuarios);
    });
  });

  describe('findOne', () => {
    it('deve retornar o usuário pelo id', async () => {
      const usuario = { id: 'uuid-1', nome: 'João', email: 'joao@email.com' };
      prismaMock.usuario.findUnique.mockResolvedValue(usuario);

      const result = await service.findOne('uuid-1');

      expect(prismaMock.usuario.findUnique).toHaveBeenCalledWith({
        where: { id: 'uuid-1' },
      });
      expect(result).toEqual(usuario);
    });

    it('deve retornar null quando o usuário não existe', async () => {
      prismaMock.usuario.findUnique.mockResolvedValue(null);

      const result = await service.findOne('id-inexistente');

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('deve hashear a nova senha quando fornecida', async () => {
      const dto = { nome: 'João Atualizado', senha: 'novasenha' };
      const atualizado = {
        id: 'uuid-1',
        nome: 'João Atualizado',
        senhaHash: 'hashed_senha',
      };
      prismaMock.usuario.update.mockResolvedValue(atualizado);

      const result = await service.update('uuid-1', dto);

      expect(bcrypt.hash).toHaveBeenCalledWith('novasenha', 10);
      expect(prismaMock.usuario.update).toHaveBeenCalledWith({
        where: { id: 'uuid-1' },
        data: { nome: 'João Atualizado', senhaHash: 'hashed_senha' },
      });
      expect(result).toEqual(atualizado);
    });

    it('deve atualizar sem hashear quando senha não é fornecida', async () => {
      const dto = { nome: 'João Atualizado' };
      const atualizado = { id: 'uuid-1', nome: 'João Atualizado' };
      prismaMock.usuario.update.mockResolvedValue(atualizado);

      const result = await service.update('uuid-1', dto);

      expect(bcrypt.hash).not.toHaveBeenCalled();
      expect(prismaMock.usuario.update).toHaveBeenCalledWith({
        where: { id: 'uuid-1' },
        data: { nome: 'João Atualizado' },
      });
      expect(result).toEqual(atualizado);
    });
  });

  describe('remove', () => {
    it('deve deletar o usuário pelo id', async () => {
      const deletado = { id: 'uuid-1', nome: 'João' };
      prismaMock.usuario.delete.mockResolvedValue(deletado);

      const result = await service.remove('uuid-1');

      expect(prismaMock.usuario.delete).toHaveBeenCalledWith({
        where: { id: 'uuid-1' },
      });
      expect(result).toEqual(deletado);
    });
  });
});
