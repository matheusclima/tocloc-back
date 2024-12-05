import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CamposService } from './campos.service';
import { CriarCampoDto } from './dto/criar-campos.dto';
import { Campo } from './campos.entity';
import { Reserva } from '../reservas/reservas.entity';

@Controller('campos')
export class CamposController {
  constructor(private readonly camposService: CamposService) {}

  @Get()
  findAll() {
    return this.camposService.findAll();
  }

  @Get(':id')
  findOne(id: string) {
    return this.camposService.findOne(+id);
  }

  @Post()
  create(@Body() criarCampoDto: CriarCampoDto) {
    return this.camposService.create(criarCampoDto);
  }

  @Post(':id/reservas')
  createReserva(
    @Param('id') id: number,
    @Body() body: Partial<Reserva> & { usuarioId: number },
  ) {
    return this.camposService.createReserva(id, body);
  }

  @Put(':id')
  update(@Body() updateCampoDto: Partial<Campo>, @Param('id') id: string) {
    return this.camposService.update(+id, updateCampoDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.camposService.delete(+id);
  }
}
