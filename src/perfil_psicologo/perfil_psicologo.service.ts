import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreatePerfilPsicologoDto } from './dto/create-perfil_psicologo.dto';
import { UpdatePerfilPsicologoDto } from './dto/update-perfil_psicologo.dto';

@Injectable()
export class PerfilPsicologoService {
  constructor(private readonly prisma: PrismaService) {}

  private omitSenha(usuario: any) {
    if (!usuario) return usuario;
    const { senhaHash, ...rest } = usuario;
    return rest;
  }

  async create(dto: CreatePerfilPsicologoDto) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: dto.usuarioId },
    });

    if (!usuario) {
      throw new NotFoundException(
        `Usuário com id ${dto.usuarioId} não encontrado.`,
      );
    }

    if (usuario.papel !== 'PSICOLOGO') {
      throw new ConflictException(
        `O usuário ${dto.usuarioId} tem papel ${usuario.papel}, mas um perfil de psicólogo requer papel PSICOLOGO.`,
      );
    }

    const jaExiste = await this.prisma.perfilPsicologo.findUnique({
      where: { usuarioId: dto.usuarioId },
    });

    if (jaExiste) {
      throw new ConflictException(
        `O usuário ${dto.usuarioId} já possui um perfil de psicólogo.`,
      );
    }

    const crpEmUso = await this.prisma.perfilPsicologo.findFirst({
      where: { crp: dto.crp },
    });

    if (crpEmUso) {
      throw new ConflictException(`O CRP ${dto.crp} já está cadastrado.`);
    }

    const perfil = await this.prisma.perfilPsicologo.create({
      data: dto,
      include: { usuario: true },
    });

    return { ...perfil, usuario: this.omitSenha(perfil.usuario) };
  }

  async findAll() {
    const perfis = await this.prisma.perfilPsicologo.findMany({
      include: { usuario: true },
    });
    return perfis.map((p) => ({ ...p, usuario: this.omitSenha(p.usuario) }));
  }

  async findOne(id: string) {
    const perfil = await this.prisma.perfilPsicologo.findUnique({
      where: { id },
      include: { usuario: true },
    });

    if (!perfil) {
      throw new NotFoundException(
        `Perfil de psicólogo com id ${id} não encontrado.`,
      );
    }

    return { ...perfil, usuario: this.omitSenha(perfil.usuario) };
  }

  async update(id: string, dto: UpdatePerfilPsicologoDto) {
    await this.findOne(id);

    if (dto.crp) {
      const crpEmUso = await this.prisma.perfilPsicologo.findFirst({
        where: { crp: dto.crp, NOT: { id } },
      });
      if (crpEmUso) {
        throw new ConflictException(`O CRP ${dto.crp} já está cadastrado.`);
      }
    }

    const { usuarioId, ...dadosAtualizaveis } = dto;

    const perfil = await this.prisma.perfilPsicologo.update({
      where: { id },
      data: dadosAtualizaveis,
      include: { usuario: true },
    });

    return { ...perfil, usuario: this.omitSenha(perfil.usuario) };
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.perfilPsicologo.delete({ where: { id } });
  }
}
