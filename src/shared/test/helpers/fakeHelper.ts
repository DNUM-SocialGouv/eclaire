import { Client } from '@elastic/elasticsearch'

export type FakeFhirDocument = Readonly<{
  fake_field: string
  id: string
}>

export const fakeId = '999'

export const fakeDocument: FakeFhirDocument = {
  fake_field: 'fake_field',
  id: fakeId,
}

export const fakeDocument2: FakeFhirDocument = {
  fake_field: 'fake_field',
  id: '888',
}

export const fakeDocuments = [fakeDocument, fakeDocument2]

export const fakeClient = {
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
    delete: () => {
      return {}
    },
    putMapping: () => {
      return {}
    },
  },

  search: () => {
    return {
      body: {
        hits: {
          hits: [{ _source: fakeDocument }],
          total: { value: 1 },
        },
      },
    }
  },
} as unknown as Client

export const fakeMapping = {
  fake_field: 'string',
  id: 'string',
}
