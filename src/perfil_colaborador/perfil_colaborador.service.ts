import { Injectable } from '@nestjs/common';
import { CreatePerfilColaboradorDto } from './dto/create-perfil_colaborador.dto';
import { UpdatePerfilColaboradorDto } from './dto/update-perfil_colaborador.dto';

@Injectable()
export class PerfilColaboradorService {
  create(createPerfilColaboradorDto: CreatePerfilColaboradorDto) {
    return 'This action adds a new perfilColaborador';
  }

  findAll() {
    return `This action returns all perfilColaborador`;
  }

  findOne(id: number) {
    return `This action returns a #${id} perfilColaborador`;
  }

  update(id: number, updatePerfilColaboradorDto: UpdatePerfilColaboradorDto) {
    return `This action updates a #${id} perfilColaborador`;
  }

  remove(id: number) {
    return `This action removes a #${id} perfilColaborador`;
  }
}
