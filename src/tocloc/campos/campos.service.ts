import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campo } from './campos.entity';
import { CriarCampoDto } from './dto/criar-campos.dto';
import { Reserva } from '../reservas/reservas.entity';
import { Usuario } from '../usuarios/usuarios.entity';

@Injectable()
export class CamposService {
  private readonly logger = new Logger(CamposService.name);
  constructor(
    @InjectRepository(Campo)
    private readonly camposRepository: Repository<Campo>,

    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<Campo[]> {
    return this.camposRepository.find();
  }

  async findOne(id: number): Promise<Campo> {
    return this.camposRepository.findOne({ where: { id } });
  }

  async create(criarCampoDto: CriarCampoDto): Promise<Campo> {
    const novoCampo = new Campo(criarCampoDto);
    return this.camposRepository.save(novoCampo);
  }

  async createReserva(
    id: number,
    body: Partial<Reserva> & { usuarioId: number },
  ): Promise<Campo> {
    this.logger.log(`Creating reserva for campo with id ${id}`);
    const campo = await this.camposRepository.findOne({
      where: { id },
      relations: ['reservas'],
    });

    if (!campo) {
      this.logger.warn(`Campo with id ${id} not found`);
      throw new NotFoundException('Campo não encontrado');
    }

    const usuario = await this.usuariosRepository.findOne({
      where: { id: body.usuarioId },
    });
    if (!usuario) {
      this.logger.warn(`User with id ${body.usuarioId} not found`);
      throw new NotFoundException('Usuário não encontrado');
    }

    const reserva = new Reserva(body);
    reserva.usuario = usuario;
    campo.reservas.push(reserva);
    this.logger.log(`Reserva created and added to campo with id ${id}`);
    return this.camposRepository.save(campo);
  }

  async update(id: number, campo: Partial<Campo>): Promise<Campo> {
    await this.camposRepository.update(id, campo);
    return this.camposRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.camposRepository.softDelete(id);
  }
}
