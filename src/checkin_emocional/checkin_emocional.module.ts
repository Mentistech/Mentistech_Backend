import { Module } from '@nestjs/common';
import { CheckinEmocionalService } from './checkin_emocional.service';
import { CheckinEmocionalController } from './checkin_emocional.controller';

@Module({
  controllers: [CheckinEmocionalController],
  providers: [CheckinEmocionalService],
})
export class CheckinEmocionalModule {}
