export type SearchBodyType = {
  from: number
  query: {
    bool: {
      must: Array<{
        match?: {
          [key: string]: string
        }
        range?: {
          [key: string]: string | { gte: string }
        }
      }>
    }
  }
  size: number
  sort?: {
    [key: string]: {
      order: 'asc' | 'desc'
    }
  }
}

export class SearchBodyBuilder {
  private readonly searchBody: SearchBodyType

  constructor() {
    this.searchBody = {
      from: 0,
      query: { bool: { must: [] } },
      size: 0,
    }
  }

  withFrom(from: number): this {
    this.searchBody.from = from
    return this
  }

  withSize(size: number): this {
    this.searchBody.size = size
    return this
  }

  withSort(fieldname: string, order: 'asc' | 'desc'): this {
    this.searchBody.sort = { [fieldname]: { order } }
    return this
  }

  withMatch(fieldname: string, value: string): this {
    this.searchBody.query.bool.must.push({ match: { [fieldname]: value } })
    return this
  }

  withRange(fieldname: string, value: string, operator: 'gte'): this {
    this.searchBody.query.bool.must.push({ range: { [fieldname]: { [operator]: value } } })
    return this
  }

  build(): SearchBodyType {
    return this.searchBody
  }
}
