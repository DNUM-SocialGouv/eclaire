import { ConfigModule } from '@nestjs/config'
import { NestExpressApplication } from '@nestjs/platform-express'
import { Test } from '@nestjs/testing'
import supertest from 'supertest'

import { AppModule } from '../AppModule'
import { EclaireDto } from '../etl/dto/EclaireDto'
import { ResearchStudyModelFactory } from '../etl/factory/ResearchStudyModelFactory'
import { ElasticsearchService } from '../shared/elasticsearch/ElasticsearchService'
import { RiphDtoTestFactory } from 'src/shared/test/helpers/RiphDtoTestFactory'

const BASE_URL = '/R4/ResearchStudy/'
const DOCUMENT_ID = '2022-500014-26-00'

describe('app', () => {
  it('should retrieve one research study', async () => {
    // WHEN
    const response = await supertest(await getHttpServer())
      .get(BASE_URL + DOCUMENT_ID)

    // THEN
    expect(response.statusCode).toBe(200)
    expect(response.get('content-type')).toBe('application/fhir+json; charset=utf-8')
    await expect(response.text).toMatchFileSnapshot('../shared/test/snapshots/ResearchStudy.snap.json')
  })

  it('should not retrieve one research study when an unknown id is given', async () => {
    // GIVEN
    const unknownDocumentId = '999999'

    // WHEN
    const response = await supertest(await getHttpServer())
      .get(BASE_URL + unknownDocumentId)

    // THEN
    expect(response.statusCode).toBe(404)
    expect(response.text).toBe('{"issue":[{"code":"processing","diagnostics":"Response Error","severity":"error"}],"resourceType":"OperationOutcome"}')
  })

  it('should retrieve researches study when good filter is given', async () => {
    // GIVEN
    const filter = '?_lastUpdated=2023-04-12'

    // WHEN
    const response = await supertest(await getHttpServer())
      .get(BASE_URL + filter)

    // THEN
    expect(response.statusCode).toBe(200)
    expect(response.get('content-type')).toBe('application/fhir+json; charset=utf-8')
    await expect(response.text).toMatchFileSnapshot('../shared/test/snapshots/Bundle.snap.json')
  })

  it('should not retrieve researches study when wrong filter is given', async () => {
    // GIVEN
    const wrongFilter = '?_lastUpdated=d'

    // WHEN
    const response = await supertest(await getHttpServer())
      .get(BASE_URL + wrongFilter)

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
  const eclaireDto1: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({ numero_ctis: DOCUMENT_ID }))
  const eclaireDto2: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.emptyCtis())

  await elasticsearchService.bulkDocuments([
    ResearchStudyModelFactory.create(eclaireDto1),
    ResearchStudyModelFactory.create(eclaireDto2),
  ])

  return app.getHttpServer()
}
