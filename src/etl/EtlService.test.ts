import { errors } from '@elastic/elasticsearch'
import { TransportRequestCallback } from '@elastic/elasticsearch/lib/Transport'
import fs from 'fs'

import { EtlService } from './EtlService'
import { setupDependencies } from '../shared/test/helpers/elasticsearchHelper'
import { RiphDtoTestFactory } from '../shared/test/helpers/RiphDtoTestFactory'

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
      const { databaseService, etlService, medDraFile, readerService } = await setup()
      vi.spyOn(readerService, 'read')
        .mockResolvedValueOnce([RiphDtoTestFactory.ctis()])
        .mockResolvedValueOnce([RiphDtoTestFactory.dm()])
        .mockResolvedValueOnce([RiphDtoTestFactory.jarde()])
      vi.spyOn(fs, 'readFileSync').mockReturnValueOnce(medDraFile)
      await etlService.medDraImport()
      await etlService.createIndex()

      // WHEN
      await etlService.import()

      // THEN
      expect(readerService.read).toHaveBeenNthCalledWith(1, 'export_eclaire_ctis.json')
      expect(readerService.read).toHaveBeenNthCalledWith(2, 'export_eclaire_dm-dmdiv.json')
      expect(readerService.read).toHaveBeenNthCalledWith(3, 'export_eclaire_jarde.json')

      const ctisResearchStudy = await databaseService.findOneDocument(RiphDtoTestFactory.ctis().numero_ctis)
      const dmResearchStudy = await databaseService.findOneDocument(RiphDtoTestFactory.dm().numero_national)
      const jardeResearchStudy = await databaseService.findOneDocument(RiphDtoTestFactory.jarde().numero_national)

      expect(ctisResearchStudy).not.toBeNull()
      expect(dmResearchStudy).not.toBeNull()
      expect(jardeResearchStudy).not.toBeNull()
    })

    it('should not create some clinical trials when bulk has failed with ResponseError', async () => {
      // GIVEN
      const { client, etlService, readerService } = await setup()
      vi.spyOn(readerService, 'read')
        .mockResolvedValueOnce([RiphDtoTestFactory.ctis()])
        .mockResolvedValueOnce([RiphDtoTestFactory.dm()])
        .mockResolvedValueOnce([RiphDtoTestFactory.jarde()])
      vi.spyOn(client.indices, 'create').mockResolvedValueOnce({} as unknown as TransportRequestCallback)
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
      const { client, etlService, readerService } = await setup()
      vi.spyOn(readerService, 'read')
        .mockResolvedValueOnce([RiphDtoTestFactory.ctis()])
        .mockResolvedValueOnce([RiphDtoTestFactory.dm()])
        .mockResolvedValueOnce([RiphDtoTestFactory.jarde()])
      vi.spyOn(client.indices, 'create').mockResolvedValueOnce({} as unknown as TransportRequestCallback)
      vi.spyOn(client, 'bulk').mockRejectedValueOnce(new errors.ElasticsearchClientError('ES bulk operation has failed'))

      // WHEN
      // THEN
      await expect(etlService.import()).rejects.toThrow('ES bulk operation has failed')
    })
  })

  describe('when import medDra data', () => {
    it('should find MedDra codes and labels', async () => {
      // GIVEN
      const { databaseService, etlService, medDraFile } = await setup()
      vi.spyOn(fs, 'readFileSync').mockReturnValueOnce(medDraFile)
      vi.spyOn(databaseService, 'createMedDraIndex').mockResolvedValueOnce()
      vi.spyOn(databaseService, 'deleteMedDraIndex').mockResolvedValueOnce()

      // WHEN
      await etlService.medDraImport()

      // THEN
      expect(databaseService.createMedDraIndex).toHaveBeenCalledWith()
      expect(databaseService.deleteMedDraIndex).toHaveBeenCalledWith()

      const medDraCode1 = await databaseService.findMedDraDocument('10000001')
      expect(medDraCode1).toStrictEqual({
        code: '10000001',
        label: 'Pneumopathie due à la ventilation',
      })

      const medDraCode2 = await databaseService.findMedDraDocument('10000002')
      expect(medDraCode2).toStrictEqual({
        code: '10000002',
        label: 'Déficience en 11-bêta-hydroxylase',
      })
    })

    it('should not create some MedDra labels when bulk has failed with ResponseError', async () => {
      // GIVEN
      const { client, etlService } = await setup()
      vi.spyOn(fs, 'readFileSync').mockReturnValueOnce('')
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
      vi.spyOn(fs, 'readFileSync').mockReturnValueOnce('')
      vi.spyOn(client, 'bulk').mockRejectedValueOnce(new errors.ElasticsearchClientError('ES bulk operation has failed'))

      // WHEN
      // THEN
      await expect(etlService.medDraImport()).rejects.toThrow('ES bulk operation has failed')
    })
  })

  describe('when policies are created', () => {
    it('should not create policies when create has failed with ResponseError', async () => {
      // GIVEN
      const { client, etlService } = await setup()
      vi.spyOn(client.enrich, 'putPolicy').mockRejectedValueOnce(new errors.ResponseError({
        body: { error: { reason: 'ES policies create operation has failed' } },
        headers: null,
        meta: null,
        statusCode: null,
        warnings: null,
      }))

      // WHEN
      // THEN
      await expect(etlService.createPolicies()).rejects.toThrow('ES policies create operation has failed')
    })

    it('should not create policies when create has failed with ElasticsearchClientError', async () => {
      // GIVEN
      const { client, etlService } = await setup()
      vi.spyOn(client.enrich, 'putPolicy').mockRejectedValueOnce(new errors.ElasticsearchClientError('ES policies create operation has failed'))

      // WHEN
      // THEN
      await expect(etlService.createPolicies()).rejects.toThrow('ES policies create operation has failed')
    })
  })

  describe('when policies are deleted', () => {
    it('should not delete policies when create has failed with ResponseError', async () => {
      // GIVEN
      const { client, etlService } = await setup()
      vi.spyOn(client.enrich, 'getPolicy').mockResolvedValueOnce({ body: { policies: [{}] } } as unknown as TransportRequestCallback)
      vi.spyOn(client.enrich, 'deletePolicy').mockRejectedValueOnce(new errors.ResponseError({
        body: { error: { reason: 'ES policies delete operation has failed' } },
        headers: null,
        meta: null,
        statusCode: null,
        warnings: null,
      }))

      // WHEN
      // THEN
      await expect(etlService.deletePolicies()).rejects.toThrow('ES policies delete operation has failed')
    })

    it('should not delete policies when create has failed with ElasticsearchClientError', async () => {
      // GIVEN
      const { client, etlService } = await setup()
      vi.spyOn(client.enrich, 'getPolicy').mockResolvedValueOnce({ body: { policies: [{}] } } as unknown as TransportRequestCallback)
      vi.spyOn(client.enrich, 'deletePolicy').mockRejectedValueOnce(new errors.ElasticsearchClientError('ES policies delete operation has failed'))

      // WHEN
      // THEN
      await expect(etlService.deletePolicies()).rejects.toThrow('ES policies delete operation has failed')
    })
  })

  describe('when pipelines are deleted', () => {
    it('should not delete pipelines when create has failed with ResponseError', async () => {
      // GIVEN
      const { client, etlService } = await setup()
      vi.spyOn(client.ingest, 'deletePipeline').mockRejectedValueOnce(new errors.ResponseError({
        body: { error: { reason: 'ES pipelines delete operation has failed' } },
        headers: null,
        meta: null,
        statusCode: null,
        warnings: null,
      }))

      // WHEN
      // THEN
      await expect(etlService.deletePipelines()).rejects.toThrow('ES pipelines delete operation has failed')
    })

    it('should not delete pipelines when create has failed with ElasticsearchClientError', async () => {
      // GIVEN
      const { client, etlService } = await setup()
      vi.spyOn(client.ingest, 'deletePipeline').mockRejectedValueOnce(new errors.ElasticsearchClientError('ES pipelines delete operation has failed'))

      // WHEN
      // THEN
      await expect(etlService.deletePipelines()).rejects.toThrow('ES pipelines delete operation has failed')
    })
  })
})

async function setup() {
  const {
    client,
    databaseService,
    logger,
    readerService,
  } = setupDependencies()
  await databaseService.deletePipelines()
  await databaseService.deletePolicies()
  await databaseService.deleteMedDraIndex()
  await databaseService.deleteAnIndex()

  const etlService = new EtlService(logger, databaseService, readerService)

  const medDraFile = '10000001$Pneumopathie due à la ventilation$10081988$$$$$$$N$$\n10000002$Déficience en 11-bêta-hydroxylase$10000002$$$$$$$Y$$'

  return { client, databaseService, etlService, medDraFile, readerService }
}
