import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('Testes e2e - Usuário e Auth (Loja de Games)', () => {

  let app: INestApplication;
  let token: string;
  let usuarioId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [__dirname + "/../src/**/entities/*.entity{.ts,.js}"],
          synchronize: true,
          dropSchema: true,
        }),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('01 - Deve cadastrar um novo usuário', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: 'Alesson M',
        usuario: 'alesson@email.com',
        senha: 'senhaSegura123',
        
      })
      .expect(201);

    usuarioId = resposta.body.id;
  });

  it('02 - Não deve cadastrar usuário duplicado', async () => {
    await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: 'Alesson M',
        usuario: 'alesson@email.com',
        senha: 'senhaSegura123',
      
      })
      .expect(400);
  });

  it('03 - Deve autenticar o usuário (login)', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/auth/logar')
      .send({
        usuario: 'alesson@email.com',
        senha: 'senhaSegura123',
      })
      .expect(200);

    // Ajuste caso o token venha em um objeto diferente
    token = resposta.body.token;
    expect(token).toBeDefined();
  });

  it('04 - Deve listar todos os usuários', async () => {
    return request(app.getHttpServer())
      .get('/usuarios/all')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('05 - Deve atualizar um usuário', async () => {
    return request(app.getHttpServer())
      .put('/usuarios/atualizar')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: usuarioId,
        nome: 'Alesson M Atualizado',
        usuario: 'alesson@email.com',
        senha: 'senhaSegura123',
        
      })
      .expect(201)
      .then(resposta => {
        expect(resposta.body.nome).toEqual('Alesson M Atualizado');
      });
  });

});