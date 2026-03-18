import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Configura o fuso horário para o horário de brasilia
  process.env.TZ = '-03:00';

  //Habilita a validação global (essencial para validar perços e nomse de games)
  app.useGlobalPipes(new ValidationPipe());

  //Habilita o Cors para que seu Front consiga acessar a API
  app.enableCors();
  
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
