import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { EnderecosService } from './enderecos.service';
import { CriarEnderecoDto } from './dto/criar-endereco.dto';
import { Endereco } from './enderecos.entity';

@Controller('enderecos')
export class EnderecosController {
  constructor(private readonly enderecosService: EnderecosService) {}

  @Get()
  findAll() {
    return this.enderecosService.findAll();
  }

  @Get(':id')
  findOne(id: number) {
    return this.enderecosService.findOne(id);
  }

  @Post()
  create(@Body() body: CriarEnderecoDto) {
    return this.enderecosService.create(body);
  }

  @Put(':id')
  update(@Body() body: Partial<Endereco>, id: number) {
    return this.enderecosService.update(id, body);
  }

  @Delete(':id')
  remove(id: number) {
    return this.enderecosService.remove(id);
  }
}
