import { expect } from 'vitest'

import { EsOrganizationRepository } from './EsOrganizationRepository'
import { EclaireDto } from '../../../etl/dto/EclaireDto'
import { ResearchStudyModelFactory } from '../../../etl/factory/ResearchStudyModelFactory'
import { setupClientAndElasticsearchService } from '../../../shared/test/helpers/elasticsearchHelper'
import { elasticsearchIndexMapping } from 'src/shared/elasticsearch/elasticsearchIndexMapping'
import { RiphDtoTestFactory } from 'src/shared/test/helpers/RiphDtoTestFactory'

describe('elasticsearch research study repository', () => {
  it('should retrieve one research study', async () => {
    // GIVEN
    const { elasticsearchService, esOrganizationRepository } = await setup()
    vi.spyOn(elasticsearchService, 'findOneDocument')
      .mockImplementationOnce(async (id: string) => await Promise.resolve(id))

    // WHEN
    await esOrganizationRepository.findOne('fakeId2')

    // THEN
    expect(elasticsearchService.findOneDocument).toHaveBeenCalledWith('fakeId2')
  })
})

async function setup() {
  const { elasticsearchService } = await setupClientAndElasticsearchService()
  const numberOfResourcesByPage = Number(process.env['NUMBER_OF_RESOURCES_BY_PAGE'])
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

  const esOrganizationRepository = new EsOrganizationRepository(elasticsearchService)

  return { elasticsearchService, esOrganizationRepository, numberOfResourcesByPage }
}
