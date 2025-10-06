export type ElasticsearchBodyType = {
  from: number
  query: {
    bool?: {
      must: Array<{
        match?: {
          [key: string]: string
        }
        range?: {
          [key: string]: { gte?: string, gt?: string, lte?: string, lt?: string }
        }
        query_string?: {
          query: string,
        }
      }>
      filter: Array<{
        term?: {
          [key: string]: string
        }
      }>
    }
  }
  size: number
  search_after?: string[]
  sort: {
    [key: string]: {
      order: 'asc' | 'desc'
    }
  }[]
}

export class ElasticsearchBodyBuilder {
  private readonly searchBody: ElasticsearchBodyType

  constructor() {
    this.searchBody = {
      from: 0,
      query: { bool: { filter: [], must: [] } },
      size: 0,
      sort: [
        { 'meta.lastUpdated': { order: 'desc' } },
        { _id: { order: 'desc' } },
        { 'status.keyword': { order: 'asc' } },
      ],
    }
  }

  withFrom(from: number): this {
    this.searchBody.from = from
    return this
  }

  withSearchAfter(searchAfter: string[]): this {
    this.searchBody.search_after = searchAfter
    this.withFrom(0)
    return this
  }

  withSize(size: number): this {
    this.searchBody.size = size
    return this
  }

  withSort(fieldname: string, order: 'asc' | 'desc'): this {
    // Vérifie s'il existe déjà un élément avec la même clé
    const index = this.searchBody.sort.findIndex((item) => Object.keys(item)[0] === fieldname)
    if (index !== -1) {
      this.searchBody.sort.splice(index, 1) // Supprime l'ancien élément
    }
    // Ajoute en première position
    this.searchBody.sort.unshift({ [fieldname]: { order } })
    return this
  }

  withText(value: string): this {
    this.searchBody.query.bool.must.push({ query_string: { query: value } })
    return this
  }

  withMatch(fieldname: string, value: string): this {
    this.searchBody.query.bool.must.push({ match: { [fieldname]: value } })
    return this
  }

  withTerm(fieldname: string, value: string): this {
    this.searchBody.query.bool.filter.push({ term: { [fieldname]: value } })
    return this
  }

  withRange(fieldname: string, value: string, operators: Operator[]): this {
    const operatorsAndValues = {}
    for (const iterator of operators) {
      operatorsAndValues[iterator] = value
    }
    this.searchBody.query.bool.must.push({ range: { [fieldname]: operatorsAndValues } })
    return this
  }

  build(): ElasticsearchBodyType {
    return this.searchBody
  }
}

export type Operator = 'gte' | 'gt' | 'lte' | 'lt'
