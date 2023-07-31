import { ElasticsearchBodyBuilder, ElasticsearchBodyType } from '../../application/entities/ElasticsearchBody'
import { ResearchStudyQueryModel } from '../ResearchStudyQueryModel'

export function researchStudyQueryToElasticsearchQuery(researchStudyQuery: Partial<ResearchStudyQueryModel>): ElasticsearchBodyType {
  const numberOfResourcesByPage = Number(process.env.NUMBER_OF_RESOURCES_BY_PAGE)
  const maxSize = 5000
  const searchBody = new ElasticsearchBodyBuilder()
    .withFrom(0)
    .withSize(numberOfResourcesByPage)

  Object.entries(researchStudyQuery).forEach((key: [string, string]) => {
    const field = key[0]
    const value = key[1]
    const descOperator = '-'

    if (value === '') return

    if (field === '_getpagesoffset') {
      searchBody.withFrom(Number(value))
    } else if (field === '_lastUpdated') {
      const operator = RegExp(/(eq|ne|lt|le|gt|ge)/).exec(value)

      if (operator === null) {
        searchBody.withMatch('meta.lastUpdated', value)
      } else if (operator[0] === 'eq') {
        searchBody.withMatch('meta.lastUpdated', value.replace(operator[0], ''))
      } else if (operator[0] === 'ne') {
        searchBody.withRange('meta.lastUpdated', value.replace(operator[0], ''), ['gt', 'lt'])
      } else if (operator[0] === 'lt') {
        searchBody.withRange('meta.lastUpdated', value.replace(operator[0], ''), ['lt'])
      } else if (operator[0] === 'le') {
        searchBody.withRange('meta.lastUpdated', value.replace(operator[0], ''), ['lte'])
      } else if (operator[0] === 'gt') {
        searchBody.withRange('meta.lastUpdated', value.replace(operator[0], ''), ['gt'])
      } else {
        searchBody.withRange('meta.lastUpdated', value.replace(operator[0], ''), ['gte'])
      }
    } else if (field === '_sort') {
      value.split(',').forEach((sort) => {
        if (sort.startsWith(descOperator)) {
          searchBody.withSort(sort.replace(descOperator, ''), 'desc')
        } else {
          searchBody.withSort(sort, 'asc')
        }
      })
    } else if (field === '_count') {
      if (Number(value) <= maxSize) {
        searchBody.withSize(Number(value))
      }
    } else if (field === '_text' || field === '_content') {
      searchBody.withText(value)
    } else if (field === 'identifier') {
      searchBody.withMatch('_id', value)
    } else if (field === 'search_after') {
      // @ts-ignore
      searchBody.withSearchAfter(value.split(',').map((term): string | number => isNaN(term) ? term : Number(term)))
    } else {
      searchBody.withMatch(field, value)
    }
  })

  return searchBody.build()
}
