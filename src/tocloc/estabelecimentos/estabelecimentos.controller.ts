import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EstabelecimentosService } from './estabelecimentos.service';
import { Estabelecimento } from './estabelecimentos.entity';
import { CriarEstabelecimentoDto } from './dto/criar-estabelecimento.dto';
import { Campo } from '../campos/campos.entity';

@Controller('estabelecimentos')
export class EstabelecimentosController {
  constructor(
    private readonly estabelecimentosService: EstabelecimentosService,
  ) {}

  @Get()
  findAll() {
    return this.estabelecimentosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.estabelecimentosService.findOne(id);
  }

  @Get(':id/reservas')
  findReservas(@Param('id') id: number) {
    return this.estabelecimentosService.findReservas(id);
  }

  @Post()
  create(@Body() criarEstabelecimentoDto: CriarEstabelecimentoDto) {
    return this.estabelecimentosService.create(criarEstabelecimentoDto);
  }

  @Post(':id/campos')
  createCampo(@Param('id') id: number, @Body() body: Partial<Campo>) {
    return this.estabelecimentosService.criarCampo(id, body);
  }

  @Put(':id')
  update(
    @Body() updateEstabelecimentoDto: Partial<Estabelecimento>,
    @Param('id') id: string,
  ) {
    return this.estabelecimentosService.update(+id, updateEstabelecimentoDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.estabelecimentosService.delete(+id);
  }
}
