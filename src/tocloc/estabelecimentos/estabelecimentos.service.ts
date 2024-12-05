import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Estabelecimento } from './estabelecimentos.entity';
import { Repository } from 'typeorm';
import { CriarEstabelecimentoDto } from './dto/criar-estabelecimento.dto';
import { Endereco } from '../enderecos/enderecos.entity';
import { Usuario } from '../usuarios/usuarios.entity';

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
