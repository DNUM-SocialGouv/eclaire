import { errors } from '@elastic/elasticsearch'

import { EtlService } from './EtlService'
import { LoggerService } from '../../shared/logger/LoggerService'
import { ResearchStudyModel } from '../../shared/models/fhir/ResearchStudyModel'
import { riphCtisDto, setupClientAndElasticsearchService } from '../../shared/test/helpers/elasticsearchHelper'

describe('extract transform load service', () => {
  describe('when index is created', () => {
    it('should not create an index when create has failed with ResponseError', async () => {
      // GIVEN
      const { client, etlService } = await setup()
      // @ts-ignore
      vi.spyOn(client.indices, 'create').mockRejectedValueOnce(new errors.ResponseError({ body: { error: { reason: 'ES create operation has failed' } } }))

      try {
        // WHEN
        await etlService.createIndex()
        throw new Error('Should not be triggered')
      } catch (error) {
        // THEN
        // @ts-ignore
        expect(error.message).toBe('ES create operation has failed')
        expect(error).toBeInstanceOf(Error)
      }
    })

    it('should not create an index when create has failed with ElasticsearchClientError', async () => {
      // GIVEN
      const { client, etlService } = await setup()
      // @ts-ignore
      vi.spyOn(client.indices, 'create').mockRejectedValueOnce(new errors.ElasticsearchClientError('ES create operation has failed'))

      try {
        // WHEN
        await etlService.createIndex()
        throw new Error('Should not be triggered')
      } catch (error) {
        // THEN
        // @ts-ignore
        expect(error.message).toBe('ES create operation has failed')
        expect(error).toBeInstanceOf(Error)
      }
    })
  })

  describe('when import is performed', () => {
    it('should find data for each clinical trials type (CTIS, DM, JARDE)', async () => {
      // GIVEN
      const { elasticsearchService, etlService } = await setup()
      await etlService.createIndex()

      // WHEN
      await etlService.import()

      // THEN
      const ctisResearchStudy = await elasticsearchService.findOneDocument<ResearchStudyModel>(riphCtisDto[0].numero_ctis)
      expect(ctisResearchStudy).not.toBeNull()

      // const dmResearchStudy = await elasticsearchService.findOneDocument<ResearchStudyModel>(riphDmDto[0].numero_national)
      // const jarde1ResearchStudy = await elasticsearchService.findOneDocument<ResearchStudyModel>(riphJardeDto1[0].numero_national)
      // const jarde2ResearchStudy = await elasticsearchService.findOneDocument<ResearchStudyModel>(riphJardeDto2[0].numero_national)
      // expect(dmResearchStudy).not.toBeNull()
      // expect(jarde1ResearchStudy).not.toBeNull()
      // expect(jarde2ResearchStudy).not.toBeNull()
    })

    it('should not create some clinical trials when bulk has failed with ResponseError', async () => {
      // GIVEN
      const { client, etlService } = await setup()
      await etlService.createIndex()
      // @ts-ignore
      vi.spyOn(client, 'bulk').mockRejectedValueOnce(new errors.ResponseError({ body: { error: { reason: 'ES bulk operation has failed' } } }))

      try {
        // WHEN
        await etlService.import()
        throw new Error('Should not be triggered')
      } catch (error) {
        // THEN
        // @ts-ignore
        expect(error.message).toBe('ES bulk operation has failed')
        expect(error).toBeInstanceOf(Error)
      }
    })

    it('should not create some clinical trials when bulk has failed with ElasticsearchClientError', async () => {
      // GIVEN
      const { client, etlService } = await setup()
      await etlService.createIndex()
      // @ts-ignore
      vi.spyOn(client, 'bulk').mockRejectedValueOnce(new errors.ElasticsearchClientError('ES bulk operation has failed'))

      try {
        // WHEN
        await etlService.import()
        throw new Error('Should not be triggered')
      } catch (error) {
        // THEN
        // @ts-ignore
        expect(error.message).toBe('ES bulk operation has failed')
        expect(error).toBeInstanceOf(Error)
      }
    })
  })
})

async function setup() {
  const {
    client,
    elasticsearchService,
  } = await setupClientAndElasticsearchService()
  const logger = new LoggerService()
  vi.spyOn(logger, 'info').mockImplementation(() => {
    return
  })

  //const etlService = new EtlService(logger, elasticsearchService, riphCtisDto, riphDmDto, riphJardeDto1, riphJardeDto2)
  const etlService = new EtlService(logger, elasticsearchService, riphCtisDto)

  return { client, elasticsearchService, etlService }
}
