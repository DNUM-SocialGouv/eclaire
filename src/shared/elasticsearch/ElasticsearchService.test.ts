import { ElasticsearchService } from './ElasticsearchService'
import { fakeClient, FakeDocument, fakeDocument, fakeDocuments, fakeId, fakeMapping } from '../test/helpers/fakeHelper'

describe('elasticsearch service', () => {
  it('should create an index', async () => {
    // GIVEN
    const service = new ElasticsearchService(fakeClient)
    vi.spyOn(fakeClient.indices, 'create')

    // WHEN
    await service.createAnIndex<FakeDocument>(fakeMapping)

    // THEN
    expect(fakeClient.indices.create).toHaveBeenCalledWith({
      body: { mappings: fakeMapping },
      index: 'eclaire',
    })
  })

  it('should delete an index', async () => {
    // GIVEN
    const service = new ElasticsearchService(fakeClient)
    vi.spyOn(fakeClient.indices, 'delete')

    // WHEN
    await service.deleteAnIndex()

    // THEN
    expect(fakeClient.indices.delete).toHaveBeenCalledWith({ index: 'eclaire' })
  })

  it('should update an index', async () => {
    // GIVEN
    const service = new ElasticsearchService(fakeClient)
    vi.spyOn(fakeClient.indices, 'putMapping')

    // WHEN
    await service.updateAnIndex(fakeMapping)

    // THEN
    expect(fakeClient.indices.putMapping).toHaveBeenCalledWith({
      body: fakeMapping,
      index: 'eclaire',
    })
  })

  it('should find one document', async () => {
    // GIVEN
    const service = new ElasticsearchService(fakeClient)
    vi.spyOn(fakeClient, 'get')

    // WHEN
    const result = await service.findOneDocument<FakeDocument>(fakeId)

    // THEN
    expect(fakeClient.get).toHaveBeenCalledWith({
      _source_excludes: ['referenceContents'],
      id: fakeId,
      index: 'eclaire',
      type: '_doc',
    })
    expect(result).toStrictEqual(fakeDocument)
  })

  it('should create some documents', async () => {
    // GIVEN
    const service = new ElasticsearchService(fakeClient)
    vi.spyOn(fakeClient, 'bulk')

    // WHEN
    await service.bulkDocuments(fakeDocuments)

    // THEN
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
      vi.spyOn(fakeClient, 'search')

      // WHEN
      const result = await elasticsearchService.search({ query: { term: { 'scientific_title.value': 'ADN' } } })

      // THEN
      expect(fakeClient.search).toHaveBeenCalledWith({
        _source_excludes: ['referenceContents'],
        body: { query: { term: { 'scientific_title.value': 'ADN' } } },
        index: 'eclaire',
      })
      expect(result).toStrictEqual({
        hits: [{ _source: fakeDocument }],
        total: 1,
      })
    })
  })
})
