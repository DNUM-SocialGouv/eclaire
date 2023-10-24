import { EsLocationRepository } from './EsLocationRepository'
import { setupDependencies } from '../../../shared/test/helpers/elasticsearchHelper'

describe('elasticsearch location repository', () => {
  it('should retrieve one location', async () => {
    // GIVEN
    const { elasticsearchService, esLocationRepository } = setup()
    vi.spyOn(elasticsearchService, 'findReferenceContent')

    // WHEN
    await esLocationRepository.find('0-ctis-site')

    // THEN
    expect(elasticsearchService.findReferenceContent).toHaveBeenCalledWith('0-ctis-site', 'locations')
  })
})

function setup() {
  const { elasticsearchService } = setupDependencies()

  const esLocationRepository = new EsLocationRepository(elasticsearchService)

  return { elasticsearchService, esLocationRepository }
}
