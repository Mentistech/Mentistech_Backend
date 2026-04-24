import { PartialType } from '@nestjs/mapped-types';
import { CreateCheckinEmocionalDto } from './create-checkin_emocional.dto';

export class UpdateCheckinEmocionalDto extends PartialType(
  CreateCheckinEmocionalDto,
) {}
