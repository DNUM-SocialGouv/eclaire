import { EsLocationRepository } from './EsLocationRepository'
import { setupDependencies } from '../../../shared/test/helpers/elasticsearchHelper'

describe('elasticsearch location repository', () => {
  it('should retrieve one location', async () => {
    // GIVEN
    const { databaseService, esLocationRepository } = setup()
    vi.spyOn(databaseService, 'findReferenceContent').mockResolvedValueOnce({})

    // WHEN
    await esLocationRepository.find('0-ctis-site')

    // THEN
    expect(databaseService.findReferenceContent).toHaveBeenCalledWith('0-ctis-site', 'locations')
  })
})

function setup() {
  const { databaseService } = setupDependencies()

  const esLocationRepository = new EsLocationRepository(databaseService)

  return { databaseService, esLocationRepository }
}
