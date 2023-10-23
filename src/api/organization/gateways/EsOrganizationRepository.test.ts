import { EsOrganizationRepository } from './EsOrganizationRepository'
import { setupClientAndElasticsearchService } from '../../../shared/test/helpers/elasticsearchHelper'

describe('elasticsearch organization repository', () => {
  it('should retrieve one organization', async () => {
    // GIVEN
    const { elasticsearchService, esOrganizationRepository } = setup()
    vi.spyOn(elasticsearchService, 'findReferenceContent').mockResolvedValueOnce({})

    // WHEN
    await esOrganizationRepository.find('ctis')

    // THEN
    expect(elasticsearchService.findReferenceContent).toHaveBeenCalledWith('ctis', 'organizations')
  })
})

function setup() {
  const { elasticsearchService } = setupClientAndElasticsearchService()

  const esOrganizationRepository = new EsOrganizationRepository(elasticsearchService)

  return { elasticsearchService, esOrganizationRepository }
}
