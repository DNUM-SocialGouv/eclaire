import { ApiResponse, Client, RequestParams } from '@elastic/elasticsearch'
import { RequestBody } from '@elastic/elasticsearch/lib/Transport'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ElasticsearchService {
  private readonly index = 'eclaire'
  private readonly type = '_doc'
  private readonly updateMedDraLabels = 'update-meddra-labels'

  constructor(private readonly client: Client) {}

  async createAnIndex<T>(mappings: T): Promise<void> {
    await this.client.indices.create({
      body: { mappings },
      index: this.index,
    } satisfies RequestParams.IndicesCreate)

    await this.client.ingest.putPipeline({
      body: {
        processors: [
          {
            foreach : {
              field : 'condition',
              ignore_missing: true,
              processor : {
                enrich: {
                  description: 'Add MedDra label in french',
                  field: '_ingest._value.coding.0.code',
                  ignore_missing: true,
                  policy_name: this.updateMedDraLabels,
                  target_field: '_ingest._value.coding.0.display',
                },
              },
            },
          },
          {
            foreach : {
              field : 'condition',
              ignore_missing: true,
              processor : {
                set: {
                  field: '_ingest._value.coding.0.display',
                  ignore_empty_value: true,
                  value: '{{_ingest._value.coding.0.display.label}}',
                },
              },
            },
          },
        ],
        version: 1,
      },
      id: this.updateMedDraLabels,
    } satisfies RequestParams.IngestPutPipeline)
  }

  async deleteAnIndex(): Promise<void> {
    await this.client.indices.delete({ ignore_unavailable: true, index: this.index } satisfies RequestParams.IndicesDelete)
  }

  async updateAnIndex<T>(mappings: T): Promise<void> {
    await this.client.indices.putMapping({
      body: mappings,
      index: this.index,
    } satisfies RequestParams.IndicesPutMapping)
  }

  async findOneDocument(id: string): Promise<unknown> {
    const response = await this.client.get({
      _source_excludes: ['referenceContents'],
      id,
      index: this.index,
      type: this.type,
    } satisfies RequestParams.Get)

    return response.body._source as unknown
  }

  async findReferenceContent(id: string, referenceType: 'enrollmentGroup' | 'locations' | 'organizations'): Promise<unknown> {
    const response: ApiResponse = await this.client.search({
      body: {
        query: {
          bool: {
            filter: [
              {
                multi_match: {
                  lenient: true,
                  query: id,
                  type: 'phrase',
                },
              },
            ],
          },
        },
      },
      index: this.index,
    } satisfies RequestParams.Search)

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
      pipeline: this.updateMedDraLabels,
      refresh: true,
    } satisfies RequestParams.Bulk)
  }

  async search(requestBody: RequestBody, withReferenceContents?: boolean): Promise<SearchResponse> {
    const response = await this.client.search({
      _source_excludes: withReferenceContents ? undefined : ['referenceContents'],
      body: requestBody,
      index: this.index,
    } satisfies RequestParams.Search)

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
    await this.client.enrich.putPolicy({
      body: {
        match: {
          enrich_fields: ['label'],
          indices: 'meddra',
          match_field: 'code',
        },
      },
      name: this.updateMedDraLabels,
    } satisfies RequestParams.EnrichPutPolicy)

    await this.client.enrich.executePolicy({ name: this.updateMedDraLabels } satisfies RequestParams.EnrichExecutePolicy)
  }

  async deletePolicies(): Promise<void> {
    const policies = await this.client.enrich.getPolicy({ name: this.updateMedDraLabels } satisfies RequestParams.EnrichGetPolicy)

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (policies.body.policies.length > 0) {
      await this.client.enrich.deletePolicy({ name: this.updateMedDraLabels } satisfies RequestParams.EnrichDeletePolicy)
    }
  }

  async deletePipelines(): Promise<void> {
    await this.client.ingest.deletePipeline({ id: '*' } satisfies RequestParams.IngestDeletePipeline)
  }

  async createMedDraIndex(): Promise<void> {
    const mappings = {
      properties: {
        code: { type: 'text' },
        label: { type: 'text' },
      },
    }
    await this.client.indices.create({
      body: { mappings },
      index: 'meddra',
    } satisfies RequestParams.IndicesCreate)
  }

  async deleteMedDraIndex(): Promise<void> {
    await this.client.indices.delete({ ignore_unavailable: true, index: 'meddra' } satisfies RequestParams.IndicesDelete)
  }

  async findMedDraDocument(id: string): Promise<unknown> {
    const response = await this.client.get({
      id,
      index: 'meddra',
      type: this.type,
    } satisfies RequestParams.Get)

    return response.body._source as unknown
  }

  async findMedDraDocuments<T>(ids: string[]): Promise<T[]> {
    const response = await this.client.search({
      body: { query: { bool: { filter: { terms: { _id: ids } } } } },
      index: 'meddra',
    } satisfies RequestParams.Search)

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    return response.body.hits.hits.map((hit): string => hit._source as string) as T[]
  }

  async bulkMedDraDocuments<T>(documents: T[]): Promise<void> {
    const chunkSize = 5000

    for (let i = 0; i < documents.length; i += chunkSize) {
      const chunk = documents.slice(i, i + chunkSize)

      await this.client.bulk({
        body: this.buildMedDraBody(chunk),
        index: 'meddra',
        refresh: true,
      } satisfies RequestParams.Bulk)
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

type UpsertElasticsearchBody<T> = Readonly<({ index: { _id: string }} | T )>
