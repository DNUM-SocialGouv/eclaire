import { SearchBodyBuilder, SearchBodyType } from '../../application/entities/SearchBody'
import { ResearchStudyQueryModel } from '../ResearchStudyQueryModel'

export function researchStudyQueryToElasticsearchQuery(researchStudyQuery: Partial<ResearchStudyQueryModel>): SearchBodyType {
  const numberOfRessourceByPage = Number(process.env.NUMBER_OF_RESSOURCE_BY_PAGE)
  const searchBody = new SearchBodyBuilder()
    .withFrom(0)
    .withSize(numberOfRessourceByPage)

  Object.entries(researchStudyQuery).forEach((key: [string, string]) => {
    const field = key[0]
    const value = key[1]
    const descOperator = '-'

    if (value === '') return

    if (field === '_getpagesoffset') {
      searchBody.withFrom(Number(value))
    } else if (field === '_lastUpdated') {
      const operator = RegExp(/(gt)/).exec(value)

      if (operator === null) {
        searchBody.withMatch('meta.lastUpdated', value)
      } else {
        searchBody.withRange('meta.lastUpdated', value.replace(operator[0], ''), 'gte')
      }
    } else if (field === '_sort') {
      if (value.startsWith(descOperator)) {
        searchBody.withSort(value.replace(descOperator, ''), 'desc')
      } else {
        searchBody.withSort(value, 'asc')
      }
    } else if (field === 'identifier') {
      searchBody.withMatch('_id', value)
    }
  })

  return searchBody.build()
}
