const coding = {
  type: 'nested',
  properties: {
    code: { type: 'keyword' },
    display: { type: 'text' },
    system: { type: 'keyword' },
    version: { type: 'text' },
  },
}
const codeableConcept = {
  type: 'nested',
  properties: {
    coding,
    text: { type: 'text' },
  },
}
const reference = {
  properties: {
    display: { type: 'text' },
    reference: { type: 'text' },
  },
}
const identifier = {
  properties: {
    assigner: reference,
    system: { type: 'text' },
    use: { type: 'text' },
    value: { type: 'text' },
  },
}
export const elasticsearchIndexMapping = {
  properties: {
    category: codeableConcept,
    condition: codeableConcept,
    contact: {
      properties: {
        name: { type: 'text' },
        telecom: {
          properties: {
            system: { type: 'text' },
            use: { type: 'text' },
            value: { type: 'text' },
          },
        },
      },
    },
    contained: {
      properties: {
        actual: { type: 'boolean' },
        characteristic: {
          properties: {
            exclude: { type: 'boolean' },
            valueCodeableConcept: codeableConcept,
          },
        },
        type: { type: 'text' },
      },
    },
    description: { type: 'text' },
    enrollment: { properties: { type: { type: 'text' } } },
    identifier,
    meta: {
      properties: {
        lastUpdated: {
          ignore_malformed: true,
          type: 'date',
        },
        profile: { type: 'text' },
      },
    },
    phase: codeableConcept,
    status: {
      fields: { keyword: { type: 'keyword' } },
      type: 'text',
    },
    title: { type: 'text' },
  },
}
