import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campo } from './campos.entity';
import { CriarCampoDto } from './dto/criar-campos.dto';

@Injectable()
export class CamposService {
  constructor(
    @InjectRepository(Campo)
    private readonly camposRepository: Repository<Campo>,
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

  async update(id: number, campo: Partial<Campo>): Promise<Campo> {
    await this.camposRepository.update(id, campo);
    return this.camposRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.camposRepository.softDelete(id);
  }
}
