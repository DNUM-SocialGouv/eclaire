import { Client, RequestParams } from '@elastic/elasticsearch'
import { RequestBody } from '@elastic/elasticsearch/lib/Transport'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ElasticsearchService {
  private readonly index = 'eclaire'
  private readonly type = '_doc'

  constructor(private readonly client: Client) {}

  async createAnIndex<T>(mappings: T): Promise<void> {
    await this.client.indices.create({
      body: { mappings },
      index: this.index,
    } satisfies RequestParams.IndicesCreate)
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
    const response = await this.client.search({
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
      return []
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

  private buildBody<T>(documents: T[]): UpsertElasticsearchBody[] {
    return documents.flatMap((document: T): UpsertElasticsearchBody[] => {
      return [
        { update: { _id: document['id'] as string } },
        { doc: document, doc_as_upsert: true },
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

type UpsertElasticsearchBody = Readonly<({ update: { _id: string } } | { doc_as_upsert: true; doc: unknown })>
