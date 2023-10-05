import { expect } from 'vitest'

import { EsGroupRepository } from './EsGroupRepository'
import { EclaireDto } from '../../../etl/dto/EclaireDto'
import { ResearchStudyModelFactory } from '../../../etl/factory/ResearchStudyModelFactory'
import { setupClientAndElasticsearchService } from '../../../shared/test/helpers/elasticsearchHelper'
import { elasticsearchIndexMapping } from 'src/shared/elasticsearch/elasticsearchIndexMapping'
import { RiphDtoTestFactory } from 'src/shared/test/helpers/RiphDtoTestFactory'

describe('elasticsearch research study repository', () => {
  it('should retrieve one research study', async () => {
    // GIVEN
    const { elasticsearchService, esGroupRepository } = await setup()
    vi.spyOn(elasticsearchService, 'findReferenceContent')
      .mockImplementationOnce(async (id: string) => await Promise.resolve(['blah', id]))

    // WHEN
    await esGroupRepository.find('2022-500014-26-00-enrollment-group')

    // THEN
    expect(elasticsearchService.findReferenceContent).toHaveBeenCalledWith('2022-500014-26-00-enrollment-group', 'enrollmentGroup')
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

  const esGroupRepository = new EsGroupRepository(elasticsearchService)

  return { elasticsearchService, esGroupRepository, numberOfResourcesByPage }
}
