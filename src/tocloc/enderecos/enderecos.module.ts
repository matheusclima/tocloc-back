import { Module } from '@nestjs/common';
import { EnderecosController } from './enderecos.controller';
import { EnderecosService } from './enderecos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Endereco } from './enderecos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Endereco])],
  providers: [EnderecosService],
  controllers: [EnderecosController],
})
export class EnderecosModule {}
