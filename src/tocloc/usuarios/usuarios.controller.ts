import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';
import { Usuario } from './usuarios.entity';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(id: string) {
    return this.usuariosService.findOne(+id);
  }

  @Post()
  create(@Body() criarUsuarioDto: CriarUsuarioDto) {
    return this.usuariosService.create(criarUsuarioDto);
  }

  @Put(':id')
  update(@Body() updateUsuarioDto: Partial<Usuario>, @Param('id') id: string) {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usuariosService.delete(+id);
  }
}
