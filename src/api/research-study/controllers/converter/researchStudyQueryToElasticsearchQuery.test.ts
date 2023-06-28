import { researchStudyQueryToElasticsearchQuery } from './researchStudyQueryToElasticsearchQuery'
import { SearchBodyType } from '../../application/entities/SearchBody'

describe('research study query to elasticsearch query', () => {
  const numberOfRessourceByPage = 20
  process.env.NUMBER_OF_RESSOURCE_BY_PAGE = String(numberOfRessourceByPage)

  describe('should filter', () => {
    it('just by identifier', () => {
      // GIVEN
      const researchStudyQuery = { identifier: 'mDog94gBYFmz7rt1cy93' }

      // WHEN
      const query = researchStudyQueryToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<SearchBodyType>({
        from: 0,
        query: { bool: { must: [{ match: { _id: 'mDog94gBYFmz7rt1cy93' } }] } },
        size: numberOfRessourceByPage,
      })
    })

    it('just by the last updated date', () => {
      // GIVEN
      const researchStudyQuery = { _lastUpdated: '12/04/2023' }

      // WHEN
      const query = researchStudyQueryToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<SearchBodyType>({
        from: 0,
        query: { bool: { must: [{ match: { 'meta.lastUpdated': '12/04/2023' } }] } },
        size: numberOfRessourceByPage,
      })
    })

    it('just by greater than the last updated date', () => {
      // GIVEN
      const researchStudyQuery = { _lastUpdated: 'gt12/04/2023' }

      // WHEN
      const query = researchStudyQueryToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<SearchBodyType>({
        from: 0,
        query: { bool: { must: [{ range: { 'meta.lastUpdated': { gte: '12/04/2023' } } }] } },
        size: numberOfRessourceByPage,
      })
    })

    it('by identifier and the last updated date', () => {
      // GIVEN
      const researchStudyQuery = { _lastUpdated: '12/04/2023', identifier: 'mDog94gBYFmz7rt1cy93' }

      // WHEN
      const query = researchStudyQueryToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<SearchBodyType>({
        from: 0,
        query: {
          bool: {
            must: [
              { match: { 'meta.lastUpdated': '12/04/2023' } },
              { match: { _id: 'mDog94gBYFmz7rt1cy93' } },
            ],
          },
        },
        size: numberOfRessourceByPage,
      })
    })
  })

  describe('should sort', () => {
    it('just by one field by ascendant', () => {
      // GIVEN
      const researchStudyQuery = { _sort: 'meta.lastUpdated', identifier: 'mDog94gBYFmz7rt1cy93' }

      // WHEN
      const query = researchStudyQueryToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<SearchBodyType>({
        from: 0,
        query: { bool: { must: [{ match: { _id: 'mDog94gBYFmz7rt1cy93' } }] } },
        size: numberOfRessourceByPage,
        sort: { 'meta.lastUpdated': { order: 'asc' } },
      })
    })

    it('just by one field by descendant', () => {
      // GIVEN
      const researchStudyQuery = { _sort: '-meta.lastUpdated', identifier: 'mDog94gBYFmz7rt1cy93' }

      // WHEN
      const query = researchStudyQueryToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<SearchBodyType>({
        from: 0,
        query: { bool: { must: [{ match: { _id: 'mDog94gBYFmz7rt1cy93' } }] } },
        size: numberOfRessourceByPage,
        sort: { 'meta.lastUpdated': { order: 'desc' } },
      })
    })
  })

  describe('should paginate', () => {
    it('from page 10', () => {
      // GIVEN
      const offset = numberOfRessourceByPage * 9
      const researchStudyQuery = { _getpagesoffset: String(offset), identifier: 'mDog94gBYFmz7rt1cy93' }

      // WHEN
      const query = researchStudyQueryToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<SearchBodyType>({
        from: offset,
        query: { bool: { must: [{ match: { _id: 'mDog94gBYFmz7rt1cy93' } }] } },
        size: numberOfRessourceByPage,
      })
    })
  })

  it('should return all the ressources when filters are empty', () => {
    // GIVEN
    const researchStudyQuery = { _lastUpdated: '', identifier: '' }

    // WHEN
    const query = researchStudyQueryToElasticsearchQuery(researchStudyQuery)

    // THEN
    expect(query).toStrictEqual<SearchBodyType>({
      from: 0,
      query: { bool: { must: [] } },
      size: numberOfRessourceByPage,
    })
  })
})
