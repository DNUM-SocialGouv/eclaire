import { errors } from '@elastic/elasticsearch'

import { FhirEtlService } from './FhirEtlService'
import { LoggerService } from '../shared/logger/LoggerService'
import { ResearchStudyModel } from '../shared/models/fhir/ResearchStudyModel'
import { riphCtisDto, riphDmDto, riphJardeDto1, riphJardeDto2, setupClientAndElasticsearchService } from '../shared/test/helpers/elasticsearchHelper'

describe('extract transform load service', () => {
  describe('when index is created', () => {
    it('should not create an index when create has failed with ResponseError', async () => {
      // GIVEN
      const { client, etlService } = await setup()
      // @ts-ignore
      vi.spyOn(client.indices, 'create').mockRejectedValueOnce(new errors.ResponseError({ body: { error: { reason: 'ES create operation has failed' } } }))

      // WHEN
      // THEN
      await expect(etlService.createIndex()).rejects.toThrow('ES create operation has failed')
    })

    it('should not create an index when create has failed with ElasticsearchClientError', async () => {
      // GIVEN
      const { client, etlService } = await setup()
      // @ts-ignore
      vi.spyOn(client.indices, 'create').mockRejectedValueOnce(new errors.ElasticsearchClientError('ES create operation has failed'))

      // WHEN
      // THEN
      await expect(etlService.createIndex()).rejects.toThrow('ES create operation has failed')
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
      const dmClinicalTrial = await elasticsearchService.findOneDocument<ResearchStudyModel>(riphDmDto[0].numero_national)
      const jarde1ClinicalTrial = await elasticsearchService.findOneDocument<ResearchStudyModel>(riphJardeDto1[0].numero_national)
      const jarde2ClinicalTrial = await elasticsearchService.findOneDocument<ResearchStudyModel>(riphJardeDto2[0].numero_national)

      expect(ctisResearchStudy).not.toBeNull()
      expect(dmClinicalTrial).not.toBeNull()
      expect(jarde1ClinicalTrial).not.toBeNull()
      expect(jarde2ClinicalTrial).not.toBeNull()
    })

    it('should not find "RAPATRIEE_CTIS" because its a duplicate', async () => {
      // GIVEN
      const { elasticsearchService, etlService } = await setup()
      await etlService.createIndex()

      // WHEN
      await etlService.import()

      // THEN
      const excludeJarde = riphJardeDto2[1].numero_national
      await expect(elasticsearchService.findOneDocument<ResearchStudyModel>(excludeJarde)).rejects.toThrow('Response Error')
    })

    it('should not create some clinical trials when bulk has failed with ResponseError', async () => {
      // GIVEN
      const { client, etlService } = await setup()
      await etlService.createIndex()
      // @ts-ignore
      vi.spyOn(client, 'bulk').mockRejectedValueOnce(new errors.ResponseError({ body: { error: { reason: 'ES bulk operation has failed' } } }))

      // WHEN
      // THEN
      await expect(etlService.import()).rejects.toThrow('ES bulk operation has failed')
    })

    it('should not create some clinical trials when bulk has failed with ElasticsearchClientError', async () => {
      // GIVEN
      const { client, etlService } = await setup()
      await etlService.createIndex()
      // @ts-ignore
      vi.spyOn(client, 'bulk').mockRejectedValueOnce(new errors.ElasticsearchClientError('ES bulk operation has failed'))

      // WHEN
      // THEN
      await expect(etlService.import()).rejects.toThrow('ES bulk operation has failed')
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

  const etlService = new FhirEtlService(logger, elasticsearchService, riphCtisDto, riphDmDto, riphJardeDto1, riphJardeDto2)

  return { client, elasticsearchService, etlService }
}
