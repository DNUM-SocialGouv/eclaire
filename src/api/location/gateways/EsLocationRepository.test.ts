import { expect } from 'vitest'

import { EsLocationRepository } from './EsLocationRepository'
import { EclaireDto } from '../../../etl/dto/EclaireDto'
import { ResearchStudyModelFactory } from '../../../etl/factory/ResearchStudyModelFactory'
import { setupClientAndElasticsearchService } from '../../../shared/test/helpers/elasticsearchHelper'
import { elasticsearchIndexMapping } from 'src/shared/elasticsearch/elasticsearchIndexMapping'
import { RiphDtoTestFactory } from 'src/shared/test/helpers/RiphDtoTestFactory'

describe('elasticsearch location repository', () => {
  it('should retrieve one location', async () => {
    // GIVEN
    const { elasticsearchService, esLocationRepository } = await setup()
    vi.spyOn(elasticsearchService, 'findReferenceContent')
      .mockImplementationOnce(async (id: string) => await Promise.resolve(['blah', id]))

    // WHEN
    await esLocationRepository.find('0-ctis-site')

    // THEN
    expect(elasticsearchService.findReferenceContent).toHaveBeenCalledWith('0-ctis-site', 'locations')
  })
})

async function setup() {
  const { elasticsearchService } = await setupClientAndElasticsearchService()
  const numberOfResourcesByPage = Number(process.env['NUMBER_OF_RESOURCES_BY_PAGE'])
  const researchStudy1: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({ numero_ctis: 'fakeId1', titre: 'un autre titre pour la pagination 1' }))
  const researchStudy2: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({ numero_ctis: 'fakeId2', titre: 'un autre titre pour la pagination 2' }))

  await elasticsearchService.createAnIndex(elasticsearchIndexMapping)
  await elasticsearchService.bulkDocuments([
    ResearchStudyModelFactory.create(researchStudy1),
    ResearchStudyModelFactory.create(researchStudy2),
  ])

  const esLocationRepository = new EsLocationRepository(elasticsearchService)

  return { elasticsearchService, esLocationRepository, numberOfResourcesByPage }
}
