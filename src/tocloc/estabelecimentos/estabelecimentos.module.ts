import { Module } from '@nestjs/common';
import { EstabelecimentosController } from './estabelecimentos.controller';
import { EstabelecimentosService } from './estabelecimentos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estabelecimento } from './estabelecimentos.entity';
import { Usuario } from '../usuarios/usuarios.entity';
import { Endereco } from '../enderecos/enderecos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estabelecimento, Usuario, Endereco])],
  controllers: [EstabelecimentosController],
  providers: [EstabelecimentosService],
})
export class EstabelecimentosModule {}
