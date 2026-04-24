import { PartialType } from '@nestjs/mapped-types';
import { CreatePerfilPsicologoDto } from './create-perfil_psicologo.dto';

export class UpdatePerfilPsicologoDto extends PartialType(
  CreatePerfilPsicologoDto,
) {}
