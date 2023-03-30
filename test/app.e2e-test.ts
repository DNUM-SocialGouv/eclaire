import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import supertest from 'supertest'

import { AppModule } from '../src/app.module'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [AppModule] }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/ (GET)', async () => {
    await supertest(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!')
  })
})
