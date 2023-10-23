import { EsLocationRepository } from './EsLocationRepository'
import { setupClientAndElasticsearchService } from '../../../shared/test/helpers/elasticsearchHelper'

describe('elasticsearch location repository', () => {
  it('should retrieve one location', async () => {
    // GIVEN
    const { elasticsearchService, esLocationRepository } = setup()
    vi.spyOn(elasticsearchService, 'findReferenceContent').mockResolvedValueOnce({})

    // WHEN
    await esLocationRepository.find('0-ctis-site')

    // THEN
    expect(elasticsearchService.findReferenceContent).toHaveBeenCalledWith('0-ctis-site', 'locations')
  })
})

function setup() {
  const { elasticsearchService } = setupClientAndElasticsearchService()

  const esLocationRepository = new EsLocationRepository(elasticsearchService)

  return { elasticsearchService, esLocationRepository }
}
