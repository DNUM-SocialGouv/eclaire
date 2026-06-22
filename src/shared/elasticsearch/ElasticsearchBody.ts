export type Operator = 'gte' | 'gt' | 'lte' | 'lt'

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
        should?: any[]
      }
      term?: {
        [key: string]: string
      }
      nested?: NestedQuery['nested']
    }
  }
}

/**
 * All possible query clauses
 */
type MustClause =
  | { match: { [key: string]: string } }
  | { range: { [key: string]: any } }
  | { query_string: { query: string } }
  | NestedQuery

type FilterClause =
  | { term: { [key: string]: string } }
  | NestedQuery

export type ElasticsearchBodyType = {
  from: number
  query: {
    bool: {
      must: MustClause[]
      filter: FilterClause[]
      minimum_should_match?: number
      must_not?: NestedQuery[]
      should?: MustClause[]
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

/**
 * Small reusable builders
 */
const termClause = (field: string, value: string) => ({ term: { [field]: value } })

const matchClause = (field: string, value: string) => ({ match: { [field]: value } })

const rangeClause = (field: string, operators: Record<string, any>) => ({ range: { [field]: operators } })

const nestedQuery = (path: string, query: any): NestedQuery => ({ nested: { path, query } })

export class ElasticsearchBodyBuilder {
  private readonly searchBody: ElasticsearchBodyType

  constructor() {
    this.searchBody = {
      from: 0,
      query: {
        bool: {
          filter: [],
          must: [],
          should: [],
        },
      },
      size: 0,
      sort: [
        { 'meta.lastUpdated': { order: 'desc' } },
        { _id: { order: 'desc' } },
        { 'status.keyword': { order: 'asc' } },
      ],
    }
  }

  /**
   * Internal helpers (reduce repetition)
   */
  private addMust(clause: MustClause): void {
    this.searchBody.query.bool.must.push(clause)
  }

  private addFilter(clause: FilterClause): void {
    this.searchBody.query.bool.filter.push(clause)
  }

  private buildDoubleNested(
    parentPath: string,
    childPath: string,
    must: any[],
    mustNot?: any[]
  ): NestedQuery {
    return nestedQuery(parentPath, {
      nested: {
        path: childPath,
        query: {
          bool: {
            ...(must.length ? { must } : {}),
            ...(mustNot?.length ? { must_not: mustNot } : {}),
          },
        },
      },
    })
  }

  /**
   * Public API
   */
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

  /* withSort(fieldname: string, order: 'asc' | 'desc'): this {
    const index = this.searchBody.sort.findIndex(
      (item) => Object.keys(item)[0] === fieldname
    )

    if (index !== -1) {
      this.searchBody.sort.splice(index, 1)
    }

    this.searchBody.sort.unshift({ [fieldname]: { order } })
    return this
  } */

  withSort(fieldname: string, order: 'asc' | 'desc'): this {
    this.searchBody.sort = [{ [fieldname]: { order } }]

    return this
  }

  withText(value: string): this {
    this.addMust({ query_string: { query: value } })
    return this
  }

  withMatch(fieldname: string, value: string): this {
    this.addMust(matchClause(fieldname, value))
    return this
  }

  withShouldMatch(fieldname: string, value: string): this {
    this.searchBody.query.bool.should ??= []

    this.searchBody.query.bool.should.push({ match: { [fieldname]: value } })

    this.searchBody.query.bool.minimum_should_match = 1

    return this
  }

  withTerm(fieldname: string, value: string): this {
    this.addFilter(termClause(fieldname, value))
    return this
  }

  withRange(fieldname: string, value: string, operators: Operator[]): this {
    const operatorsAndValues: Record<string, string> = {}

    for (const op of operators) {
      operatorsAndValues[op] = value
    }

    this.addMust(rangeClause(fieldname, operatorsAndValues))
    return this
  }

  withShouldRange(fieldname: string, value: string, operators: Operator[]): this {
    const operatorsAndValues = {}

    for (const iterator of operators) {
      operatorsAndValues[iterator] = value
    }

    this.searchBody.query.bool.should ??= []

    this.searchBody.query.bool.should.push({ range: { [fieldname]: operatorsAndValues } })

    this.searchBody.query.bool.minimum_should_match = 1

    return this
  }

  /**
   * Nested MUST
   */
  withDoubleNestedMust(
    parentPath: string,
    childPath: string,
    terms: Record<string, string>
  ): this {
    const mustClauses = Object.entries(terms).map(([f, v]) =>
      termClause(f, v))

    this.addFilter(
      this.buildDoubleNested(parentPath, childPath, mustClauses)
    )

    return this
  }

  /**
   * Nested MUST + MUST_NOT
   */
  withDoubleNestedMustAndMustNot(
    parentPath: string,
    childPath: string,
    mustTerms: Record<string, string>,
    mustNotTerms: Record<string, string>
  ): this {
    const mustClauses = Object.entries(mustTerms).map(([f, v]) =>
      termClause(f, v))

    const mustNotClauses = Object.entries(mustNotTerms).map(([f, v]) =>
      termClause(f, v))

    this.addFilter(
      this.buildDoubleNested(
        parentPath,
        childPath,
        mustClauses,
        mustNotClauses
      )
    )

    return this
  }

  build(): ElasticsearchBodyType {
    return this.searchBody
  }
}
