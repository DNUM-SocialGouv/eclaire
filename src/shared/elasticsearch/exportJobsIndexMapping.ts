export const exportJobsIndexMapping = {
  properties: {
    createdAt: { type: 'date' },
    error: { type: 'text' },
    filePath: { type: 'keyword' },
    id: { type: 'keyword' },
    progress: { type: 'integer' },
    status: { type: 'keyword' }, // pending | processing | done | error
    updatedAt: { type: 'date' },
  },
}
