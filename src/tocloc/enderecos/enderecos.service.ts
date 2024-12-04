import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Endereco } from './enderecos.entity';
import { CriarEnderecoDto } from './dto/criar-endereco.dto';

@Injectable()
export class EnderecosService {
  constructor(
    @InjectRepository(Endereco)
    private readonly enderecosRepository: Repository<Endereco>,
  ) {}

  async findAll(): Promise<Endereco[]> {
    return this.enderecosRepository.find();
  }

  async findOne(id: number): Promise<Endereco> {
    return this.enderecosRepository.findOne({ where: { id } });
  }

  async create(endereco: CriarEnderecoDto): Promise<Endereco> {
    return this.enderecosRepository.save(endereco);
  }

  async update(id: number, endereco: Partial<Endereco>): Promise<Endereco> {
    await this.enderecosRepository.update(id, endereco);
    return this.enderecosRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.enderecosRepository.delete(id);
  }
}
