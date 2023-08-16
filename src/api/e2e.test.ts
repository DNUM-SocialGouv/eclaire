import { ConfigModule } from '@nestjs/config'
import { NestExpressApplication } from '@nestjs/platform-express'
import { Test } from '@nestjs/testing'
import supertest from 'supertest'

import { AppModule } from '../AppModule'
import { EclaireDto } from '../etl/dto/EclaireDto'
import { ResearchStudyModelFactory } from '../etl/factory/ResearchStudyModelFactory'
import { ElasticsearchService } from '../shared/elasticsearch/ElasticsearchService'
import { RiphDtoTestFactory } from 'src/shared/test/helpers/RiphDtoTestFactory'

describe('app', () => {
  it('should retrieve one research study', async () => {
    // WHEN
    const response = await supertest(await getHttpServer())
      .get('/R4/ResearchStudy/fakeId1')

    // THEN
    expect(response.statusCode).toBe(200)
    expect(response.get('content-type')).toBe('application/fhir+json; charset=utf-8')
    await expect(response.text).toMatchFileSnapshot('../shared/test/snapshots/ResearchStudy.snap.json')
  })

  it('should not retrieve one research study when an unknown id is given', async () => {
    // WHEN
    const response = await supertest(await getHttpServer())
      .get('/R4/ResearchStudy/999999')

    // THEN
    expect(response.statusCode).toBe(404)
    expect(response.text).toBe('{"issue":[{"code":"processing","diagnostics":"Response Error","severity":"error"}],"resourceType":"OperationOutcome"}')
  })

  it('should retrieve researches study when good filter is given', async () => {
    // WHEN
    const response = await supertest(await getHttpServer())
      .get('/R4/ResearchStudy?_lastUpdated=2023-04-12')

    // THEN
    expect(response.statusCode).toBe(200)
    expect(response.get('content-type')).toBe('application/fhir+json; charset=utf-8')
    await expect(response.text).toMatchFileSnapshot('../shared/test/snapshots/Bundle.snap.json')
  })

  it('should not retrieve researches study when wrong filter is given', async () => {
    // WHEN
    const response = await supertest(await getHttpServer())
      .get('/R4/ResearchStudy?_lastUpdated=d')

    // THEN
    expect(response.statusCode).toBe(400)
    expect(response.text).toBe('{"issue":[{"code":"processing","diagnostics":"failed to parse date field [d] with format [strict_date_optional_time||epoch_millis]: [failed to parse date field [d] with format [strict_date_optional_time||epoch_millis]]","severity":"error"}],"resourceType":"OperationOutcome"}')
  })
})

async function getHttpServer() {
  const moduleFixture = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({ envFilePath: ['.env.end2end.test'] }),
      AppModule,
    ],
  }).compile()

  const app = moduleFixture.createNestApplication<NestExpressApplication>()
  await app.init()

  const elasticsearchService = app.get<ElasticsearchService>(ElasticsearchService)
  await elasticsearchService.deleteAnIndex()
  const eclaireDto1: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis())
  const eclaireDto2: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.emptyCtis())

  await elasticsearchService.bulkDocuments([
    { index: { _id: 'fakeId1' } },
    ResearchStudyModelFactory.create(eclaireDto1),
    { index: { _id: 'fakeId2' } },
    ResearchStudyModelFactory.create(eclaireDto2),
  ])

  return app.getHttpServer()
}
