import { ConfigModule } from '@nestjs/config'
import { NestExpressApplication } from '@nestjs/platform-express'
import { Test } from '@nestjs/testing'

import { RiphDtoTestFactory } from './RiphDtoTestFactory'
import { AppModule } from '../../../AppModule'
import { EclaireDto } from '../../../etl/dto/EclaireDto'
import { ResearchStudyModelFactory } from '../../../etl/factory/ResearchStudyModelFactory'
import { TranslationPipeline } from '../../../etl/pipelines/translation/TranslationPipeline'
import { elasticsearchIndexMapping } from '../../elasticsearch/elasticsearchIndexMapping'
import { ElasticsearchService } from '../../elasticsearch/ElasticsearchService'
import { LocalTranslator } from '../../translation/LocalTranslator'
import { TranslationService } from '../../translation/TranslationService'
import { Translator } from '../../translation/Translator'

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

  const databaseService = app.get<ElasticsearchService>(ElasticsearchService)
  await databaseService.deletePipelines()
  await databaseService.deletePolicies()

  await databaseService.deleteMedDraIndex()
  await databaseService.createMedDraIndex()
  await databaseService.bulkMedDraDocuments([
    {
      code: '10070575',
      label: 'Cancer du sein à récepteurs aux oestrogènes positifs',
    },
    {
      code: '10065430',
      label: 'Cancer du sein HER2 positif',
    },
  ])
  await databaseService.createPolicies()

  await databaseService.deleteAnIndex()
  await databaseService.createAnIndex(elasticsearchIndexMapping)
  const eclaireDto1: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({ numero_ctis: CONTROLLER_DOCUMENT_ID }))
  const eclaireDto2: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.emptyCtis())

  await databaseService.bulkDocuments([
    ResearchStudyModelFactory.create(eclaireDto1),
    ResearchStudyModelFactory.create(eclaireDto2),
  ])

  const translator: Translator = new LocalTranslator()
  const translationService: TranslationService = new TranslationService(translator)
  const translationPipeline: TranslationPipeline = new TranslationPipeline(databaseService, translationService)
  await translationPipeline.execute('1990-01-01')

  return app.getHttpServer()
}
