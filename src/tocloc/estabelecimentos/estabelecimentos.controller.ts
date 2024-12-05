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
  findOne(id: number) {
    return this.estabelecimentosService.findOne(id);
  }

  @Post()
  create(@Body() criarEstabelecimentoDto: CriarEstabelecimentoDto) {
    return this.estabelecimentosService.create(criarEstabelecimentoDto);
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
