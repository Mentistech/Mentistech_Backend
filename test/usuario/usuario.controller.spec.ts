import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { Papel } from 'src/usuario/dto/create-usuario.dto';
import { UsuarioController } from 'src/usuario/usuario.controller';
import { UsuarioService } from 'src/usuario/usuario.service';

const serviceMock = {
  create: jest.fn<(...args: any[]) => any>(),
  findAll: jest.fn<(...args: any[]) => any>(),
  findOne: jest.fn<(...args: any[]) => any>(),
  update: jest.fn<(...args: any[]) => any>(),
  remove: jest.fn<(...args: any[]) => any>(),
};

describe('UsuarioController', () => {
  let controller: UsuarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioController],
      providers: [{ provide: UsuarioService, useValue: serviceMock }],
    }).compile();

    controller = module.get<UsuarioController>(UsuarioController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('deve chamar service.create com o DTO e retornar o resultado', async () => {
      const dto = {
        nome: 'João Silva',
        email: 'joao@email.com',
        senha: 'senha123',
        papel: Papel.COLABORADOR,
      };
      const criado = { id: 'uuid-1', ...dto };
      serviceMock.create.mockResolvedValue(criado);

      const result = await controller.create(dto);

      expect(serviceMock.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(criado);
    });
  });

  describe('findAll', () => {
    it('deve chamar service.findAll e retornar a lista de usuários', async () => {
      const usuarios = [
        { id: 'uuid-1', nome: 'João' },
        { id: 'uuid-2', nome: 'Maria' },
      ];
      serviceMock.findAll.mockResolvedValue(usuarios);

      const result = await controller.findAll();

      expect(serviceMock.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(usuarios);
    });
  });

  describe('findOne', () => {
    it('deve chamar service.findOne com o id e retornar o usuário', async () => {
      const usuario = { id: 'uuid-1', nome: 'João' };
      serviceMock.findOne.mockResolvedValue(usuario);

      const result = await controller.findOne('uuid-1');

      expect(serviceMock.findOne).toHaveBeenCalledWith('uuid-1');
      expect(result).toEqual(usuario);
    });
  });

  describe('update', () => {
    it('deve chamar service.update com id e DTO e retornar o registro atualizado', async () => {
      const dto = { nome: 'João Atualizado' };
      const atualizado = { id: 'uuid-1', nome: 'João Atualizado' };
      serviceMock.update.mockResolvedValue(atualizado);

      const result = await controller.update('uuid-1', dto);

      expect(serviceMock.update).toHaveBeenCalledWith('uuid-1', dto);
      expect(result).toEqual(atualizado);
    });
  });

  describe('remove', () => {
    it('deve chamar service.remove com o id e retornar o registro deletado', async () => {
      const deletado = { id: 'uuid-1', nome: 'João' };
      serviceMock.remove.mockResolvedValue(deletado);

      const result = await controller.remove('uuid-1');

      expect(serviceMock.remove).toHaveBeenCalledWith('uuid-1');
      expect(result).toEqual(deletado);
    });
  });
});
