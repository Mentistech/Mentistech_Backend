import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AnaliseIaService } from './analise_ia.service';
import { CreateAnaliseIaDto } from './dto/create-analise_ia.dto';
import { UpdateAnaliseIaDto } from './dto/update-analise_ia.dto';

@Controller('analise-ia')
export class AnaliseIaController {
  constructor(private readonly analiseIaService: AnaliseIaService) {}

  @Post()
  create(@Body() createAnaliseIaDto: CreateAnaliseIaDto) {
    return this.analiseIaService.create(createAnaliseIaDto);
  }

  @Get()
  findAll() {
    return this.analiseIaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.analiseIaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAnaliseIaDto: UpdateAnaliseIaDto,
  ) {
    return this.analiseIaService.update(+id, updateAnaliseIaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.analiseIaService.remove(+id);
  }
}
