import { ElasticsearchService } from './ElasticsearchService'
import { fakeClient, FakeFhirDocument, fakeDocument, fakeDocument2, fakeDocuments, fakeId, fakeMapping } from '../test/helpers/fakeHelper'

describe('elasticsearch service', () => {
  it('should create an index', async () => {
    // GIVEN
    const service = new ElasticsearchService(fakeClient)
    vi.spyOn(fakeClient.indices, 'create')

    // WHEN
    await service.createAnIndex<FakeFhirDocument>(fakeMapping)

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
    expect(fakeClient.indices.delete).toHaveBeenCalledWith({ ignore_unavailable: true, index: 'eclaire' })
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
    const result = await service.findOneDocument(fakeId)

    // THEN
    expect(fakeClient.get).toHaveBeenCalledWith({
      _source_excludes: ['referenceContents'],
      id: fakeId,
      index: 'eclaire',
      type: '_doc',
    })
    expect(result).toStrictEqual(fakeDocument)
  })

  it('should bulk elastic index with documents', async () => {
    // GIVEN
    const service = new ElasticsearchService(fakeClient)
    vi.spyOn(fakeClient, 'bulk')

    // WHEN
    await service.bulkDocuments(fakeDocuments)

    // THEN
    expect(fakeClient.bulk).toHaveBeenCalledWith({
      body: [
        { update: { _id: fakeDocument.id } },
        { doc: fakeDocument, doc_as_upsert: true },
        { update: { _id: fakeDocument2.id } },
        { doc: fakeDocument2, doc_as_upsert: true },
      ],
      index: 'eclaire',
      refresh: true,
    })
  })

  it('should find a reference content', async () => {
    // GIVEN
    const id = 'ctis'
    const elasticsearchService = new ElasticsearchService(fakeClient)
    vi.spyOn(fakeClient, 'search')

    // WHEN
    const result = await elasticsearchService.findReferenceContent(id, 'organizations')

    // THEN
    expect(fakeClient.search).toHaveBeenCalledWith({
      body: {
        query: {
          bool: {
            filter: [
              {
                multi_match: {
                  lenient: true,
                  query: id,
                  type: 'phrase',
                },
              },
            ],
          },
        },
      },
      index: 'eclaire',
    })
    expect(result).toStrictEqual({ fake_field: 'fake_field' })
  })

  it('should not find a reference content', async () => {
    // GIVEN
    const id = 'ctis'
    const elasticsearchService = new ElasticsearchService(fakeClient)
    vi.spyOn(fakeClient, 'search').mockReturnValueOnce({
      // @ts-ignore
      body: {
        hits: {
          hits: [],
          total: { value: 0 },
        },
      },
    })

    // WHEN
    const result = await elasticsearchService.findReferenceContent(id, 'organizations')

    // THEN
    expect(result).toStrictEqual([])
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
