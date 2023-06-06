import { ElasticsearchService } from './ElasticsearchService'
import { fakeClient, FakeDocument, fakeDocument, fakeDocuments, fakeId, fakeMapping } from '../test/helpers/fakeHelper'

describe('elasticsearch service', () => {
  it('should create an index', async () => {
    // GIVEN
    const service = new ElasticsearchService(fakeClient)
    jest.spyOn(fakeClient.indices, 'create')

    // WHEN
    await service.createAnIndex<FakeDocument>(fakeMapping)

    // THEN
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(fakeClient.indices.create).toHaveBeenCalledWith({
      body: { mappings: fakeMapping },
      index: 'eclaire',
    })
  })

  it('should update an index', async () => {
    // GIVEN
    const service = new ElasticsearchService(fakeClient)
    jest.spyOn(fakeClient.indices, 'putMapping')

    // WHEN
    await service.updateAnIndex(fakeMapping)

    // THEN
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(fakeClient.indices.putMapping).toHaveBeenCalledWith({
      body: fakeMapping,
      index: 'eclaire',
    })
  })

  it('should find one document', async () => {
    // GIVEN
    const service = new ElasticsearchService(fakeClient)
    jest.spyOn(fakeClient, 'get')

    // WHEN
    const result = await service.findOneDocument<FakeDocument>(fakeId)

    // THEN
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(fakeClient.get).toHaveBeenCalledWith({
      id: fakeId,
      index: 'eclaire',
      type: '_doc',
    })
    expect(result).toStrictEqual(fakeDocument)
  })

  it('should create some documents', async () => {
    // GIVEN
    const service = new ElasticsearchService(fakeClient)
    jest.spyOn(fakeClient, 'bulk')

    // WHEN
    await service.bulkDocuments(fakeDocuments)

    // THEN
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(fakeClient.bulk).toHaveBeenCalledWith({
      body: fakeDocuments,
      index: 'eclaire',
      refresh: true,
    })
  })

  describe('#Search', () => {
    it('should filter results and return corresponding document', async () => {
      // GIVEN
      const elasticsearchService = new ElasticsearchService(fakeClient)
      jest.spyOn(fakeClient, 'search')

      // WHEN
      const result = await elasticsearchService.search({ query: { term: { 'scientific_title.value': 'ADN' } } })

      // THEN
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(fakeClient.search).toHaveBeenCalledWith({
        body: { query: { term: { 'scientific_title.value': 'ADN' } } },
        index: 'eclaire',
      })
      expect(result).toStrictEqual({
        hits: [fakeDocument],
        total: 1,
      })
    })
  })
})
