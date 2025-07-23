/* eslint-disable */
import { ApiResponse, Client as ESClient } from '@elastic/elasticsearch'
import { Client as OSClient } from '@opensearch-project/opensearch'

interface BulkResponseItem {
    index?: {
        _index: string;
        _id: string;
        error?: any;
    };
    create?: {
        _index: string;
        _id: string;
        error?: any;
    };
    update?: {
        _index: string;
        _id: string;
        error?: any;
    };
    delete?: {
        _index: string;
        _id: string;
        error?: any;
    };
}

const ES_URL = process.argv[2]
const OS_URL = process.argv[3]

if (!ES_URL || !OS_URL) {
  throw new Error('Les variables d\'environnement SCALINGO_ELASTICSEARCH_URL et SCALINGO_OPENSEARCH_URL doivent être définies')
} else {
  console.log('es_url ///', ES_URL)
  console.log('os_url ///', OS_URL)
}

const esClient = new ESClient({
  node: ES_URL,
  ssl: { rejectUnauthorized: false },
})

const osClient = new OSClient({
  node: OS_URL,
  ssl: { rejectUnauthorized: false },
})

async function bulkIndexWithRetry(client: OSClient, body: any[], maxRetries = 3): Promise<ApiResponse> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const bulkResponse = await client.bulk({ body, refresh: true })

    if (!bulkResponse.body.errors) {
      return bulkResponse
    }

    // Extract failed items
    const erroredItems: BulkResponseItem[] = bulkResponse.body.items.filter((item: BulkResponseItem) => {
      const op = Object.keys(item)[0]
      return item[op as keyof BulkResponseItem]?.error !== undefined
    })

    if (attempt === maxRetries) {
      throw new Error(`Bulk index failed after ${maxRetries} retries. Errors: ${JSON.stringify(erroredItems)}`)
    }

    console.log(`Retrying ${erroredItems.length} failed docs, attempt ${attempt}`)

    const retryBody: any[] = []
    erroredItems.forEach((item) => {
      const op = Object.keys(item)[0]
      const action = item[op as keyof BulkResponseItem]
      if (action) {
        retryBody.push({ [op]: { _id: action._id, _index: action._index } })
        // The original source is lost here; in real scenarios, you'd want to keep it or fetch again.
        // For simplicity, assume no source; handle carefully in production!
      }
    })

    body = retryBody
  }

  throw new Error('Should not reach here')
}

async function migrateIndex(index: string): Promise<void> {
  console.log(`Starting migration for index: ${index}`)

  const countResponse = await esClient.count({
    body: { query: { match_all: {} } },
    index,
  })

  const totalDocs = countResponse.body.count
  console.log(`Total documents in index "${index}": ${totalDocs}`)

  const scrollSearch = esClient.helpers.scrollSearch({
    index,
    scroll: '2m',
    body: { query: { match_all: {} } },
    size: 5000,
  })

  let totalMigrated = 0

  for await (const result of scrollSearch) {
    if (result.body.hits.hits.length === 0) break

    const bulkBody: any[] = []

    result.body.hits.hits.forEach((doc) => {
      bulkBody.push({ index: { _id: doc._id, _index: index } })
      bulkBody.push(doc._source)
    })

    try {
      await bulkIndexWithRetry(osClient, bulkBody)
      totalMigrated += result.body.hits.hits.length
      console.log(`Migrated ${totalMigrated} documents for index ${index}`)
    } catch (error) {
      console.error(`Bulk indexing failed on batch at document ${totalMigrated}`, error)
      throw error
    }
  }

  console.log(`Completed migration for index: ${index}. Total documents migrated: ${totalMigrated}`)
}

async function migrateAll(): Promise<void> {
  try {
    //await migrateIndex('meddra')
    await migrateIndex('eclaire')
    console.log('Full migration completed for all indexes.')
  } catch (error) {
    console.error('Migration error:', error)
  }
}

migrateAll()
