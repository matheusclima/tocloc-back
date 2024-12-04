import { Module } from '@nestjs/common';
import { EstabelecimentosController } from './estabelecimentos.controller';
import { EstabelecimentosService } from './estabelecimentos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estabelecimento } from './estabelecimentos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estabelecimento])],
  controllers: [EstabelecimentosController],
  providers: [EstabelecimentosService],
})
export class EstabelecimentosModule {}
