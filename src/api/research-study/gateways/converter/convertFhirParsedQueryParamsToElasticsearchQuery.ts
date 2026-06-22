import { BadRequestException } from '@nestjs/common'

import { ElasticsearchBodyBuilder, ElasticsearchBodyType, Operator } from '../../../../shared/elasticsearch/ElasticsearchBody'
import { isValidDate } from '../../../../shared/utils/date.util'
import { FhirParsedQueryParams } from '../../controllers/FhirQueryParams'

export function convertFhirParsedQueryParamsToElasticsearchQuery(
  fhirParsedQueryParams: FhirParsedQueryParams[],
  numberOfResourcesByPage?: number
): ElasticsearchBodyType {
  const searchBody: ElasticsearchBodyBuilder = new ElasticsearchBodyBuilder()
    .withFrom(0)
    .withSize(numberOfResourcesByPage)

  for (const { name, value } of fhirParsedQueryParams) {
    if (value === '') break

    switch (name) {
      case '_getpagesoffset':
        buildFrom(searchBody, value)
        break

      case '_lastUpdated':
        buildLastUpdated(searchBody, value)
        break

      case '_shouldLastUpdated':
        buildShouldLastUpdated(searchBody, value)
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

      case '_shouldId':
        buildShouldMatch(searchBody, '_id', value)
        break

      case 'search_after':
        buildSearchAfter(searchBody, value)
        break

      case '_include':
        break

      case 'status':
        buildTerm(searchBody, 'status.keyword', value)
        break

      case '_must':
        buildDoubleNestedReglementation(searchBody, 'category', 'category.coding', name, value)
        break

      case '_mustNot':
        buildDoubleNestedReglementation(searchBody, 'category', 'category.coding', name, value)
        break

      default:
        buildMatch(searchBody, name, value)
    }
  }

  return searchBody.build()
}

function buildLastUpdated(searchBody: ElasticsearchBodyBuilder, value: string) {
  buildDate(searchBody, value, false)
}

function buildShouldLastUpdated(searchBody: ElasticsearchBodyBuilder, value: string) {
  buildDate(searchBody, value, true)
}

function buildDate(searchBody: ElasticsearchBodyBuilder, value: string, should: boolean) {
  const operator = RegExp(/(eq|ne|lt|le|gt|ge)/).exec(value)

  if (operator === null) {
    if (!isValidDate(value)) {
      throw new BadRequestException(`Invalid date: ${value}`)
    }
    if (should) {
      buildShouldMatch(searchBody, 'meta.lastUpdated', value)
    } else {
      buildMatch(searchBody, 'meta.lastUpdated', value)
    }

    return
  }

  const date = value?.replace(operator[0], '')?.trim()

  if (!isValidDate(date)) {
    throw new BadRequestException(`Invalid date: ${date}`)
  }
  switch (operator[0]) {
    case 'eq':
      if (should) {
        buildShouldMatch(searchBody, 'meta.lastUpdated', date)
      } else {
        buildMatch(searchBody, 'meta.lastUpdated', date)
      }
      break

    case 'ne':
      if (!should) {
        buildRange(searchBody, 'meta.lastUpdated', date, ['gt', 'lt'])
      }
      break

    case 'lt':
      if (should) {
        buildShouldRange(searchBody, 'meta.lastUpdated', date, ['lt'])
      } else {
        buildRange(searchBody, 'meta.lastUpdated', date, ['lt'])
      }
      break

    case 'le':
      if (should) {
        buildShouldRange(searchBody, 'meta.lastUpdated', date, ['lte'])
      } else {
        buildRange(searchBody, 'meta.lastUpdated', date, ['lte'])
      }
      break

    case 'gt':
      if (should) {
        buildShouldRange(searchBody, 'meta.lastUpdated', date, ['gt'])
      } else {
        buildRange(searchBody, 'meta.lastUpdated', date, ['gt'])
      }
      break

    case 'ge':
    default:
      if (should) {
        buildShouldRange(searchBody, 'meta.lastUpdated', date, ['gte'])
      } else {
        buildRange(searchBody, 'meta.lastUpdated', date, ['gte'])
      }
      break
  }
}

function buildRange(searchBody: ElasticsearchBodyBuilder, name: string, value: string, operators: Operator[]) {
  searchBody.withRange(name, value, operators)
}

function buildShouldRange(searchBody: ElasticsearchBodyBuilder, name: string, value: string, operators: Operator[]) {
  searchBody.withShouldRange(name, value, operators)
}

function buildFrom(searchBody: ElasticsearchBodyBuilder, value: string) {
  searchBody.withFrom(Number(value))
}

function buildSize(searchBody: ElasticsearchBodyBuilder, value: string) {
  const maxSize = 100

  if (Number(value) <= maxSize) {
    searchBody.withSize(Number(value))
  }
}

function buildText(searchBody: ElasticsearchBodyBuilder, value: string) {
  searchBody.withText(value)
}

function buildSearchAfter(searchBody: ElasticsearchBodyBuilder, value: string) {
  searchBody.withSearchAfter(value.split(','))
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

function buildMatch(searchBody: ElasticsearchBodyBuilder, name: string, value: string) {
  searchBody.withMatch(name, value)
}

function buildShouldMatch(searchBody: ElasticsearchBodyBuilder, name: string, value: string) {
  searchBody.withShouldMatch(name, value)
}

function buildTerm(searchBody: ElasticsearchBodyBuilder, name: string, value: string) {
  searchBody.withTerm(name, value)
}

function buildDoubleNestedReglementation(searchBody: ElasticsearchBodyBuilder, parentPath: string, childPath: string, name: string, value: string) {
  const reglementationCode = { 'category.coding.code': value }
  const terms = { 'category.coding.system': 'https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-regulation-code-code-system' }
  if (name === '_mustNot') {
    searchBody.withDoubleNestedMustAndMustNot(parentPath, childPath, terms, reglementationCode)
  } else {
    terms['category.coding.code'] = value
    searchBody.withDoubleNestedMust(parentPath, childPath, terms)
  }
}
