import { EsGroupRepository } from './EsGroupRepository'
import { setupDependencies } from '../../../shared/test/helpers/elasticsearchHelper'

describe('elasticsearch research study repository', () => {
  it('should retrieve one research study', async () => {
    // GIVEN
    const { databaseService, esGroupRepository } = setup()
    vi.spyOn(databaseService, 'findReferenceContent').mockResolvedValueOnce({})

    // WHEN
    await esGroupRepository.find('2022-500014-26-00-enrollment-group')

    // THEN
    expect(databaseService.findReferenceContent).toHaveBeenCalledWith('2022-500014-26-00-enrollment-group', 'enrollmentGroup')
  })
})

function setup() {
  const { databaseService } = setupDependencies()

  const esGroupRepository = new EsGroupRepository(databaseService)

  return { databaseService, esGroupRepository }
}
