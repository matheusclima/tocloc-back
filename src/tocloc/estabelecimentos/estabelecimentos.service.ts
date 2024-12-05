import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Estabelecimento } from './estabelecimentos.entity';
import { Repository } from 'typeorm';
import { CriarEstabelecimentoDto } from './dto/criar-estabelecimento.dto';
import { Endereco } from '../enderecos/enderecos.entity';
import { Usuario } from '../usuarios/usuarios.entity';
import { Campo } from '../campos/campos.entity';
import { Reserva } from '../reservas/reservas.entity';

@Injectable()
export class EstabelecimentosService {
  constructor(
    @InjectRepository(Estabelecimento)
    private readonly estabelecimentosRepository: Repository<Estabelecimento>,

    @InjectRepository(Endereco)
    private readonly enderecosRepository: Repository<Endereco>,

    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<Estabelecimento[]> {
    return this.estabelecimentosRepository.find({ relations: ['endereco'] });
  }

  async findOne(id: number): Promise<Estabelecimento> {
    return this.estabelecimentosRepository.findOne({
      where: { id },
      relations: ['campos'],
    });
  }

  async findReservas(id: number): Promise<Reserva[]> {
    const estabelecimento = await this.estabelecimentosRepository.findOne({
      where: { id },
      relations: [
        'campos',
        'campos.reservas',
        'campos.reservas.usuario',
        'campos.reservas.campo',
      ], // Carrega todas as relações necessárias
    });

    if (!estabelecimento) {
      throw new NotFoundException('Estabelecimento não encontrado');
    }

    // Extrai as reservas de todos os campos do estabelecimento
    const reservas = estabelecimento.campos.flatMap((campo) => campo.reservas);

    return reservas;
  }

  async create(
    estabelecimentoDto: CriarEstabelecimentoDto,
  ): Promise<Estabelecimento> {
    const { endereco, usuarioId, ...estabelecimento } = estabelecimentoDto;
    const novoEndereco = new Endereco(endereco);

    // 2. Salvar o endereço
    const enderecoSalvo = await this.enderecosRepository.save(novoEndereco);

    // 3. Encontrar o usuário pelo ID
    const usuario = await this.usuariosRepository.findOne({
      where: { id: usuarioId },
    });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // 4. Criar o estabelecimento
    const novoEstabelecimento = new Estabelecimento(estabelecimento);
    novoEstabelecimento.usuario = usuario;
    novoEstabelecimento.endereco = enderecoSalvo;

    // 5. Salvar o estabelecimento
    return await this.estabelecimentosRepository.save(novoEstabelecimento);
  }

  async criarCampo(
    id: number,
    campo: Partial<Campo>,
  ): Promise<Estabelecimento> {
    const estabelecimento = await this.estabelecimentosRepository.findOne({
      where: { id },
      relations: ['campos'],
    });

    if (!estabelecimento) {
      throw new NotFoundException('Estabelecimento não encontrado');
    }

    const novoCampo = new Campo(campo);
    estabelecimento.campos.push(novoCampo);

    return await this.estabelecimentosRepository.save(estabelecimento);
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
