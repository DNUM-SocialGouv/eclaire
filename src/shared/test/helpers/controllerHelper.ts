import { ConfigModule } from '@nestjs/config'
import { NestExpressApplication } from '@nestjs/platform-express'
import { Test } from '@nestjs/testing'

import { RiphDtoTestFactory } from './RiphDtoTestFactory'
import { AppModule } from '../../../AppModule'
import { EclaireDto } from '../../../etl/dto/EclaireDto'
import { ResearchStudyModelFactory } from '../../../etl/factory/ResearchStudyModelFactory'
import { ElasticsearchService } from '../../elasticsearch/ElasticsearchService'

export const CONTROLLER_DOCUMENT_ID = '2022-500014-26-00'

export async function getHttpServer() {
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
  const eclaireDto1: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({ numero_ctis: CONTROLLER_DOCUMENT_ID }))
  const eclaireDto2: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.emptyCtis())

  await elasticsearchService.bulkDocuments([
    ResearchStudyModelFactory.create(eclaireDto1),
    ResearchStudyModelFactory.create(eclaireDto2),
  ])

  return app.getHttpServer()
}
