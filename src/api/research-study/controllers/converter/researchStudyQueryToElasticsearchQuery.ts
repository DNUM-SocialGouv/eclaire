import { SearchBodyBuilder, SearchBodyType } from '../../application/entities/SearchBody'
import { ResearchStudyQueryModel } from '../ResearchStudyQueryModel'

export function researchStudyQueryToElasticsearchQuery(researchStudyQuery: Partial<ResearchStudyQueryModel>): SearchBodyType {
  const numberOfResourceByPage = Number(process.env.NUMBER_OF_RESSOURCE_BY_PAGE)
  const searchBody = new SearchBodyBuilder()
    .withFrom(0)
    .withSize(numberOfResourceByPage)

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
    } else if (field === '_text' || field === '_content') {
      searchBody.withText(value)
    } else if (field === 'identifier') {
      searchBody.withMatch('_id', value)
    } else {
      searchBody.withMatch(field, value)
    }
  })

  return searchBody.build()
}
