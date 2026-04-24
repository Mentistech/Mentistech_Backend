import { PartialType } from '@nestjs/mapped-types';
import { CreateAnaliseIaDto } from './create-analise_ia.dto';

export class UpdateAnaliseIaDto extends PartialType(CreateAnaliseIaDto) {}
