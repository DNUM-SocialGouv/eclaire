import { EsGroupRepository } from './EsGroupRepository'
import { setupClientAndElasticsearchService } from '../../../shared/test/helpers/elasticsearchHelper'

describe('elasticsearch research study repository', () => {
  it('should retrieve one research study', async () => {
    // GIVEN
    const { elasticsearchService, esGroupRepository } = setup()
    vi.spyOn(elasticsearchService, 'findReferenceContent').mockResolvedValueOnce({})

    // WHEN
    await esGroupRepository.find('2022-500014-26-00-enrollment-group')

    // THEN
    expect(elasticsearchService.findReferenceContent).toHaveBeenCalledWith('2022-500014-26-00-enrollment-group', 'enrollmentGroup')
  })
})

function setup() {
  const { elasticsearchService } = setupClientAndElasticsearchService()

  const esGroupRepository = new EsGroupRepository(elasticsearchService)

  return { elasticsearchService, esGroupRepository }
}
