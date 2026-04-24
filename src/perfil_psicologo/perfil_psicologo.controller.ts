import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PerfilPsicologoService } from './perfil_psicologo.service';
import { CreatePerfilPsicologoDto } from './dto/create-perfil_psicologo.dto';
import { UpdatePerfilPsicologoDto } from './dto/update-perfil_psicologo.dto';

@Controller('perfil-psicologo')
export class PerfilPsicologoController {
  constructor(
    private readonly perfilPsicologoService: PerfilPsicologoService,
  ) {}

  @Post()
  create(@Body() createPerfilPsicologoDto: CreatePerfilPsicologoDto) {
    return this.perfilPsicologoService.create(createPerfilPsicologoDto);
  }

  @Get()
  findAll() {
    return this.perfilPsicologoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.perfilPsicologoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePerfilPsicologoDto: UpdatePerfilPsicologoDto,
  ) {
    return this.perfilPsicologoService.update(+id, updatePerfilPsicologoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.perfilPsicologoService.remove(+id);
  }
}
