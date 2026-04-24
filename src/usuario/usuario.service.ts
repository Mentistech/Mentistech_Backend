import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const { senha, ...rest } = createUsuarioDto;
    const senhaHash = await hash(senha, 10);
    return this.prisma.usuario.create({ data: { ...rest, senhaHash } });
  }

  findAll() {
    return this.prisma.usuario.findMany();
  }

  findOne(id: string) {
    return this.prisma.usuario.findUnique({ where: { id } });
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const { senha, ...rest } = updateUsuarioDto;
    const data = senha
      ? { ...rest, senhaHash: await hash(senha, 10) }
      : rest;
    return this.prisma.usuario.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.usuario.delete({ where: { id } });
  }
}
