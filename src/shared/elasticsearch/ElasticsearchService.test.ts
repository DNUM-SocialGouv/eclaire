import { Client } from '@elastic/elasticsearch'

import { ElasticsearchService } from './ElasticsearchService'

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
})

type FakeDocument = Readonly<{
  fake_field: string
  uuid: string
}>

const fakeId = '999'

const fakeDocument: FakeDocument = {
  fake_field: 'fake_field',
  uuid: fakeId,
}

const fakeDocuments = [
  { index: { _id: fakeDocument.uuid } },
  fakeDocument,
]

const fakeClient = {
  bulk: () => {
    return {}
  },

  get: () => {
    return { body: { _source: fakeDocument } }
  },

  indices: {
    create: () => {
      return {}
    },
    putMapping: () => {
      return {}
    },
  },
} as unknown as Client

const fakeMapping = {
  fake_field: 'string',
  uuid: 'string',
}
