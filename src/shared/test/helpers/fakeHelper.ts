import { Client } from '@elastic/elasticsearch'

export type FakeDocument = Readonly<{
  fake_field: string
  uuid: string
}>

export const fakeId = '999'

export const fakeDocument: FakeDocument = {
  fake_field: 'fake_field',
  uuid: fakeId,
}

export const fakeDocuments = [
  { index: { _id: fakeDocument.uuid } },
  fakeDocument,
]

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
  uuid: 'string',
}
