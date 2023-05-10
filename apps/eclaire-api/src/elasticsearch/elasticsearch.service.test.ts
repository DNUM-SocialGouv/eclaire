import { ElasticsearchService } from './elasticsearch.service'
import { ElasticsearchServiceError } from './ElasticsearchServiceError'
import { ElasticsearchServiceNotFound } from './ElasticsearchServiceNotFound'
import { fakeClient, fakeDocument, FakeDocument, fakeDocuments, fakeId, fakeMapping } from './fakeClient'

describe('elasticsearch service', () => {
  it('should create an indice', async () => {
    // GIVEN
    const service = new ElasticsearchService(fakeClient)
    jest.spyOn(fakeClient.indices, 'create')

    // WHEN
    await service.createAnIndice<FakeDocument>(fakeMapping)

    // THEN
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(fakeClient.indices.create).toHaveBeenCalledWith({
      body: { mappings: fakeMapping },
      index: 'eclaire',
    },
    { ignore: [400] })
  })

  it('should not create an indice', async () => {
    // GIVEN
    const service = new ElasticsearchService(fakeClient)
    // @ts-ignore
    jest.spyOn(fakeClient.indices, 'create').mockRejectedValueOnce('create is down')

    try {
      // WHEN
      await service.createAnIndice<FakeDocument>(fakeMapping)
      throw new Error('Should not be triggered')
    } catch (error) {
      // THEN
      // @ts-ignore
      expect(error.message).toBe('create is down')
      expect(error).toBeInstanceOf(ElasticsearchServiceError)
    }
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
      type: 'clinicaltrial',
    })
    expect(result).toStrictEqual(fakeDocument)
  })

  it('should not find one document', async () => {
    // GIVEN
    const service = new ElasticsearchService(fakeClient)
    // @ts-ignore
    jest.spyOn(fakeClient, 'get').mockReturnValue({ body: { found: false } })

    try {
      // WHEN
      await service.findOneDocument<FakeDocument>('888')
      throw new Error('Should not be triggered')
    } catch (error) {
      // THEN
      // @ts-ignore
      expect(error).toBeInstanceOf(ElasticsearchServiceNotFound)
    }
  })

  it('should throw an error when elasticsearch client failed', async () => {
    // GIVEN
    const service = new ElasticsearchService(fakeClient)
    // @ts-ignore
    jest.spyOn(fakeClient, 'get').mockRejectedValueOnce('get is down')

    try {
      // WHEN
      await service.findOneDocument<FakeDocument>(fakeId)
      throw new Error('Should not be triggered')
    } catch (error) {
      // THEN
      // @ts-ignore
      expect(error.message).toBe('get is down')
      expect(error).toBeInstanceOf(ElasticsearchServiceError)
    }
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
      type: 'clinicaltrial',
    })
  })

  it('should not create some documents when bulk is down', async () => {
    // GIVEN
    const service = new ElasticsearchService(fakeClient)
    // @ts-ignore
    jest.spyOn(fakeClient, 'bulk').mockRejectedValueOnce('bulk is down')

    try {
      // WHEN
      await service.bulkDocuments(fakeDocuments)
      throw new Error('Should not be triggered')
    } catch (error) {
      // THEN
      // @ts-ignore
      expect(error.message).toBe('bulk is down')
      expect(error).toBeInstanceOf(ElasticsearchServiceError)
    }
  })
})
