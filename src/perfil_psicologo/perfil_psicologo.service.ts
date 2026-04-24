import { Injectable } from '@nestjs/common';
import { CreatePerfilPsicologoDto } from './dto/create-perfil_psicologo.dto';
import { UpdatePerfilPsicologoDto } from './dto/update-perfil_psicologo.dto';

@Injectable()
export class PerfilPsicologoService {
  create(createPerfilPsicologoDto: CreatePerfilPsicologoDto) {
    return 'This action adds a new perfilPsicologo';
  }

  findAll() {
    return `This action returns all perfilPsicologo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} perfilPsicologo`;
  }

  update(id: number, updatePerfilPsicologoDto: UpdatePerfilPsicologoDto) {
    return `This action updates a #${id} perfilPsicologo`;
  }

  remove(id: number) {
    return `This action removes a #${id} perfilPsicologo`;
  }
}
