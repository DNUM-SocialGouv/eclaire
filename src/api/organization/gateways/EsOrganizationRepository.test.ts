import { EsOrganizationRepository } from './EsOrganizationRepository'
import { setupDependencies } from '../../../shared/test/helpers/elasticsearchHelper'

describe('elasticsearch organization repository', () => {
  it('should retrieve one organization', async () => {
    // GIVEN
    const { databaseService, esOrganizationRepository } = setup()
    vi.spyOn(databaseService, 'findReferenceContent').mockResolvedValueOnce({})

    // WHEN
    await esOrganizationRepository.find('ctis')

    // THEN
    expect(databaseService.findReferenceContent).toHaveBeenCalledWith('ctis', 'organizations')
  })
})

function setup() {
  const { databaseService } = setupDependencies()

  const esOrganizationRepository = new EsOrganizationRepository(databaseService)

  return { databaseService, esOrganizationRepository }
}
