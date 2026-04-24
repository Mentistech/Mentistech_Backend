import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './database/prisma.module';
import { PrismaService } from './database/prisma.service';
import { UsuarioModule } from './usuario/usuario.module';
import { PerfilColaboradorModule } from './perfil_colaborador/perfil_colaborador.module';
import { PerfilPsicologoModule } from './perfil_psicologo/perfil_psicologo.module';
import { CheckinEmocionalModule } from './checkin_emocional/checkin_emocional.module';
import { AnaliseIaModule } from './analise_ia/analise_ia.module';
import { ConsultaModule } from './consulta/consulta.module';
import { DisponibilidadeModule } from './disponibilidade/disponibilidade.module';

@Module({
  controllers: [AppController],
  providers: [AppService, PrismaService],
  imports: [
    PrismaModule,
    UsuarioModule,
    PerfilColaboradorModule,
    PerfilPsicologoModule,
    CheckinEmocionalModule,
    AnaliseIaModule,
    ConsultaModule,
    DisponibilidadeModule,
  ],
})
export class AppModule {}
