import { errors } from '@elastic/elasticsearch'

import { EtlService } from './EtlService'
import { LoggerService } from '../shared/logger/LoggerService'
import { ClinicalTrialModel } from '../shared/models/ClinicalTrialModel'
import { riphCtisDto, riphDmDto, riphJardeDto1, riphJardeDto2, setupClientAndElasticsearchService } from '../shared/test/helpers/elasticsearchHelper'

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
      const ctisClinicalTrial = await elasticsearchService.findOneDocument<ClinicalTrialModel>(riphCtisDto[0].numero_ctis)
      const dmClinicalTrial = await elasticsearchService.findOneDocument<ClinicalTrialModel>(riphDmDto[0].numero_national)
      const jarde1ClinicalTrial = await elasticsearchService.findOneDocument<ClinicalTrialModel>(riphJardeDto1[0].numero_national)
      const jarde2ClinicalTrial = await elasticsearchService.findOneDocument<ClinicalTrialModel>(riphJardeDto2[0].numero_national)

      expect(ctisClinicalTrial).not.toBeNull()
      expect(dmClinicalTrial).not.toBeNull()
      expect(jarde1ClinicalTrial).not.toBeNull()
      expect(jarde2ClinicalTrial).not.toBeNull()
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

  const etlService = new EtlService(logger, elasticsearchService, riphCtisDto, riphDmDto, riphJardeDto1, riphJardeDto2)

  return { client, elasticsearchService, etlService }
}
