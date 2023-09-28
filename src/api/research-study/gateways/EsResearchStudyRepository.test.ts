import { expect } from 'vitest'

import { EsResearchStudyRepository } from './EsResearchStudyRepository'
import { EclaireDto } from '../../../etl/dto/EclaireDto'
import { ResearchStudyModelFactory } from '../../../etl/factory/ResearchStudyModelFactory'
import { setupClientAndElasticsearchService } from '../../../shared/test/helpers/elasticsearchHelper'
import { ElasticsearchBodyType } from '../application/entities/ElasticsearchBody'
import { ResearchStudyQueryParams } from '../controllers/converter/ResearchStudyQueryParams'
import { elasticsearchIndexMapping } from 'src/shared/elasticsearch/elasticsearchIndexMapping'
import { SearchResponse } from 'src/shared/elasticsearch/ElasticsearchService'
import { RiphDtoTestFactory } from 'src/shared/test/helpers/RiphDtoTestFactory'

describe('elasticsearch research study repository', () => {
  describe('retrieve one research study', () => {
    it('should retrieve one research study', async () => {
      // GIVEN
      const { elasticsearchService, esResearchStudyRepository } = await setup()
      vi.spyOn(elasticsearchService, 'findOneDocument').mockImplementationOnce(async (id: string) => await Promise.resolve(id))

      // WHEN
      await esResearchStudyRepository.findOne('fakeId2')

      // THEN
      expect(elasticsearchService.findOneDocument).toHaveBeenCalledWith('fakeId2')
    })
  })

  describe('search research studies', () => {
    it('should find research studies', async () => {
      // GIVEN
      const { esResearchStudyRepository } = await setup()
      const queryParams: ResearchStudyQueryParams[] = []
      const elasticsearchBody: ElasticsearchBodyType = {
        from: 0,
        query: { bool: { must: [] } },
        size: Number(process.env.NUMBER_OF_RESOURCES_BY_PAGE),
      }

      // WHEN
      const response = await esResearchStudyRepository.search(elasticsearchBody, queryParams)

      // THEN
      expect(response.entry).toHaveLength(2)
      expect(response.resourceType).toBe('Bundle')
      expect(response.total).toBe(6)
      expect(response.type).toBe('searchset')
      expect(response.entry[0].resource['referenceContents']).toBeUndefined()
    })

    it('should find research studies with related ressources', async () => {
      // GIVEN
      const { esResearchStudyRepository } = await setup()
      const queryParams: ResearchStudyQueryParams[] = []
      const elasticsearchBody: ElasticsearchBodyType = {
        from: 0,
        query: { bool: { must: [] } },
        size: Number(process.env.NUMBER_OF_RESOURCES_BY_PAGE),
      }

      // WHEN
      const response = await esResearchStudyRepository.search(elasticsearchBody, queryParams, true)

      // THEN
      expect(response.entry).toHaveLength(2)
      expect(response.resourceType).toBe('Bundle')
      expect(response.total).toStrictEqual(6)
      expect(response.type).toBe('searchset')
      expect(response.entry[0].resource['referenceContents']).toBeDefined()
    })

    describe('below 10 000 results', () => {
      it('should send a URL for the self and next page for the first page', async () => {
        // GIVEN
        const { esResearchStudyRepository, numberOfResourcesByPage } = await setup()
        const queryParams = [
          { name: '_lastUpdated', value: 'gt2020-01-01' },
          { name: '_sort', value: 'meta.lastUpdated' },
        ]
        const firstPage = numberOfResourcesByPage * 0
        const elasticsearchBody: ElasticsearchBodyType = {
          from: firstPage,
          query: { bool: { must: [{ range: { 'meta.lastUpdated': { gte: '2020-01-01' } } }] } },
          size: numberOfResourcesByPage,
        }

        // WHEN
        const response = await esResearchStudyRepository.search(elasticsearchBody, queryParams)

        // THEN
        expect(response.link).toStrictEqual([
          {
            relation: 'self',
            url: 'http://localhost:3000/R4/ResearchStudy?_lastUpdated=gt2020-01-01&_sort=meta.lastUpdated',
          },
          {
            relation: 'next',
            url: 'http://localhost:3000/R4/ResearchStudy?_lastUpdated=gt2020-01-01&_sort=meta.lastUpdated&_getpagesoffset=2',
          },
        ])
      })

      it('should send a URL for the self and next page for the second page', async () => {
        // GIVEN
        const { esResearchStudyRepository, numberOfResourcesByPage } = await setup()
        const queryParams = [
          { name: '_lastUpdated', value: 'gt2020-01-01' },
          { name: '_sort', value: 'meta.lastUpdated' },
          { name: '_getpagesoffset', value: '2' },
        ]
        const secondPage = numberOfResourcesByPage
        const elasticsearchBody: ElasticsearchBodyType = {
          from: secondPage,
          query: { bool: { must: [{ range: { 'meta.lastUpdated': { gte: '2020-01-01' } } }] } },
          size: numberOfResourcesByPage,
        }

        // WHEN
        const response = await esResearchStudyRepository.search(elasticsearchBody, queryParams)

        // THEN
        expect(response.link).toStrictEqual([
          {
            relation: 'self',
            url: 'http://localhost:3000/R4/ResearchStudy?_lastUpdated=gt2020-01-01&_sort=meta.lastUpdated&_getpagesoffset=2',
          },
          {
            relation: 'next',
            url: 'http://localhost:3000/R4/ResearchStudy?_lastUpdated=gt2020-01-01&_sort=meta.lastUpdated&_getpagesoffset=4',
          },
        ])
      })

      it('should not send a URL for the next page when it is the final page', async () => {
        // GIVEN
        const { esResearchStudyRepository, numberOfResourcesByPage } = await setup()
        const queryParams = [
          { name: '_lastUpdated', value: 'gt2020-01-01' },
          { name: '_sort', value: 'meta.lastUpdated' },
          { name: '_getpagesoffset', value: '4' },
        ]
        const finalPage = numberOfResourcesByPage * 2
        const elasticsearchBody: ElasticsearchBodyType = {
          from: finalPage,
          query: { bool: { must: [{ range: { 'meta.lastUpdated': { gte: '2020-01-01' } } }] } },
          size: numberOfResourcesByPage,
        }

        // WHEN
        const response = await esResearchStudyRepository.search(elasticsearchBody, queryParams)

        // THEN
        expect(response.total).toBe(6)
        expect(response.link).toStrictEqual([
          {
            relation: 'self',
            url: 'http://localhost:3000/R4/ResearchStudy?_lastUpdated=gt2020-01-01&_sort=meta.lastUpdated&_getpagesoffset=4',
          },
        ])
      })

      it('should not send a URL for the next page when no result', async () => {
        // GIVEN
        const { esResearchStudyRepository, numberOfResourcesByPage } = await setup()
        const queryParams = [
          { name: '_lastUpdated', value: 'gt3020-01-01' },
          { name: '_sort', value: 'meta.lastUpdated' },
        ]
        const firstPage = numberOfResourcesByPage * 0
        const elasticsearchBody: ElasticsearchBodyType = {
          from: firstPage,
          query: { bool: { must: [{ range: { 'meta.lastUpdated': { gte: '3020-01-01' } } }] } },
          size: numberOfResourcesByPage,
        }

        // WHEN
        const response = await esResearchStudyRepository.search(elasticsearchBody, queryParams)

        // THEN
        expect(response.total).toBe(0)
        expect(response.link).toStrictEqual([
          {
            relation: 'self',
            url: 'http://localhost:3000/R4/ResearchStudy?_lastUpdated=gt3020-01-01&_sort=meta.lastUpdated',
          },
        ])
      })

      it('should not send a URL for the next page when the result number is inferior to the number of resources by page', async () => {
        // GIVEN
        const { esResearchStudyRepository, numberOfResourcesByPage } = await setup()
        const queryParams = [{ name: 'identifier', value: 'fakeId1' }]
        const firstPage = numberOfResourcesByPage * 0
        const elasticsearchBody: ElasticsearchBodyType = {
          from: firstPage,
          query: { bool: { must: [{ match: { _id: 'fakeId1' } }] } },
          size: numberOfResourcesByPage,
        }

        // WHEN
        const response = await esResearchStudyRepository.search(elasticsearchBody, queryParams)

        // THEN
        expect(response.total).toBe(1)
        expect(response.link).toStrictEqual([
          {
            relation: 'self',
            url: 'http://localhost:3000/R4/ResearchStudy?identifier=fakeId1',
          },
        ])
      })
    })

    describe('above 10 000 results', () => {
      const maxTotalConstraintFromElasticsearch = 10_000

      describe('with a sort', () => {
        it('should send a URL for the self and next page for the first page', async () => {
          // GIVEN
          const { elasticsearchService, esResearchStudyRepository, numberOfResourcesByPage } = await setup()
          const queryParams = [
            { name: '_lastUpdated', value: 'gt2020-01-01' },
            { name: '_sort', value: 'meta.lastUpdated' },
          ]
          const firstPage = numberOfResourcesByPage * 0
          const elasticsearchBody: ElasticsearchBodyType = {
            from: firstPage,
            query: { bool: { must: [] } },
            size: numberOfResourcesByPage,
            sort: [{ 'meta.lastUpdated': { order: 'asc' } }],
          }
          vi.spyOn(elasticsearchService, 'search').mockResolvedValue({
            hits: [
              {
                _id: '2022-500014-26-00',
                _index: 'eclaire',
                _score: null,
                _source: { id: '2022-500014-26-00' },
                _type: '_doc',
                sort: [1636107200000],
              },
            ],
            total: maxTotalConstraintFromElasticsearch,
          })

          // WHEN
          const response = await esResearchStudyRepository.search(elasticsearchBody, queryParams)

          // THEN
          expect(response.link).toStrictEqual([
            {
              relation: 'self',
              url: 'http://localhost:3000/R4/ResearchStudy?_lastUpdated=gt2020-01-01&_sort=meta.lastUpdated',
            },
            {
              relation: 'next',
              url: 'http://localhost:3000/R4/ResearchStudy?_lastUpdated=gt2020-01-01&_sort=meta.lastUpdated&search_after=1636107200000%2C2022-500014-26-00',
            },
          ])
        })

        it('should send a URL for the self and next page for the second page', async () => {
          // GIVEN
          const { elasticsearchService, esResearchStudyRepository, numberOfResourcesByPage } = await setup()
          const queryParams = [
            { name: '_lastUpdated', value: 'gt2020-01-01' },
            { name: '_sort', value: 'meta.lastUpdated' },
            { name: 'search_after', value: '1636107200000,2022-500014-26-00' },
          ]
          const secondPage = numberOfResourcesByPage
          const elasticsearchBody: ElasticsearchBodyType = {
            from: secondPage,
            query: { bool: { must: [] } },
            search_after: ['1636107200000'],
            size: numberOfResourcesByPage,
            sort: [{ 'meta.lastUpdated': { order: 'asc' } }],
          }
          vi.spyOn(elasticsearchService, 'search').mockResolvedValue({
            hits: [
              {
                _id: '2023-500014-26-00',
                _index: 'eclaire',
                _score: null,
                _source: { id: '2023-500014-26-00' },
                _type: '_doc',
                sort: [1637107200000],
              },
            ],
            total: maxTotalConstraintFromElasticsearch,
          })

          // WHEN
          const response = await esResearchStudyRepository.search(elasticsearchBody, queryParams)

          // THEN
          expect(response.link).toStrictEqual([
            {
              relation: 'self',
              url: 'http://localhost:3000/R4/ResearchStudy?_lastUpdated=gt2020-01-01&_sort=meta.lastUpdated&search_after=1636107200000%2C2022-500014-26-00',
            },
            {
              relation: 'next',
              url: 'http://localhost:3000/R4/ResearchStudy?_lastUpdated=gt2020-01-01&_sort=meta.lastUpdated&search_after=1637107200000%2C2023-500014-26-00',
            },
          ])
        })

        it('should not send a URL for the next page when no result', async () => {
          // GIVEN
          const { esResearchStudyRepository, numberOfResourcesByPage } = await setup()
          const queryParams = [
            { name: '_lastUpdated', value: 'gt3020-01-01' },
            { name: '_sort', value: 'meta.lastUpdated' },
          ]
          const firstPage = numberOfResourcesByPage * 0
          const elasticsearchBody: ElasticsearchBodyType = {
            from: firstPage,
            query: { bool: { must: [{ range: { 'meta.lastUpdated': { gte: '3020-01-01' } } }] } },
            size: numberOfResourcesByPage,
            sort: [{ 'meta.lastUpdated': { order: 'asc' } }],
          }

          // WHEN
          const response = await esResearchStudyRepository.search(elasticsearchBody, queryParams)

          // THEN
          expect(response.total).toBe(0)
          expect(response.link).toStrictEqual([
            {
              relation: 'self',
              url: 'http://localhost:3000/R4/ResearchStudy?_lastUpdated=gt3020-01-01&_sort=meta.lastUpdated',
            },
          ])
        })
      })

      describe('without a sort', () => {
        it('should send a URL for the next page', async () => {
          // GIVEN
          const { elasticsearchService, esResearchStudyRepository, numberOfResourcesByPage } = await setup()
          const queryParams: ResearchStudyQueryParams[] = []
          const firstPage = numberOfResourcesByPage * 0
          const elasticsearchBody: ElasticsearchBodyType = {
            from: firstPage,
            query: { bool: { must: [] } },
            size: numberOfResourcesByPage,
          }
          vi.spyOn(elasticsearchService, 'search').mockResolvedValue({
            hits: [
              {
                _id: 'fakeId1',
                _index: 'eclaire',
                _score: null,
                _source: {},
                _type: '_doc',
              },
              {
                _id: 'fakeId2',
                _index: 'eclaire',
                _score: null,
                _source: {},
                _type: '_doc',
              },
            ] as SearchResponse['hits'],
            total: maxTotalConstraintFromElasticsearch,
          })

          // WHEN
          const response = await esResearchStudyRepository.search(elasticsearchBody, queryParams)

          // THEN
          expect(response.link).toStrictEqual([
            {
              relation: 'self',
              url: 'http://localhost:3000/R4/ResearchStudy',
            },
            {
              relation: 'next',
              url: 'http://localhost:3000/R4/ResearchStudy?_getpagesoffset=2',
            },
          ])
        })
      })
    })
  })
})

async function setup() {
  const { configService, elasticsearchService } = await setupClientAndElasticsearchService()
  const numberOfResourcesByPage = Number(process.env.NUMBER_OF_RESOURCES_BY_PAGE)
  const researchStudy1: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({ numero_ctis: 'fakeId1', titre: 'un autre titre pour la pagination 1' }))
  const researchStudy2: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({ numero_ctis: 'fakeId2', titre: 'un autre titre pour la pagination 2' }))
  const researchStudy3: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({ numero_ctis: 'fakeId3', titre: 'un autre titre pour la pagination 3' }))
  const researchStudy4: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({ numero_ctis: 'fakeId4', titre: 'un autre titre pour la pagination 4' }))
  const researchStudy5: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({ numero_ctis: 'fakeId5', titre: 'un autre titre pour la pagination 5' }))
  const researchStudy6: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({ numero_ctis: 'fakeId6', titre: 'un autre titre pour la pagination 6' }))

  await elasticsearchService.createAnIndex(elasticsearchIndexMapping)
  await elasticsearchService.bulkDocuments([
    ResearchStudyModelFactory.create(researchStudy1),
    ResearchStudyModelFactory.create(researchStudy2),
    ResearchStudyModelFactory.create(researchStudy3),
    ResearchStudyModelFactory.create(researchStudy4),
    ResearchStudyModelFactory.create(researchStudy5),
    ResearchStudyModelFactory.create(researchStudy6),
  ])

  const esResearchStudyRepository = new EsResearchStudyRepository(elasticsearchService, configService)

  return { elasticsearchService, esResearchStudyRepository, numberOfResourcesByPage }
}
