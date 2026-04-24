import { Injectable } from '@nestjs/common';
import { CreateAnaliseIaDto } from './dto/create-analise_ia.dto';
import { UpdateAnaliseIaDto } from './dto/update-analise_ia.dto';

@Injectable()
export class AnaliseIaService {
  create(createAnaliseIaDto: CreateAnaliseIaDto) {
    return 'This action adds a new analiseIa';
  }

  findAll() {
    return `This action returns all analiseIa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} analiseIa`;
  }

  update(id: number, updateAnaliseIaDto: UpdateAnaliseIaDto) {
    return `This action updates a #${id} analiseIa`;
  }

  remove(id: number) {
    return `This action removes a #${id} analiseIa`;
  }
}
