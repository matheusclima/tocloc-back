import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/tocloc/usuarios/usuarios.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async login(credentials: LoginDto) {
    this.logger.log(
      `Attempting to log in user with email: ${credentials.email}`,
    );
    const usuario = await this.usuarioRepository.findOne({
      where: { email: credentials.email },
    });

    if (!usuario || !bcrypt.compareSync(credentials.senha, usuario.senha)) {
      this.logger.warn(
        `Invalid credentials for user with email: ${credentials.email}`,
      );
      throw new UnauthorizedException();
    }
    this.logger.log(
      `User with email: ${credentials.email} logged in successfully`,
    );
    return {
      id: usuario.id,
      email: usuario.email,
      nome: usuario.nome,
      tipo: usuario.tipo,
      endereco: usuario.endereco || null,
    };
  }
}
