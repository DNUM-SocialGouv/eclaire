import { EsResearchStudyRepository } from './EsResearchStudyRepository'
import { riphCtisDto, setupClientAndElasticsearchService } from '../../../shared/test/helpers/elasticsearchHelper'
import { SearchBodyType } from '../application/entities/SearchBody'
import { researchStudyIndexMapping } from 'src/etl/researchStudyIndexMapping'
import { RiphCtisResearchStudyModelFactory } from 'src/etl/RiphCtisResearchStudyModelFactory'

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
    const numberOfRessourceByPage = 2

    it('should find research studies when filter on a field is given', async () => {
      // GIVEN
      const { esResearchStudyRepository } = await setup()
      const bodySearch: SearchBodyType = {
        from: 0,
        query: { bool: { must: [{ range: { 'meta.lastUpdated': { gte: '2020-01-01T00:00:00Z' } } }] } },
        size: numberOfRessourceByPage,
      }

      // WHEN
      const response = await esResearchStudyRepository.search(bodySearch)

      // THEN
      expect(response.entry).toHaveLength(2)
      expect(response.link).toStrictEqual([
        {
          relation: 'self',
          url: 'http://localhost:3000/R4/ResearchStudy?_getpagesoffset=0',
        },
        {
          relation: 'next',
          url: 'http://localhost:3000/R4/ResearchStudy?_getpagesoffset=2',
        },
      ])
      expect(response.resourceType).toBe('Bundle')
      expect(response.total).toBe(6)
      expect(response.type).toBe('searchset')
    })

    it('should not send a URL for the next page when no result', async () => {
      // GIVEN
      const { esResearchStudyRepository } = await setup()
      const bodySearch: SearchBodyType = {
        from: 0,
        query: { bool: { must: [{ range: { 'meta.lastUpdated': { gte: '3020-01-01T00:00:00Z' } } }] } },
        size: numberOfRessourceByPage,
      }

      // WHEN
      const response = await esResearchStudyRepository.search(bodySearch)

      // THEN
      expect(response.total).toBe(0)
      expect(response.link).toStrictEqual([
        {
          relation: 'self',
          url: 'http://localhost:3000/R4/ResearchStudy?_getpagesoffset=0',
        },
      ])
    })

    it('should not send a URL for the next page when it is the final page', async () => {
      // GIVEN
      const { esResearchStudyRepository } = await setup()
      const bodySearch: SearchBodyType = {
        from: 4,
        query: { bool: { must: [{ range: { 'meta.lastUpdated': { gte: '2020-01-01T00:00:00Z' } } }] } },
        size: numberOfRessourceByPage,
      }

      // WHEN
      const response = await esResearchStudyRepository.search(bodySearch)

      // THEN
      expect(response.total).toBe(6)
      expect(response.link).toStrictEqual([
        {
          relation: 'self',
          url: 'http://localhost:3000/R4/ResearchStudy?_getpagesoffset=4',
        },
      ])
    })
  })
})

async function setup() {
  const { configService, elasticsearchService } = await setupClientAndElasticsearchService()
  const researchStudy1 = riphCtisDto[0]
  researchStudy1.titre = 'un autre titre pour la pagination 1'
  const researchStudy2 = riphCtisDto[0]
  researchStudy2.titre = 'un autre titre pour la pagination 2'
  const researchStudy3 = riphCtisDto[0]
  researchStudy3.titre = 'un autre titre pour la pagination 3'
  const researchStudy4 = riphCtisDto[0]
  researchStudy4.titre = 'un autre titre pour la pagination 4'
  const researchStudy5 = riphCtisDto[0]
  researchStudy5.titre = 'un autre titre pour la pagination 5'
  const researchStudy6 = riphCtisDto[0]
  researchStudy6.titre = 'un autre titre pour la pagination 6'

  await elasticsearchService.createAnIndex(researchStudyIndexMapping)
  await elasticsearchService.bulkDocuments([
    { index: { _id: 'fakeId1' } },
    RiphCtisResearchStudyModelFactory.create(researchStudy1),
    { index: { _id: 'fakeId2' } },
    RiphCtisResearchStudyModelFactory.create(researchStudy2),
    { index: { _id: 'fakeId3' } },
    RiphCtisResearchStudyModelFactory.create(researchStudy3),
    { index: { _id: 'fakeId4' } },
    RiphCtisResearchStudyModelFactory.create(researchStudy4),
    { index: { _id: 'fakeId5' } },
    RiphCtisResearchStudyModelFactory.create(researchStudy5),
    { index: { _id: 'fakeId6' } },
    RiphCtisResearchStudyModelFactory.create(researchStudy6),
  ])

  const esResearchStudyRepository = new EsResearchStudyRepository(elasticsearchService, configService)

  return { elasticsearchService, esResearchStudyRepository }
}
