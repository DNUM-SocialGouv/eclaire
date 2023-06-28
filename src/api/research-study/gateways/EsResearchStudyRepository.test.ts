import { EsResearchStudyRepository } from './EsResearchStudyRepository'
import { ResearchStudyModelTestingFactory } from './ResearchStudyModelTestingFactory'
import { clinicalTrialIndexMapping } from '../../../etl/clinicalTrialIndexMapping'
import { setupClientAndElasticsearchService } from '../../../shared/test/helpers/elasticsearchHelper'
import { SearchBodyType } from '../application/entities/SearchBody'

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
        query: { bool: { must: [{ range: { updated_at: { gte: '01/01/2020' } } }] } },
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
        query: { bool: { must: [{ range: { updated_at: { gte: '01/01/3020' } } }] } },
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
        query: { bool: { must: [{ range: { updated_at: { gte: '01/01/2020' } } }] } },
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

  await elasticsearchService.createAnIndex(clinicalTrialIndexMapping)
  await elasticsearchService.bulkDocuments([
    { index: { _id: 'fakeId1' } },
    ResearchStudyModelTestingFactory.create({ public_title: { acronym: '', value: 'un autre titre pour la pagination 1' } }),
    { index: { _id: 'fakeId2' } },
    ResearchStudyModelTestingFactory.create({ public_title: { acronym: '', value: 'un autre titre pour la pagination 2' } }),
    { index: { _id: 'fakeId3' } },
    ResearchStudyModelTestingFactory.create({ public_title: { acronym: '', value: 'un autre titre pour la pagination 3' } }),
    { index: { _id: 'fakeId4' } },
    ResearchStudyModelTestingFactory.create({ public_title: { acronym: '', value: 'un autre titre pour la pagination 4' } }),
    { index: { _id: 'fakeId5' } },
    ResearchStudyModelTestingFactory.create({ public_title: { acronym: '', value: 'un autre titre pour la pagination 5' } }),
    { index: { _id: 'fakeId6' } },
    ResearchStudyModelTestingFactory.create({ public_title: { acronym: '', value: 'un autre titre pour la pagination 6' } }),
  ])

  const esResearchStudyRepository = new EsResearchStudyRepository(elasticsearchService, configService)

  return { elasticsearchService, esResearchStudyRepository }
}
