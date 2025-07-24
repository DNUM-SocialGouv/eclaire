import { errors } from '@opensearch-project/opensearch'
import fs from 'fs'
import { afterEach, beforeEach } from 'vitest'

import { EtlService } from './EtlService'
import { convertFhirParsedQueryParamsToElasticsearchQuery } from '../api/research-study/gateways/converter/convertFhirParsedQueryParamsToElasticsearchQuery'
import { ElasticsearchBodyType } from '../shared/elasticsearch/ElasticsearchBody'
import { SearchResponse } from '../shared/elasticsearch/ElasticsearchService'
import { setupDependencies } from '../shared/test/helpers/elasticsearchHelper'
import { RiphDtoTestFactory } from '../shared/test/helpers/RiphDtoTestFactory'
import { LocalTranslator } from '../shared/translation/LocalTranslator'
import { TranslationService } from '../shared/translation/TranslationService'
import { Translator } from '../shared/translation/Translator'

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
      vi.spyOn(client.indices, 'create').mockRejectedValueOnce(new errors.OpenSearchClientError('ES create operation has failed'))

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
      vi.spyOn(client.indices, 'delete').mockRejectedValueOnce(new errors.OpenSearchClientError('ES delete operation has failed'))

      // WHEN
      // THEN
      await expect(etlService.deleteIndex()).rejects.toThrow('ES delete operation has failed')
    })
  })

  describe('when import is performed', () => {
    beforeEach(() => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2023-03-17'))
    })

    afterEach(() => {
      vi.useRealTimers()
    })

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
      vi.spyOn(client.indices, 'create').mockResolvedValueOnce({} as unknown as any)
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
      vi.spyOn(client.indices, 'create').mockResolvedValueOnce({} as unknown as any)
      vi.spyOn(client, 'bulk').mockRejectedValueOnce(new errors.OpenSearchClientError('ES bulk operation has failed'))

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
      vi.spyOn(client, 'bulk').mockRejectedValueOnce(new errors.OpenSearchClientError('ES bulk operation has failed'))

      // WHEN
      // THEN
      await expect(etlService.medDraImport()).rejects.toThrow('ES bulk operation has failed')
    })
  })

  describe('when policies are created', () => {
    it('should not create policies when create has failed with ResponseError', async () => {
      // GIVEN
      const { client, etlService } = await setup()
      vi.spyOn(client.transport, 'request').mockRejectedValueOnce(
        new Error('ES policies create operation has failed')
      )

      // WHEN
      // THEN
      await expect(etlService.createPolicies()).rejects.toThrow('ES policies create operation has failed')
    })

    it('should not create policies when create has failed with ElasticsearchClientError', async () => {
      // GIVEN
      const { client, etlService } = await setup()
      vi.spyOn(client.transport, 'request').mockRejectedValueOnce(
        new errors.OpenSearchClientError('ES policies create operation has failed')
      )
      // WHEN
      // THEN
      await expect(etlService.createPolicies()).rejects.toThrow('ES policies create operation has failed')
    })
  })

  /* describe('when policies are deleted', () => {
    it('should not delete policies when create has failed with ResponseError', async () => {
      // GIVEN
      const { client, etlService } = await setup()
      vi.spyOn(client.transport, 'request')
        .mockResolvedValueOnce({ body: { policies: [{}] } } as any)
        .mockRejectedValueOnce(
          Object.assign(new Error('ES policies delete operation has failed'), {
            body: { error: { reason: 'ES policies delete operation has failed' } },
            meta: {},
            statusCode: 500,
            headers: {},
          })
        )

      // WHEN & THEN
      await expect(etlService.deletePolicies()).rejects.toThrow('ES policies delete operation has failed')
    })

    it('should not delete policies when create has failed with ElasticsearchClientError', async () => {
      // GIVEN
      const { client, etlService } = await setup()
      //vi.spyOn(client.enrich, 'getPolicy').mockResolvedValueOnce({ body: { policies: [{}] } } as unknown as TransportRequestCallback)
      //vi.spyOn(client.enrich, 'deletePolicy').mockRejectedValueOnce(new errors.OpenSearchClientError('ES policies delete operation has failed'))
      vi.spyOn(client.transport, 'request')
        .mockResolvedValueOnce({ body: { policies: [{}] } } as any)
        .mockRejectedValueOnce(
          Object.assign(new errors.OpenSearchClientError('ES policies delete operation has failed'))
        )
      // WHEN
      // THEN
      await expect(etlService.deletePolicies()).rejects.toThrow('ES policies delete operation has failed')
    })
  }) */

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
      vi.spyOn(client.ingest, 'deletePipeline').mockRejectedValueOnce(new errors.OpenSearchClientError('ES pipelines delete operation has failed'))

      // WHEN
      // THEN
      await expect(etlService.deletePipelines()).rejects.toThrow('ES pipelines delete operation has failed')
    })
  })

  describe('when translate is performed', () => {
    it('should not translate when the translation pipeline has failed with ResponseError', async () => {
      // GIVEN
      const { client, etlService } = await setup()
      vi.spyOn(client, 'search').mockRejectedValueOnce(new errors.ResponseError({
        body: { error: { reason: 'ES pipelines serach operation has failed' } },
        headers: null,
        meta: null,
        statusCode: null,
        warnings: null,
      }))

      // WHEN
      // THEN
      await expect(etlService.translate()).rejects.toThrow('ES pipelines serach operation has failed')
    })

    it('should not translate pipelines when the translation pipeline has failed with ElasticsearchClientError', async () => {
      // GIVEN
      const { client, etlService } = await setup()
      vi.spyOn(client, 'search').mockRejectedValueOnce(new errors.OpenSearchClientError('ES pipelines serach operation has failed'))

      // WHEN
      // THEN
      await expect(etlService.translate()).rejects.toThrow('ES pipelines serach operation has failed')
    })
  })

  describe('when meddra update is performed', () => {
    it('should not update meddra labels when the meddra pipeline has failed with ResponseError', async () => {
      // GIVEN
      const { client, etlService } = await setup()
      vi.spyOn(client, 'search').mockRejectedValueOnce(new errors.ResponseError({
        body: { error: { reason: 'ES pipelines serach operation has failed' } },
        headers: null,
        meta: null,
        statusCode: null,
        warnings: null,
      }))

      // WHEN
      // THEN
      await expect(etlService.updateMeddraLabels()).rejects.toThrow('ES pipelines serach operation has failed')
    })

    it('should not update meddra labels when the meddra pipeline has failed with ElasticsearchClientError', async () => {
      // GIVEN
      const { client, etlService } = await setup()
      vi.spyOn(client, 'search').mockRejectedValueOnce(new errors.OpenSearchClientError('ES pipelines serach operation has failed'))

      // WHEN
      // THEN
      await expect(etlService.updateMeddraLabels()).rejects.toThrow('ES pipelines serach operation has failed')
    })
  })

  describe('when daily update is performed', () => {
    afterEach(() => {
      vi.useRealTimers()
    })

    it('should import every clinical trials, translate them and update their meddra labels', async () => {
      // GIVEN
      const { databaseService, etlService, readerService } = await setup()
      vi.spyOn(readerService, 'read')
        .mockResolvedValueOnce([RiphDtoTestFactory.ctis()])
        .mockResolvedValueOnce([RiphDtoTestFactory.dm()])
        .mockResolvedValueOnce([RiphDtoTestFactory.jarde()])
      await etlService.createIndex()
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

      // WHEN
      await etlService.dailyUpdate('1970-01-01')

      // THEN
      const query: ElasticsearchBodyType = convertFhirParsedQueryParamsToElasticsearchQuery([{ name: '_count', value: '1000' }])
      const result: SearchResponse = await databaseService.search(query)

      await expect(JSON.stringify(result)).toMatchFileSnapshot('../shared/test/snapshots/DailyUpdate.snap.json')
    })

    it('should import clinical trials from yesterday, translate them and update their meddra labels', async () => {
      // GIVEN
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2024-01-07'))

      const { databaseService, etlService, readerService } = await setup()
      vi.spyOn(readerService, 'read')
        .mockResolvedValueOnce([
          RiphDtoTestFactory.ctis(),
          RiphDtoTestFactory.ctis({
            dates_avis_favorable_ms_mns: '22.00800.000094-SM-1:2022-11-07, 22.00800.000094-SM-2:2024-01-06',
            historique: '2024-01-06: En cours',
            numero_ctis: '2024-500014-26-99',
          }),
        ])
        .mockResolvedValueOnce([RiphDtoTestFactory.dm()])
        .mockResolvedValueOnce([RiphDtoTestFactory.jarde()])
      await etlService.createIndex()
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

      // WHEN
      await etlService.dailyUpdate()

      // THEN
      const query: ElasticsearchBodyType = convertFhirParsedQueryParamsToElasticsearchQuery([{ name: '_count', value: '1000' }])
      const result: SearchResponse = await databaseService.search(query)

      await expect(JSON.stringify(result)).toMatchFileSnapshot('../shared/test/snapshots/DailyUpdateSinceYesterday.snap.json')
    })

    it('should not import CTIS clinical trials, translate them and update their meddra labels when there is no new ones', async () => {
      // GIVEN
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2024-01-08'))

      const { databaseService, etlService, readerService } = await setup()
      vi.spyOn(readerService, 'read')
        .mockResolvedValueOnce([
          RiphDtoTestFactory.ctis(),
          RiphDtoTestFactory.ctis({
            dates_avis_favorable_ms_mns: '22.00800.000094-SM-1:2022-11-07, 22.00800.000094-SM-2:2024-01-06',
            historique: '2024-01-06: En cours',
            numero_ctis: '2024-500014-26-99',
          }),
        ])
        .mockResolvedValueOnce([RiphDtoTestFactory.dm()])
        .mockResolvedValueOnce([RiphDtoTestFactory.jarde()])
      await etlService.createIndex()
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

      // WHEN
      await etlService.dailyUpdate()

      // THEN
      const query: ElasticsearchBodyType = convertFhirParsedQueryParamsToElasticsearchQuery([{ name: '_count', value: '1000' }])
      const result: SearchResponse = await databaseService.search(query)

      await expect(JSON.stringify(result)).toMatchFileSnapshot('../shared/test/snapshots/DailyUpdateWithoutNewOnes.snap.json')
    })

    it('should import clinical trials from yesterday, translate them and update their meddra labels and preserve clinical trials from the past', async () => {
      // GIVEN
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2024-01-07'))
      const { databaseService, etlService, readerService } = await setup()

      vi.spyOn(readerService, 'read')
        .mockResolvedValueOnce([RiphDtoTestFactory.ctis()])
        .mockResolvedValueOnce([RiphDtoTestFactory.dm()])
        .mockResolvedValueOnce([RiphDtoTestFactory.jarde()])

      await etlService.createIndex()
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

      // WHEN
      await etlService.dailyUpdate('1970-01-01')

      vi.spyOn(readerService, 'read')
        .mockResolvedValueOnce([
          RiphDtoTestFactory.ctis({
            dates_avis_favorable_ms_mns: '22.00800.000094-SM-1:2022-11-07, 22.00800.000094-SM-2:2024-01-06',
            historique: '2024-01-06: En cours',
            numero_ctis: '2024-500014-26-99',
          }),
        ])
        .mockResolvedValueOnce([RiphDtoTestFactory.dm()])
        .mockResolvedValueOnce([RiphDtoTestFactory.jarde()])

      await etlService.dailyUpdate()

      // THEN
      const query: ElasticsearchBodyType = convertFhirParsedQueryParamsToElasticsearchQuery([{ name: '_count', value: '1000' }])
      const result: SearchResponse = await databaseService.search(query)

      await expect(JSON.stringify(result)).toMatchFileSnapshot('../shared/test/snapshots/DailyUpdateOverTime.snap.json')
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
  vi.stubEnv('CHUNK_SIZE', '100')

  await databaseService.deletePipelines()
  await databaseService.deletePolicies()
  await databaseService.deleteMedDraIndex()
  await databaseService.deleteAnIndex()

  const translator: Translator = new LocalTranslator()
  const translationService: TranslationService = new TranslationService(translator)

  const etlService = new EtlService(logger, databaseService, readerService, translationService)

  const medDraFile = '10000001$Pneumopathie due à la ventilation$10081988$$$$$$$N$$\n10000002$Déficience en 11-bêta-hydroxylase$10000002$$$$$$$Y$$'

  return { client, databaseService, etlService, medDraFile, readerService, translationService }
}
