import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreatePerfilColaboradorDto } from './dto/create-perfil_colaborador.dto';
import { UpdatePerfilColaboradorDto } from './dto/update-perfil_colaborador.dto';

@Injectable()
export class PerfilColaboradorService {
  constructor(private readonly prisma: PrismaService) {}

  private omitSenha(usuario: any) {
    if (!usuario) return usuario;
    const { senhaHash, ...rest } = usuario;
    return rest;
  }

  async create(dto: CreatePerfilColaboradorDto) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: dto.usuarioId },
    });

    if (!usuario) {
      throw new NotFoundException(
        `Usuário com id ${dto.usuarioId} não encontrado.`,
      );
    }

    if (usuario.papel !== 'COLABORADOR') {
      throw new ConflictException(
        `O usuário ${dto.usuarioId} tem papel ${usuario.papel}, mas um perfil de colaborador requer papel COLABORADOR.`,
      );
    }

    const jaExiste = await this.prisma.perfilColaborador.findUnique({
      where: { usuarioId: dto.usuarioId },
    });

    if (jaExiste) {
      throw new ConflictException(
        `O usuário ${dto.usuarioId} já possui um perfil de colaborador.`,
      );
    }

    const perfil = await this.prisma.perfilColaborador.create({
      data: dto,
      include: { usuario: true },
    });

    return { ...perfil, usuario: this.omitSenha(perfil.usuario) };
  }

  async findAll() {
    const perfis = await this.prisma.perfilColaborador.findMany({
      include: { usuario: true },
    });
    return perfis.map((p) => ({ ...p, usuario: this.omitSenha(p.usuario) }));
  }

  async findOne(id: string) {
    const perfil = await this.prisma.perfilColaborador.findUnique({
      where: { id },
      include: { usuario: true },
    });

    if (!perfil) {
      throw new NotFoundException(
        `Perfil de colaborador com id ${id} não encontrado.`,
      );
    }

    return { ...perfil, usuario: this.omitSenha(perfil.usuario) };
  }

  async update(id: string, dto: UpdatePerfilColaboradorDto) {
    await this.findOne(id);

    const { usuarioId, ...dadosAtualizaveis } = dto;

    const perfil = await this.prisma.perfilColaborador.update({
      where: { id },
      data: dadosAtualizaveis,
      include: { usuario: true },
    });

    return { ...perfil, usuario: this.omitSenha(perfil.usuario) };
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.perfilColaborador.delete({ where: { id } });
  }
}
