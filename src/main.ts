import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  //Habilitando CORS
  const allowedOrigins = ['http://localhost:5050', 'http://localhost:3000'];

  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Access-Control-Allow-Headers',
      'Authorization',
    ],
    exposedHeaders: ['Set-Cookie'],
    credentials: true,
  });

  await app.listen(8080);
}
bootstrap();
