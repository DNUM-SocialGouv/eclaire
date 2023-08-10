import { ElasticsearchBodyBuilder, ElasticsearchBodyType, Operator } from '../../application/entities/ElasticsearchBody'
import { ResearchStudyQueryModel } from '../ResearchStudyQueryModel'

export function researchStudyQueryToElasticsearchQuery(researchStudyQuery: Partial<ResearchStudyQueryModel>): ElasticsearchBodyType {
  const numberOfResourcesByPage = Number(process.env.NUMBER_OF_RESOURCES_BY_PAGE)
  const searchBody = new ElasticsearchBodyBuilder()
    .withFrom(0)
    .withSize(numberOfResourcesByPage)

  Object.entries(researchStudyQuery).forEach((key: [string, string]) => {
    const field = key[0]
    const value = key[1]

    if (value === '') return

    switch (field) {
      case '_getpagesoffset':
        buildFrom(searchBody, value)
        break

      case '_lastUpdated':
        buildLastUpdated(searchBody, value)
        break

      case '_sort':
        buildSort(searchBody, value)
        break

      case '_count':
        buildSize(searchBody, value)
        break

      case '_text':
      case '_content':
        buildText(searchBody, value)
        break

      case 'identifier':
        buildMatch(searchBody, '_id', value)
        break

      case 'search_after':
        buildSearchAfter(searchBody, value)
        break

      default:
        buildMatch(searchBody, field, value)
    }
  })

  return searchBody.build()
}

function buildLastUpdated(searchBody: ElasticsearchBodyBuilder, value: string) {
  const operator = RegExp(/(eq|ne|lt|le|gt|ge)/).exec(value)

  if (operator === null) {
    buildMatch(searchBody, 'meta.lastUpdated', value)
  } else {
    const date = value.replace(operator[0], '')

    switch (operator[0]) {
      case 'eq':
        buildMatch(searchBody, 'meta.lastUpdated', date)
        break

      case 'ne':
        buildRange(searchBody, 'meta.lastUpdated', date, ['gt', 'lt'])
        break

      case 'lt':
        buildRange(searchBody, 'meta.lastUpdated', date, ['lt'])
        break

      case 'le':
        buildRange(searchBody, 'meta.lastUpdated', date, ['lte'])
        break

      case 'gt':
        buildRange(searchBody, 'meta.lastUpdated', date, ['gt'])
        break

      default:
        buildRange(searchBody, 'meta.lastUpdated', date, ['gte'])
        break
    }
  }
}

function buildRange(searchBody: ElasticsearchBodyBuilder, field: string, value: string, operators: Operator[]) {
  searchBody.withRange(field, value, operators)
}

function buildFrom(searchBody: ElasticsearchBodyBuilder, value: string) {
  searchBody.withFrom(Number(value))
}

function buildSize(searchBody: ElasticsearchBodyBuilder, value: string) {
  const maxSize = 5_000

  if (Number(value) <= maxSize) {
    searchBody.withSize(Number(value))
  }
}

function buildText(searchBody: ElasticsearchBodyBuilder, value: string) {
  searchBody.withText(value)
}

function buildSearchAfter(searchBody: ElasticsearchBodyBuilder, value: string) {
  // @ts-ignore
  searchBody.withSearchAfter(value.split(',').map((term): string | number => isNaN(term) ? term : Number(term)))
}

function buildSort(searchBody: ElasticsearchBodyBuilder, value: string) {
  const descOperator = '-'

  value.split(',').forEach((sort) => {
    if (sort.startsWith(descOperator)) {
      searchBody.withSort(sort.replace(descOperator, ''), 'desc')
    } else {
      searchBody.withSort(sort, 'asc')
    }
  })
}

function buildMatch(searchBody: ElasticsearchBodyBuilder, field: string, value: string) {
  searchBody.withMatch(field, value)
}
