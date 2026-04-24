import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CheckinEmocionalService } from './checkin_emocional.service';
import { CreateCheckinEmocionalDto } from './dto/create-checkin_emocional.dto';
import { UpdateCheckinEmocionalDto } from './dto/update-checkin_emocional.dto';

@Controller('checkin-emocional')
export class CheckinEmocionalController {
  constructor(
    private readonly checkinEmocionalService: CheckinEmocionalService,
  ) {}

  @Post()
  create(@Body() createCheckinEmocionalDto: CreateCheckinEmocionalDto) {
    return this.checkinEmocionalService.create(createCheckinEmocionalDto);
  }

  @Get()
  findAll() {
    return this.checkinEmocionalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checkinEmocionalService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCheckinEmocionalDto: UpdateCheckinEmocionalDto,
  ) {
    return this.checkinEmocionalService.update(+id, updateCheckinEmocionalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkinEmocionalService.remove(+id);
  }
}
