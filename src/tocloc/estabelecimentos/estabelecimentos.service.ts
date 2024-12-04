import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Estabelecimento } from './estabelecimentos.entity';
import { Repository } from 'typeorm';
import { CriarEstabelecimentoDto } from './dto/criar-estabelecimento.dto';

@Injectable()
export class EstabelecimentosService {
  constructor(
    @InjectRepository(Estabelecimento)
    private readonly estabelecimentosRepository: Repository<Estabelecimento>,
  ) {}

  async findAll(): Promise<Estabelecimento[]> {
    return this.estabelecimentosRepository.find();
  }

  async findOne(id: number): Promise<Estabelecimento> {
    return this.estabelecimentosRepository.findOne({ where: { id } });
  }

  async create(
    estabelecimento: CriarEstabelecimentoDto,
  ): Promise<Estabelecimento> {
    return this.estabelecimentosRepository.save(estabelecimento);
  }

  async update(
    id: number,
    estabelecimento: Partial<Estabelecimento>,
  ): Promise<Estabelecimento> {
    await this.estabelecimentosRepository.update(id, estabelecimento);
    return this.estabelecimentosRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.estabelecimentosRepository.softDelete(id);
  }
}
