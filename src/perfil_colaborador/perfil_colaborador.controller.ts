import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PerfilColaboradorService } from './perfil_colaborador.service';
import { CreatePerfilColaboradorDto } from './dto/create-perfil_colaborador.dto';
import { UpdatePerfilColaboradorDto } from './dto/update-perfil_colaborador.dto';

@Controller('perfil-colaborador')
export class PerfilColaboradorController {
  constructor(
    private readonly perfilColaboradorService: PerfilColaboradorService,
  ) {}

  @Post()
  create(@Body() createPerfilColaboradorDto: CreatePerfilColaboradorDto) {
    return this.perfilColaboradorService.create(createPerfilColaboradorDto);
  }

  @Get()
  findAll() {
    return this.perfilColaboradorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.perfilColaboradorService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePerfilColaboradorDto: UpdatePerfilColaboradorDto,
  ) {
    return this.perfilColaboradorService.update(
      +id,
      updatePerfilColaboradorDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.perfilColaboradorService.remove(+id);
  }
}
