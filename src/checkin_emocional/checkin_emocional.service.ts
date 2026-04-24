import { Injectable } from '@nestjs/common';
import { CreateCheckinEmocionalDto } from './dto/create-checkin_emocional.dto';
import { UpdateCheckinEmocionalDto } from './dto/update-checkin_emocional.dto';

@Injectable()
export class CheckinEmocionalService {
  create(createCheckinEmocionalDto: CreateCheckinEmocionalDto) {
    return 'This action adds a new checkinEmocional';
  }

  findAll() {
    return `This action returns all checkinEmocional`;
  }

  findOne(id: number) {
    return `This action returns a #${id} checkinEmocional`;
  }

  update(id: number, updateCheckinEmocionalDto: UpdateCheckinEmocionalDto) {
    return `This action updates a #${id} checkinEmocional`;
  }

  remove(id: number) {
    return `This action removes a #${id} checkinEmocional`;
  }
}
