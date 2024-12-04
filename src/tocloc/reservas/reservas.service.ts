import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Reserva } from './reservas.entity';
import { CriarReservaDto } from './dto/criar-reserva.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReservasService {
  constructor(
    @InjectRepository(Reserva)
    private readonly reservasRepository: Repository<Reserva>,
  ) {}

  async findAll(): Promise<Reserva[]> {
    return this.reservasRepository.find();
  }

  async findOne(id: number): Promise<Reserva> {
    return this.reservasRepository.findOne({ where: { id } });
  }

  async create(reserva: CriarReservaDto): Promise<Reserva> {
    return this.reservasRepository.save(reserva);
  }

  async update(id: number, reserva: Partial<Reserva>): Promise<Reserva> {
    await this.reservasRepository.update(id, reserva);
    return this.reservasRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.reservasRepository.delete(id);
  }
}
