import { ElasticsearchService } from './ElasticsearchService'
import { fakeClient, FakeFhirDocument, fakeDocument, fakeDocument2, fakeDocuments, fakeId, fakeMapping } from '../test/helpers/fakeHelper'

describe('elasticsearch service', () => {
  it('should create an index', async () => {
    // GIVEN
    const service = new ElasticsearchService(fakeClient)
    vi.spyOn(fakeClient.indices, 'create').mockResolvedValueOnce({} as any)
    vi.spyOn(fakeClient.ingest, 'putPipeline').mockResolvedValueOnce({} as any)

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
    vi.spyOn(fakeClient.indices, 'delete').mockResolvedValueOnce({} as unknown as any)

    // WHEN
    await service.deleteAnIndex()

    // THEN
    expect(fakeClient.indices.delete).toHaveBeenCalledWith({ ignore_unavailable: true, index: 'eclaire' })
  })

  it('should update an index', async () => {
    // GIVEN
    const service = new ElasticsearchService(fakeClient)
    vi.spyOn(fakeClient.indices, 'putMapping').mockResolvedValueOnce({} as unknown as any)

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
    // WHEN
    const result = await service.findOneDocument(fakeId)

    expect(result).toStrictEqual(fakeDocument)
  })

  it('should bulk elastic index with documents', async () => {
    // GIVEN
    const service = new ElasticsearchService(fakeClient)
    vi.spyOn(fakeClient, 'bulk').mockResolvedValueOnce({} as unknown as any)

    // WHEN
    await service.bulkDocuments(fakeDocuments)

    // THEN
    expect(fakeClient.bulk).toHaveBeenCalledWith({
      body: [
        { index: { _id: fakeDocument.id } },
        fakeDocument,
        { index: { _id: fakeDocument2.id } },
        fakeDocument2,
      ],
      index: 'eclaire',
      refresh: true,
    })
  })

  it('should find a reference content', async () => {
    // GIVEN
    const id = 'ctis'
    const databaseService = new ElasticsearchService(fakeClient)
    vi.spyOn(fakeClient, 'search').mockReturnValueOnce({
      // @ts-ignore
      body: {
        hits: {
          hits: [
            {
              _source: {
                referenceContents: {
                  organizations: [
                    {
                      id: '2022-500063-13-00-secondary-sponsor',
                      name: 'INDISPONIBLE',
                      resourceType: 'Organization',
                    },
                    {
                      id: 'ctis',
                      name: 'Clinical Trials Information System',
                      resourceType: 'Organization',
                    },
                  ],
                },
              },
            },
          ],
          total: { value: 1 },
        },
      },
    })

    // WHEN
    const result = await databaseService.findReferenceContent(id, 'organizations')

    // THEN
    expect(fakeClient.search).toHaveBeenCalledWith({
      body: { query: { match_phrase: { 'referenceContents.organizations.id': 'ctis' } } },
      index: 'eclaire',
    })
    expect(result).toStrictEqual([
      {
        id: '2022-500063-13-00-secondary-sponsor',
        name: 'INDISPONIBLE',
        resourceType: 'Organization',
      },
      {
        id: 'ctis',
        name: 'Clinical Trials Information System',
        resourceType: 'Organization',
      },
    ])
  })

  it('should not find a reference content when searching a reference type with wrong id', async () => {
    // GIVEN
    const id = 'ctis'
    const databaseService = new ElasticsearchService(fakeClient)
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
    const result = await databaseService.findReferenceContent(id, 'locations')

    // THEN
    expect(result).toStrictEqual([])
  })

  it('should not find a reference content when searching an enrollment group who does not exist', async () => {
    // GIVEN
    const id = '2022-500014-26-00-enrollment-group'
    const databaseService = new ElasticsearchService(fakeClient)
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
    const result = await databaseService.findReferenceContent(id, 'enrollmentGroup')

    // THEN
    expect(result).toStrictEqual(undefined)
  })

  it('should not find a reference content when searching an id who does not exist', async () => {
    // GIVEN
    const id = 'ctis'
    const databaseService = new ElasticsearchService(fakeClient)
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
    const result = await databaseService.findReferenceContent(id, 'organizations')

    // THEN
    expect(result).toStrictEqual([])
  })

  /* it('should create policies', async () => {
    // GIVEN
    const service = new ElasticsearchService(fakeClient)
    //vi.spyOn(fakeClient.enrich, 'putPolicy').mockResolvedValueOnce({} as unknown as any)
    //vi.spyOn(fakeClient.enrich, 'executePolicy').mockResolvedValueOnce({} as unknown as any)

    // WHEN
    await service.createPolicies()

    // THEN
    expect(fakeClient.transport.request).toHaveBeenCalledWith({
      method: 'PUT',
      path: '/_enrich/policy/update-meddra-labels',
      body: {
        match: {
          indices: 'meddra',
          match_field: 'code',
          enrich_fields: ['label'],
        },
      },
    })
    expect(fakeClient.transport.request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/_enrich/policy/update-meddra-labels/_execute',
    })
  })

  it('should delete policies when a policy exists', async () => {
    // GIVEN
    const service = new ElasticsearchService(fakeClient)
    //vi.spyOn(fakeClient.enrich, 'getPolicy').mockResolvedValueOnce({ body: { policies: [{}] } } as unknown as TransportRequestCallback)
    //vi.spyOn(fakeClient.enrich, 'deletePolicy').mockResolvedValueOnce({} as unknown as TransportRequestCallback)

    // WHEN
    await service.deletePolicies()

    // THEN
    expect(fakeClient.transport.request).toHaveBeenCalledWith({
      method: 'GET',
      path: '/_enrich/policy/update-meddra-labels',
    })

    expect(fakeClient.transport.request).toHaveBeenCalledWith({
      method: 'DELETE',
      path: '/_enrich/policy/update-meddra-labels',
    })
  })

  it('should not delete policies when the policy exists', async () => {
    // GIVEN
    const service = new ElasticsearchService(fakeClient)
    //vi.spyOn(fakeClient.enrich, 'getPolicy').mockResolvedValueOnce({ body: { policies: [] } } as unknown as TransportRequestCallback)
    //vi.spyOn(fakeClient.enrich, 'deletePolicy').mockResolvedValueOnce({} as unknown as TransportRequestCallback)
    // WHEN
    await service.deletePolicies()

    // THEN
    expect(fakeClient.transport.request).not.toHaveBeenCalledWith({
      method: 'DELETE',
      path: '/_enrich/policy',
    })
  }) */

  it('should delete pipeline', async () => {
    // GIVEN
    const service = new ElasticsearchService(fakeClient)
    vi.spyOn(fakeClient.ingest, 'deletePipeline').mockResolvedValueOnce({} as unknown as any)

    // WHEN
    await service.deletePipelines()

    // THEN
    expect(fakeClient.ingest.deletePipeline).toHaveBeenCalledWith({ id: '*' })
  })

  describe('#Search', () => {
    it('should filter results and return corresponding document', async () => {
      // GIVEN
      const databaseService = new ElasticsearchService(fakeClient)
      vi.spyOn(fakeClient, 'search')

      // WHEN
      const result = await databaseService.search({ query: { term: { 'scientific_title.value': 'ADN' } } })

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
