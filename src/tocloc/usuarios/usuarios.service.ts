import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './usuarios.entity';
import { Repository } from 'typeorm';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';

@Injectable()
export class UsuariosService {
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

  async create(criarUsuarioDto: CriarUsuarioDto): Promise<Usuario> {
    const novoUsuario = new Usuario(criarUsuarioDto);
    return this.usuariosRepository.save(novoUsuario);
  }

  async update(id: number, usuario: Partial<Usuario>): Promise<Usuario> {
    await this.usuariosRepository.update(id, usuario);
    return this.usuariosRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.usuariosRepository.softDelete(id);
  }
}
