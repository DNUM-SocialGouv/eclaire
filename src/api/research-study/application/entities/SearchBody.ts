export type SearchBodyType = {
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
      }>
    }
    query_string?: {
      query: string,
    }
  }
  size: number
  sort?: {
    [key: string]: {
      order: 'asc' | 'desc'
    }
  }[]
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
    if (this.searchBody.sort === undefined) {
      this.searchBody.sort = [{ [fieldname]: { order } }]
    } else {
      this.searchBody.sort.push({ [fieldname]: { order } })
    }
    return this
  }

  withText(value: string): this {
    this.searchBody.query = { query_string: { query: value } }
    return this
  }

  withMatch(fieldname: string, value: string): this {
    this.searchBody.query.bool.must.push({ match: { [fieldname]: value } })
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

  build(): SearchBodyType {
    return this.searchBody
  }
}

type Operator = 'gte' | 'gt' | 'lte' | 'lt'
