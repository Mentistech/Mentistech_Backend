import { Module } from '@nestjs/common';
import { AnaliseIaService } from './analise_ia.service';
import { AnaliseIaController } from './analise_ia.controller';

@Module({
  controllers: [AnaliseIaController],
  providers: [AnaliseIaService],
})
export class AnaliseIaModule {}
