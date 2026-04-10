import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Loja de Games')
  .setDescription('Api da loja de games')
  .setContact(
    'Alesson Carlos',
      'https://github.com/AlessonCarlos',
      ''
  )
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  //Configura o fuso horário para o horário de brasilia
  process.env.TZ = '-03:00';

  //Habilita a validação global (essencial para validar perços e nomse de games)
  app.useGlobalPipes(new ValidationPipe());

  //Habilita o Cors para que seu Front consiga acessar a API
  app.enableCors();
  
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
