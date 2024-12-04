import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { CriarReservaDto } from './dto/criar-reserva.dto';
import { Reserva } from './reservas.entity';

@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @Get()
  async findAll() {
    return this.reservasService.findAll();
  }

  @Get(':id')
  async findOne(id: number) {
    return this.reservasService.findOne(id);
  }

  @Post()
  async create(@Body() body: CriarReservaDto) {
    return this.reservasService.create(body);
  }

  @Put(':id')
  async update(@Body() body: Partial<Reserva>, id: number) {
    return this.reservasService.update(id, body);
  }

  @Delete(':id')
  async delete(id: number) {
    return this.reservasService.delete(id);
  }
}
