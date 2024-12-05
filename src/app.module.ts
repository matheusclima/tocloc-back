import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './tocloc/usuarios/usuarios.module';
import { EstabelecimentosModule } from './tocloc/estabelecimentos/estabelecimentos.module';
import { EnderecosModule } from './tocloc/enderecos/enderecos.module';
import { CamposModule } from './tocloc/campos/campos.module';
import { ReservasModule } from './tocloc/reservas/reservas.module';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsuariosModule,
    EstabelecimentosModule,
    EnderecosModule,
    CamposModule,
    ReservasModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
