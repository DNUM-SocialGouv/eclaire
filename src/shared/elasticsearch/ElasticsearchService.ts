import { Client } from '@opensearch-project/opensearch'

import type { ApiResponse } from '@opensearch-project/opensearch'

/**
 * Nested Query Type
 */
type NestedQuery = {
  nested: {
    path: string
    query: {
      bool?: {
        must?: any[]
        filter?: any[]
        must_not?: any[]
      }
      term?: {
        [key: string]: string
      }
    }
  }
}

type MustClause =
  | { match: { [key: string]: string } }
  | { range: { [key: string]: any } }
  | { query_string: { query: string } }
  | NestedQuery

type FilterClause =
  | { term: { [key: string]: string } }
  | NestedQuery

type CountRequest = {
  bool?: {
    must: MustClause[]
    filter: FilterClause[]
    must_not?: NestedQuery[]
  };
}

export class ElasticsearchService {
  private readonly index = 'eclaire'
  private readonly updateMedDraLabels = 'update-meddra-labels'
  private enrichMap: Map<string, string> = new Map()

  constructor(private readonly client: Client) { }

  async createAnIndex<T>(mappings: T): Promise<void> {
    await this.client.indices.create({
      body: { mappings },
      index: this.index,
    })
  }

  async deleteAnIndex(): Promise<void> {
    await this.client.indices.delete({ ignore_unavailable: true, index: this.index })
  }

  async updateAnIndex<T>(mappings: T): Promise<void> {
    await this.client.indices.putMapping({
      body: mappings,
      index: this.index,
    })
  }

  async countDocuments(filters?: Record<string, string | number>): Promise<number> {
    if (!filters || Object.keys(filters).length === 0) {
      const response = await this.client.count({
        body: { query: { match_all: {} } },
        index: this.index,
      })

      return response.body.count
    }

    const must: any[] = []
    const nestedMust: any[] = []

    for (const [field, value] of Object.entries(filters)) {
      if (field.startsWith('category.coding.')) {
        nestedMust.push({ term: { [field]: value } })
      } else {
        must.push({ term: { [field]: value } })
      }
    }

    let query: any

    if (nestedMust.length > 0) {
      query = {
        bool: {
          must: [
            ...must,
            {
              nested: {
                path: 'category',
                query: {
                  nested: {
                    path: 'category.coding',
                    query: { bool: { must: nestedMust } },
                  },
                },
              },
            },
          ],
        },
      }
    } else {
      query = { bool: { must } }
    }

    const response = await this.client.count({
      body: { query },
      index: this.index,
    })

    return response.body.count
  }

  async getCountDocuments(filters?: CountRequest): Promise<number> {
    const response = await this.client.count({
      // Only the `body` is `any`; the rest is fully typed
      body: { query: filters ? filters : { match_all: {} } } as any,
      index: this.index,
    })

    return response.body.count
  }

  async findOneDocument(id: string): Promise<unknown> {
    const response: ApiResponse = await this.client.get({
      _source_excludes: ['referenceContents'],
      id,
      index: this.index,
    })

    return response.body._source as unknown
  }

  async findManyDocument(ids: string[]): Promise<unknown> {
    const response: ApiResponse = await this.client.search({
      body: { query: { terms: { _id: ids } } },
      index: this.index,
    })

    return {
      hits: response.body.hits.hits,
      total: response.body.hits.total.value as number,
    }
  }

  async deleteManyDocument(ids: string[]): Promise<unknown> {
    try {
      const response: ApiResponse = await this.client.deleteByQuery({
        body: { query: { terms: { _id: ids } } },
        index: this.index,
      })

      if (response.body.failures?.length) {
        // eslint-disable-next-line no-console
        console.warn('Some documents failed to delete: ', response.body.failures)
        return response
      }
      return response
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Delete by query failed: ', error)
      return error
    }
  }

  async findReferenceContent(id: string, referenceType: 'enrollmentGroup' | 'locations' | 'organizations'): Promise<unknown> {
    const response: ApiResponse = await this.client.search({
      body: { query: { match_phrase: { [`referenceContents.${referenceType}.id`]: id } } },
      index: this.index,
    })

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (response.body.hits.hits.length === 0) {
      return referenceType === 'enrollmentGroup' ? undefined : []
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-return
      return response.body.hits.hits[0]._source['referenceContents'][referenceType]
    }
  }

  async bulkDocuments<T>(documents: T[]): Promise<void> {
    await this.client.bulk({
      body: this.buildBody(documents),
      index: this.index,
      refresh: true,
    })
  }

  async search(requestBody: Record<string, any>, withReferenceContents?: boolean): Promise<SearchResponse> {
    const response: ApiResponse = await this.client.search({
      _source_excludes: withReferenceContents ? undefined : ['referenceContents'],
      body: requestBody,
      index: this.index,
    })

    return {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      hits: response.body.hits.hits,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      total: response.body.hits.total.value as number,
    }
  }

  private buildBody<T>(documents: T[]): UpsertElasticsearchBody<T>[] {
    return documents.flatMap((document: T): UpsertElasticsearchBody<T>[] => {
      return [
        { index: { _id: document['id'] as string } },
        document,
      ]
    })
  }

  async createPolicies(): Promise<void> {
    // 🔁 === Partie équivalente à enrich.putPolicy ===
    // On construit une "policy enrich" manuellement en lisant les données depuis l’index 'meddra'
    const scroll = '1m'
    const size = 500

    const response = await this.client.search({
      body: {
        _source: ['code', 'label'], // récupère 'code' et 'label'
        query: { match_all: {} },
      },
      index: 'meddra',
      scroll,
      size,
    })

    let scrollId = response.body._scroll_id
    let hits = response.body.hits.hits

    while (hits.length > 0) {
      for (const hit of hits) {
        const source = hit._source
        if (source?.['code']) {
          const code = source['code']
          const label = source['label']
          if (code && label) {
            this.enrichMap.set(code, label)
          }
        }
      }

      const scrollResponse = await this.client.scroll({
        scroll,
        scroll_id: scrollId,
      })

      scrollId = scrollResponse.body._scroll_id
      hits = scrollResponse.body.hits.hits
    }

    // ✅ === Fin de la simulation de enrich.putPolicy ===

    // 🚀 === Partie équivalente à enrich.executePolicy ===
    // Ici on peut, par exemple, stocker les données dans un nouvel index ou les garder en mémoire.
    // Pour cette version simple, on garde l’enrichMap en mémoire pour enrichir manuellement plus tard.
    // eslint-disable-next-line no-console
    console.log(`✅ Enrich policy '${this.updateMedDraLabels}' exécutée : ${this.enrichMap.size} entrées générées`)
    // === Fin de la simulation de enrich.executePolicy ===
  }

  async deletePolicies(): Promise<void> {
    try {
      // Check if enrich index exists
      const exists = await this.client.indices.exists({ index: this.updateMedDraLabels })

      if (exists.body) {
        // Delete the enrich index to "delete the policy"
        await this.client.indices.delete({ index: this.updateMedDraLabels })
        // eslint-disable-next-line no-console
        console.log(`Index ${this.updateMedDraLabels} deleted`)
      } else {
        // eslint-disable-next-line no-console
        console.log(`Index ${this.updateMedDraLabels} does not exist`)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error deleting enrich index:', error)
    }
  }

  async deletePipelines(): Promise<void> {
    await this.client.ingest.deletePipeline({ id: '*' })
  }

  async createMedDraIndex(): Promise<void> {
    const mappings: any = {
      properties: {
        code: { type: 'text' },
        label: { type: 'text' },
      },
    }
    await this.client.indices.create({
      body: { mappings },
      index: 'meddra',
    })
  }

  async deleteMedDraIndex(): Promise<void> {
    await this.client.indices.delete({ ignore_unavailable: true, index: 'meddra' })
  }

  async findMedDraDocument(id: string): Promise<unknown> {
    const response: ApiResponse = await this.client.get({
      id,
      index: 'meddra',
    })

    return response.body._source as unknown
  }

  async findMedDraDocuments<T>(ids: string[]): Promise<T[]> {
    const response = await this.client.search({
      body: { query: { bool: { filter: [{ terms: { _id: ids } }] } } } as any,
      index: 'meddra',
    })

    return response.body.hits.hits.map((hit) => hit._source as T)
  }

  async bulkMedDraDocuments<T>(documents: T[]): Promise<void> {
    const chunkSize = 1000

    for (let i = 0; i < documents.length; i += chunkSize) {
      const chunk = documents.slice(i, i + chunkSize)

      await this.client.bulk({
        body: this.buildMedDraBody(chunk),
        index: 'meddra',
        refresh: true,
      })
    }
  }

  private buildMedDraBody<T>(documents: T[]): UpsertElasticsearchBody<T>[] {
    return documents.flatMap((document: T): UpsertElasticsearchBody<T>[] => {
      return [
        { index: { _id: document['code'] as string } },
        document,
      ]
    })
  }
}

export type SearchResponse = Readonly<{
  hits: SearchResponseHits[]
  total: number
}>

export type SearchResponseHits = Readonly<{
  _index: string
  _type: string
  _id: string
  _score: number
  _source: Record<string, string>
  sort?: (number | string)[]
}>

type UpsertElasticsearchBody<T> = Readonly<({ index: { _id: string } } | T)>
