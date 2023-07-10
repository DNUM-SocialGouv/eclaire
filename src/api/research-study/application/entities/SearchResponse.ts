export class SearchResponse {
  readonly entry: unknown[]
  readonly link: SearchLink[]
  readonly resourceType: string
  readonly total: number
  readonly type: string

  static create(entry: unknown[], link: SearchLink[], total: number): SearchResponse {
    return {
      entry,
      link,
      resourceType: 'Bundle',
      total,
      type: 'searchset',
    }
  }
}

export type SearchLink = Readonly<{
  relation: string
  url: string
}>
