import { Bundle } from 'fhir/r4'

import { EsResearchStudyRepository } from './EsResearchStudyRepository'
import { EclaireDto } from '../../../etl/dto/EclaireDto'
import { ResearchStudyModelFactory } from '../../../etl/factory/ResearchStudyModelFactory'
import { elasticsearchIndexMapping } from '../../../shared/elasticsearch/elasticsearchIndexMapping'
import { ElasticsearchService, SearchResponse } from '../../../shared/elasticsearch/ElasticsearchService'
import { setupDependencies } from '../../../shared/test/helpers/elasticsearchHelper'
import { RiphDtoTestFactory } from '../../../shared/test/helpers/RiphDtoTestFactory'
import { ResearchStudyQueryParams } from '../controllers/converter/ResearchStudyQueryParams'

describe('elasticsearch research study repository', () => {
  let dependencies: {
    databaseService: ElasticsearchService
    esResearchStudyRepository: EsResearchStudyRepository
    numberOfResourcesByPage: number
  }

  beforeAll(async () => {
    dependencies = await setup()
  })

  describe('retrieve one research study', () => {
    it('should retrieve one research study', async () => {
      // GIVEN
      vi.spyOn(dependencies.databaseService, 'findOneDocument').mockResolvedValueOnce({})

      // WHEN
      await dependencies.esResearchStudyRepository.findOne('fakeId2')

      // THEN
      expect(dependencies.databaseService.findOneDocument).toHaveBeenCalledWith('fakeId2')
    })
  })

  describe('search research studies', () => {
    it('should find research studies', async () => {
      // GIVEN
      const queryParams: ResearchStudyQueryParams[] = []

      // WHEN
      const response: Bundle = await dependencies.esResearchStudyRepository.search(queryParams)

      // THEN
      expect(response.entry).toHaveLength(2)
      expect(response.resourceType).toBe('Bundle')
      expect(response.total).toBe(6)
      expect(response.type).toBe('searchset')
    })

    it('should find research studies with related ressources', async () => {
      // GIVEN
      const queryParams: ResearchStudyQueryParams[] = [{ name: '_include', value: '*' }]

      // WHEN
      const response: Bundle = await dependencies.esResearchStudyRepository.search(queryParams)

      // THEN
      expect(response.entry).toHaveLength(11)
      expect(response.resourceType).toBe('Bundle')
      expect(response.total).toStrictEqual(6)
      expect(response.type).toBe('searchset')
    })

    describe('below 10 000 results', () => {
      it('should send a URL for the self and next page for the first page', async () => {
        // GIVEN
        const queryParams: ResearchStudyQueryParams[] = [
          { name: '_lastUpdated', value: 'gt2020-01-01' },
          { name: '_sort', value: 'meta.lastUpdated' },
        ]

        // WHEN
        const response: Bundle = await dependencies.esResearchStudyRepository.search(queryParams)

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
        const queryParams: ResearchStudyQueryParams[] = [
          { name: '_lastUpdated', value: 'gt2020-01-01' },
          { name: '_sort', value: 'meta.lastUpdated' },
          { name: '_getpagesoffset', value: '2' },
        ]

        // WHEN
        const response: Bundle = await dependencies.esResearchStudyRepository.search(queryParams)

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
        const queryParams: ResearchStudyQueryParams[] = [
          { name: '_lastUpdated', value: 'gt2020-01-01' },
          { name: '_sort', value: 'meta.lastUpdated' },
          { name: '_getpagesoffset', value: '4' },
        ]

        // WHEN
        const response: Bundle = await dependencies.esResearchStudyRepository.search(queryParams)

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
        const queryParams: ResearchStudyQueryParams[] = [
          { name: '_lastUpdated', value: 'gt3020-01-01' },
          { name: '_sort', value: 'meta.lastUpdated' },
        ]

        // WHEN
        const response: Bundle = await dependencies.esResearchStudyRepository.search(queryParams)

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
        const queryParams: ResearchStudyQueryParams[] = [{ name: 'identifier', value: 'fakeId1' }]

        // WHEN
        const response: Bundle = await dependencies.esResearchStudyRepository.search(queryParams)

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
          const queryParams: ResearchStudyQueryParams[] = [
            { name: '_lastUpdated', value: 'gt2020-01-01' },
            { name: '_sort', value: 'meta.lastUpdated' },
          ]

          vi.spyOn(dependencies.databaseService, 'search').mockResolvedValueOnce({
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
          const response: Bundle = await dependencies.esResearchStudyRepository.search(queryParams)

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
          const queryParams: ResearchStudyQueryParams[] = [
            { name: '_lastUpdated', value: 'gt2020-01-01' },
            { name: '_sort', value: 'meta.lastUpdated' },
            { name: 'search_after', value: '1636107200000,2022-500014-26-00' },
          ]

          vi.spyOn(dependencies.databaseService, 'search').mockResolvedValueOnce({
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
          const response: Bundle = await dependencies.esResearchStudyRepository.search(queryParams)

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
          const queryParams: ResearchStudyQueryParams[] = [
            { name: '_lastUpdated', value: 'gt3020-01-01' },
            { name: '_sort', value: 'meta.lastUpdated' },
          ]

          // WHEN
          const response: Bundle = await dependencies.esResearchStudyRepository.search(queryParams)

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
          const queryParams: ResearchStudyQueryParams[] = []

          vi.spyOn(dependencies.databaseService, 'search').mockResolvedValueOnce({
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
          const response: Bundle = await dependencies.esResearchStudyRepository.search(queryParams)

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
  vi.stubEnv('ECLAIRE_URL', 'http://localhost:3000/')
  vi.stubEnv('NUMBER_OF_RESOURCES_BY_PAGE', '2')
  const { configService, databaseService } = setupDependencies()
  const numberOfResourcesByPage = Number(process.env['NUMBER_OF_RESOURCES_BY_PAGE'])
  const researchStudy1: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({ numero_ctis: 'fakeId1', titre: 'un autre titre pour la pagination 1' }))
  const researchStudy2: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({ numero_ctis: 'fakeId2', titre: 'un autre titre pour la pagination 2' }))
  const researchStudy3: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({ numero_ctis: 'fakeId3', titre: 'un autre titre pour la pagination 3' }))
  const researchStudy4: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({ numero_ctis: 'fakeId4', titre: 'un autre titre pour la pagination 4' }))
  const researchStudy5: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({ numero_ctis: 'fakeId5', titre: 'un autre titre pour la pagination 5' }))
  const researchStudy6: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({ numero_ctis: 'fakeId6', titre: 'un autre titre pour la pagination 6' }))

  await databaseService.deletePipelines()
  await databaseService.deletePolicies()
  await databaseService.deleteMedDraIndex()
  await databaseService.deleteAnIndex()
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
  await databaseService.createAnIndex(elasticsearchIndexMapping)
  await databaseService.bulkDocuments([
    ResearchStudyModelFactory.create(researchStudy1),
    ResearchStudyModelFactory.create(researchStudy2),
    ResearchStudyModelFactory.create(researchStudy3),
    ResearchStudyModelFactory.create(researchStudy4),
    ResearchStudyModelFactory.create(researchStudy5),
    ResearchStudyModelFactory.create(researchStudy6),
  ])

  const esResearchStudyRepository = new EsResearchStudyRepository(databaseService, configService)

  return { databaseService, esResearchStudyRepository, numberOfResourcesByPage }
}
