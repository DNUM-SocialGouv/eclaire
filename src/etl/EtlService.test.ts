import { errors } from '@elastic/elasticsearch'
import fs from 'fs'

import { EtlService } from './EtlService'
import { setupClientAndElasticsearchService } from '../shared/test/helpers/elasticsearchHelper'
import { RiphDtoTestFactory } from 'src/shared/test/helpers/RiphDtoTestFactory'

describe('extract transform load service', () => {
  describe('when index is created', () => {
    it('should not create an index when create has failed with ResponseError', async () => {
      // GIVEN
      const { client, etlService } = await setup()
      vi.spyOn(client.indices, 'create').mockRejectedValueOnce(new errors.ResponseError({
        body: { error: { reason: 'ES create operation has failed' } },
        headers: null,
        meta: null,
        statusCode: null,
        warnings: null,
      }))

      // WHEN
      // THEN
      await expect(etlService.createIndex()).rejects.toThrow('ES create operation has failed')
    })

    it('should not create an index when create has failed with ElasticsearchClientError', async () => {
      // GIVEN
      const { client, etlService } = await setup()
      vi.spyOn(client.indices, 'create').mockRejectedValueOnce(new errors.ElasticsearchClientError('ES create operation has failed'))

      // WHEN
      // THEN
      await expect(etlService.createIndex()).rejects.toThrow('ES create operation has failed')
    })
  })

  describe('when index is deleted', () => {
    it('should not delete an index when delete has failed with ResponseError', async () => {
      // GIVEN
      const { client, etlService } = await setup()
      vi.spyOn(client.indices, 'delete').mockRejectedValueOnce(new errors.ResponseError({
        body: { error: { reason: 'ES delete operation has failed' } },
        headers: null,
        meta: null,
        statusCode: null,
        warnings: null,
      }))

      // WHEN
      // THEN
      await expect(etlService.deleteIndex()).rejects.toThrow('ES delete operation has failed')
    })

    it('should not delete an index when delete has failed with ElasticsearchClientError', async () => {
      // GIVEN
      const { client, etlService } = await setup()
      vi.spyOn(client.indices, 'delete').mockRejectedValueOnce(new errors.ElasticsearchClientError('ES delete operation has failed'))

      // WHEN
      // THEN
      await expect(etlService.deleteIndex()).rejects.toThrow('ES delete operation has failed')
    })
  })

  describe('when import is performed', () => {
    it('should find data for each clinical trials type (CTIS, DM, JARDE)', async () => {
      // GIVEN
      const { elasticsearchService, etlService, readerService } = await setup()
      await etlService.deleteIndex()
      await etlService.createIndex()

      // WHEN
      await etlService.import()

      // THEN
      expect(readerService.read).toHaveBeenNthCalledWith(1, 'export_eclaire_ctis.json')
      expect(readerService.read).toHaveBeenNthCalledWith(2, 'export_eclaire_dm-dmdiv.json')
      expect(readerService.read).toHaveBeenNthCalledWith(3, 'export_eclaire_jarde.json')

      const ctisResearchStudy = await elasticsearchService.findOneDocument(RiphDtoTestFactory.ctis().numero_ctis)
      const dmResearchStudy = await elasticsearchService.findOneDocument(RiphDtoTestFactory.dm().numero_national)
      const jardeResearchStudy = await elasticsearchService.findOneDocument(RiphDtoTestFactory.jarde().numero_national)

      expect(ctisResearchStudy).not.toBeNull()
      expect(dmResearchStudy).not.toBeNull()
      expect(jardeResearchStudy).not.toBeNull()
    })

    it('should not create some clinical trials when bulk has failed with ResponseError', async () => {
      // GIVEN
      const { client, etlService } = await setup()
      await etlService.createIndex()
      vi.spyOn(client, 'bulk').mockRejectedValueOnce(new errors.ResponseError({
        body: { error: { reason: 'ES bulk operation has failed' } },
        headers: null,
        meta: null,
        statusCode: null,
        warnings: null,
      }))

      // WHEN
      // THEN
      await expect(etlService.import()).rejects.toThrow('ES bulk operation has failed')
    })

    it('should not create some clinical trials when bulk has failed with ElasticsearchClientError', async () => {
      // GIVEN
      const { client, etlService } = await setup()
      await etlService.createIndex()
      vi.spyOn(client, 'bulk').mockRejectedValueOnce(new errors.ElasticsearchClientError('ES bulk operation has failed'))

      // WHEN
      // THEN
      await expect(etlService.import()).rejects.toThrow('ES bulk operation has failed')
    })
  })

  describe('when import medDra data', () => {
    it('should find MedDra codes and labels', async () => {
      // GIVEN
      const { elasticsearchService, etlService } = await setup()
      const medDraFile = '10000001$Pneumopathie due à la ventilation$10081988$$$$$$$N$$\n10000002$Déficience en 11-bêta-hydroxylase$10000002$$$$$$$Y$$'
      vi.spyOn(fs, 'readFileSync').mockReturnValueOnce(medDraFile)

      // WHEN
      await etlService.medDraImport()

      // THEN
      const medDraCode1 = await elasticsearchService.findMedDraDocument('10000001')
      expect(medDraCode1).toStrictEqual({
        code: '10000001',
        label: 'Pneumopathie due à la ventilation',
      })

      const medDraCode2 = await elasticsearchService.findMedDraDocument('10000002')
      expect(medDraCode2).toStrictEqual({
        code: '10000002',
        label: 'Déficience en 11-bêta-hydroxylase',
      })
    })

    it('should not create some MedDra labels when bulk has failed with ResponseError', async () => {
      // GIVEN
      const { client, etlService } = await setup()
      vi.spyOn(client, 'bulk').mockRejectedValueOnce(new errors.ResponseError({
        body: { error: { reason: 'ES bulk operation has failed' } },
        headers: null,
        meta: null,
        statusCode: null,
        warnings: null,
      }))

      // WHEN
      // THEN
      await expect(etlService.medDraImport()).rejects.toThrow('ES bulk operation has failed')
    })

    it('should not create some MedDra labels when bulk has failed with ElasticsearchClientError', async () => {
      // GIVEN
      const { client, etlService } = await setup()
      vi.spyOn(client, 'bulk').mockRejectedValueOnce(new errors.ElasticsearchClientError('ES bulk operation has failed'))

      // WHEN
      // THEN
      await expect(etlService.medDraImport()).rejects.toThrow('ES bulk operation has failed')
    })
  })
})

async function setup() {
  const {
    client,
    elasticsearchService,
    logger,
    readerService,
  } = await setupClientAndElasticsearchService()
  vi.spyOn(readerService, 'read')
    .mockResolvedValueOnce([RiphDtoTestFactory.ctis()])
    .mockResolvedValueOnce([RiphDtoTestFactory.dm()])
    .mockResolvedValueOnce([RiphDtoTestFactory.jarde()])

  const etlService = new EtlService(logger, elasticsearchService, readerService)

  return { client, elasticsearchService, etlService, readerService }
}
