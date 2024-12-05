import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './usuarios.entity';
import { Repository } from 'typeorm';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';
import * as bcrypt from 'bcryptjs';
import { Estabelecimento } from '../estabelecimentos/estabelecimentos.entity';
import { Endereco } from '../enderecos/enderecos.entity';

@Injectable()
export class UsuariosService {
  private readonly logger = new Logger(UsuariosService.name);

  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<Usuario[]> {
    return this.usuariosRepository.find();
  }

  async findOne(id: number): Promise<Usuario> {
    return this.usuariosRepository.findOne({ where: { id } });
  }

  async findEstabelecimentos(id: number): Promise<Estabelecimento[]> {
    const usuario = await this.usuariosRepository.findOne({
      where: { id },
      relations: [
        'estabelecimentos',
        'estabelecimentos.endereco',
        'estabelecimentos.campos',
      ],
    });

    return usuario.estabelecimentos;
  }

  async create(criarUsuarioDto: CriarUsuarioDto): Promise<Usuario> {
    this.logger.log(`Creating a new user with email: ${criarUsuarioDto.email}`);
    const existingUser = await this.usuariosRepository.findOne({
      where: { email: criarUsuarioDto.email },
    });
    if (existingUser) {
      this.logger.warn(
        `User with email ${criarUsuarioDto.email} already exists`,
      );
      throw new ConflictException('Usuário já existe');
    }
    const novoUsuario = new Usuario(criarUsuarioDto);
    const salt = await bcrypt.genSalt(10);
    this.logger.log(`Generated salt for user: ${novoUsuario.email}`);
    novoUsuario.senha = await bcrypt.hash(novoUsuario.senha, salt);
    this.logger.log(`Hashed password for user: ${novoUsuario.email}`);
    const savedUser = await this.usuariosRepository.save(novoUsuario);
    this.logger.log(
      `User with email ${criarUsuarioDto.email} created successfully`,
    );
    delete savedUser.senha;
    return savedUser;
  }

  async update(
    id: number,
    usuario: Partial<Usuario>,
  ): Promise<Partial<Usuario>> {
    const novoUsuario = await this.usuariosRepository.findOne({
      where: { id },
      relations: ['endereco'],
    });
    if (!novoUsuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (!novoUsuario.endereco) {
      novoUsuario.endereco = new Endereco({
        rua: usuario.endereco.rua,
        bairro: usuario.endereco.bairro,
        cidade: usuario.endereco.cidade,
        cep: usuario.endereco.cep,
        numero: usuario.endereco.numero,
      });
    } else {
      novoUsuario.endereco.rua = usuario.endereco.rua;
      novoUsuario.endereco.bairro = usuario.endereco.bairro;
      novoUsuario.endereco.cidade = usuario.endereco.cidade;
      novoUsuario.endereco.cep = usuario.endereco.cep;
      novoUsuario.endereco.numero = usuario.endereco.numero;
    }

    novoUsuario.nome = usuario.nome;
    novoUsuario.email = usuario.email;
    novoUsuario.telefone = usuario.telefone;
    await this.usuariosRepository.save(novoUsuario);
    return {
      id: novoUsuario.id,
      nome: novoUsuario.nome,
      email: novoUsuario.email,
      telefone: novoUsuario.telefone,
      endereco: novoUsuario.endereco,
    };
  }

  async delete(id: number): Promise<void> {
    await this.usuariosRepository.softDelete(id);
  }
}
