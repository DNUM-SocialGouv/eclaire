const coding = {
  properties: {
    code: { type: 'text' },
    display: { type: 'text' },
    system: { type: 'text' },
    version: { type: 'text' },
  },
}
const codeableConcept = {
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
    use: { type: 'text' },
    value: { type: 'text' },
  },
}
export const researchStudyIndexMapping = {
  properties: {
    category: { properties: { codeableConcept } },
    condition: { properties: { codeableConcept } },
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
          format: 'dd/MM/yyyy',
          ignore_malformed: true,
          type: 'date',
        },
      },
    },
    phase: { properties: { codeableConcept } },
    status: { type: 'text' },
    title: { type: 'text' },
  },
}
