import { Client } from '@elastic/elasticsearch'

export type FakeFhirDocument = Readonly<{
  fake_field: string
  id: string
  referenceContents: unknown
}>

export const fakeId = '999'

export const fakeDocument: FakeFhirDocument = {
  fake_field: 'fake_field',
  id: fakeId,
  referenceContents: { organizations: { fake_field: 'fake_field' } },
}

export const fakeDocument2: FakeFhirDocument = {
  fake_field: 'fake_field',
  id: '888',
  referenceContents: {},
}

export const fakeDocuments = [fakeDocument, fakeDocument2]

export const fakeClient = {
  bulk: () => {
    return {}
  },

  enrich: {
    deletePolicy: () => {
      return {}
    },
    executePolicy: () => {
      return {}
    },
    getPolicy: () => {
      return {}
    },
    putPolicy: () => {
      return {}
    },
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

  ingest: {
    deletePipeline: () => {
      return {}
    },
    putPipeline: () => {
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

  updateByQuery: () => {
    return {}
  },
} as unknown as Client

export const fakeMapping = {
  fake_field: 'string',
  id: 'string',
  referenceContents: 'object',
}
