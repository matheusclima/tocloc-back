import { Module } from '@nestjs/common';
import { CamposController } from './campos.controller';
import { CamposService } from './campos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campo } from './campos.entity';
import { Usuario } from '../usuarios/usuarios.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Campo, Usuario])],
  controllers: [CamposController],
  providers: [CamposService],
})
export class CamposModule {}
