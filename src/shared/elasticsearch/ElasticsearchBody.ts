export type Operator = 'gte' | 'gt' | 'lte' | 'lt'

/**
 * Nested Query Type
 */
export type NestedQuery = {
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

/**
 * All possible query clauses (backward compatible)
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
      must_not?: NestedQuery[]
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

  /**
   * NEW — Nested Term Query
   * Exemple:
   * .withNestedTerm('category.coding', 'category.coding.code', 'REG536')
   */
  withDoubleNestedMust(
    parentPath: string,
    childPath: string,
    terms: Record<string, string>,
  ): this {
    const mustClauses = Object.entries(terms).map(([field, value]) => ({
      term: { [field]: value },
    }))

    this.searchBody.query.bool.filter.push({
      nested: {
        path: parentPath,
        query: {
          nested: {
            path: childPath,
            query: {
              bool: {
                must: mustClauses,
              },
            },
          },
        },
      },
    } as any)

    return this
  }

  /**
   * NEW — Nested NOT Term Query
   * Exemple:
   * .withNestedNotTerm('category.coding', 'category.coding.code', 'REG536')
   */
  withDoubleNestedMustAndMustNot(
    parentPath: string,
    childPath: string,
    mustTerms: Record<string, string>,
    mustNotTerms: Record<string, string>,
  ): this {
    const mustClauses = Object.entries(mustTerms).map(([field, value]) => ({
      term: { [field]: value },
    }))

    const mustNotClauses = Object.entries(mustNotTerms).map(([field, value]) => ({
      term: { [field]: value },
    }))

    this.searchBody.query.bool.filter.push({
      nested: {
        path: parentPath,
        query: {
          nested: {
            path: childPath,
            query: {
              bool: {
                must: mustClauses,
                must_not: mustNotClauses,
              },
            },
          },
        },
      },
    } as any)

    return this
  }

  build(): ElasticsearchBodyType {
    return this.searchBody
  }
}
