import { Module } from '@nestjs/common';
import { PerfilColaboradorService } from './perfil_colaborador.service';
import { PerfilColaboradorController } from './perfil_colaborador.controller';

@Module({
  controllers: [PerfilColaboradorController],
  providers: [PerfilColaboradorService],
})
export class PerfilColaboradorModule {}
