import { PartialType } from '@nestjs/mapped-types';
import { CreatePerfilColaboradorDto } from './create-perfil_colaborador.dto';

export class UpdatePerfilColaboradorDto extends PartialType(
  CreatePerfilColaboradorDto,
) {}
