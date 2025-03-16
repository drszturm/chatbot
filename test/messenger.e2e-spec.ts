import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/api/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  let basePath: '/messenger'
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ Webhook', () => {
    return request(app.getHttpServer())
      .post(`${basePath}/webhook`)
      .send({
        phone: '',
        text: '',
        groupId: '',
      })
      .expect(400);
  });
});
