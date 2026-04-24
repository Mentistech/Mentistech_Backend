import { Module } from '@nestjs/common';
import { PerfilPsicologoService } from './perfil_psicologo.service';
import { PerfilPsicologoController } from './perfil_psicologo.controller';

@Module({
  controllers: [PerfilPsicologoController],
  providers: [PerfilPsicologoService],
})
export class PerfilPsicologoModule {}
