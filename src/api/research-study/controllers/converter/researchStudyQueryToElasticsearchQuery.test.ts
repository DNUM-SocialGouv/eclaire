import { researchStudyQueryToElasticsearchQuery } from './researchStudyQueryToElasticsearchQuery'
import { SearchBodyType } from '../../application/entities/SearchBody'

describe('research study query to elasticsearch query', () => {
  const numberOfResourceByPageByDefault = 20
  process.env.NUMBER_OF_RESSOURCE_BY_PAGE = String(numberOfResourceByPageByDefault)

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
        size: numberOfResourceByPageByDefault,
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
        size: numberOfResourceByPageByDefault,
      })
    })

    it('just by the last updated date with "eq" prefix', () => {
      // GIVEN
      const researchStudyQuery = { _lastUpdated: 'eq12/04/2023' }

      // WHEN
      const query = researchStudyQueryToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<SearchBodyType>({
        from: 0,
        query: { bool: { must: [{ match: { 'meta.lastUpdated': '12/04/2023' } }] } },
        size: numberOfResourceByPageByDefault,
      })
    })

    it('just by a non equivalent last updated date', () => {
      // GIVEN
      const researchStudyQuery = { _lastUpdated: 'ne12/04/2023' }

      // WHEN
      const query = researchStudyQueryToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<SearchBodyType>({
        from: 0,
        query: { bool: { must: [{ range: { 'meta.lastUpdated': { gt: '12/04/2023', lt: '12/04/2023' } } }] } },
        size: numberOfResourceByPageByDefault,
      })
    })

    it('just by lesser than the last updated date', () => {
      // GIVEN
      const researchStudyQuery = { _lastUpdated: 'lt12/04/2023' }

      // WHEN
      const query = researchStudyQueryToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<SearchBodyType>({
        from: 0,
        query: { bool: { must: [{ range: { 'meta.lastUpdated': { lt: '12/04/2023' } } }] } },
        size: numberOfResourceByPageByDefault,
      })
    })

    it('just by lesser than or equal the last updated date', () => {
      // GIVEN
      const researchStudyQuery = { _lastUpdated: 'le12/04/2023' }

      // WHEN
      const query = researchStudyQueryToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<SearchBodyType>({
        from: 0,
        query: { bool: { must: [{ range: { 'meta.lastUpdated': { lte: '12/04/2023' } } }] } },
        size: numberOfResourceByPageByDefault,
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
        query: { bool: { must: [{ range: { 'meta.lastUpdated': { gt: '12/04/2023' } } }] } },
        size: numberOfResourceByPageByDefault,
      })
    })

    it('just by greater than or equal the last updated date', () => {
      // GIVEN
      const researchStudyQuery = { _lastUpdated: 'ge12/04/2023' }

      // WHEN
      const query = researchStudyQueryToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<SearchBodyType>({
        from: 0,
        query: { bool: { must: [{ range: { 'meta.lastUpdated': { gte: '12/04/2023' } } }] } },
        size: numberOfResourceByPageByDefault,
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
        size: numberOfResourceByPageByDefault,
      })
    })

    it('just by text', () => {
      // GIVEN
      const researchStudyQuery = { _text: 'elastic AND (lucene OR solr)' }

      // WHEN
      const query = researchStudyQueryToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<SearchBodyType>({
        from: 0,
        query: { query_string: { query: 'elastic AND (lucene OR solr)' } },
        size: numberOfResourceByPageByDefault,
      })
    })

    it('just by content (like text)', () => {
      // GIVEN
      const researchStudyQuery = { _content: 'elastic AND (lucene OR solr)' }

      // WHEN
      const query = researchStudyQueryToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<SearchBodyType>({
        from: 0,
        query: { query_string: { query: 'elastic AND (lucene OR solr)' } },
        size: numberOfResourceByPageByDefault,
      })
    })

    it('just by token', () => {
      // GIVEN
      const researchStudyQuery = { status: 'active' }

      // WHEN
      const query = researchStudyQueryToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<SearchBodyType>({
        from: 0,
        query: { bool: { must: [{ match: { status: 'active' } }] } },
        size: numberOfResourceByPageByDefault,
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
        size: numberOfResourceByPageByDefault,
        sort: [{ 'meta.lastUpdated': { order: 'asc' } }],
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
        size: numberOfResourceByPageByDefault,
        sort: [{ 'meta.lastUpdated': { order: 'desc' } }],
      })
    })

    it('just by multi fields', () => {
      // GIVEN
      const researchStudyQuery = { _sort: '_id,-meta.lastUpdated', identifier: 'mDog94gBYFmz7rt1cy93' }

      // WHEN
      const query = researchStudyQueryToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<SearchBodyType>({
        from: 0,
        query: { bool: { must: [{ match: { _id: 'mDog94gBYFmz7rt1cy93' } }] } },
        size: numberOfResourceByPageByDefault,
        sort: [
          { _id: { order: 'asc' } },
          { 'meta.lastUpdated': { order: 'desc' } },
        ],
      })
    })
  })

  describe('should paginate', () => {
    it('from page 10 and size by default', () => {
      // GIVEN
      const offset = numberOfResourceByPageByDefault * 9
      const researchStudyQuery = { _getpagesoffset: String(offset), identifier: 'mDog94gBYFmz7rt1cy93' }

      // WHEN
      const query = researchStudyQueryToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<SearchBodyType>({
        from: offset,
        query: { bool: { must: [{ match: { _id: 'mDog94gBYFmz7rt1cy93' } }] } },
        size: numberOfResourceByPageByDefault,
      })
    })

    it('with a given size', () => {
      // GIVEN
      const numberOfRessourceByPage = 10
      const offset = numberOfRessourceByPage
      const researchStudyQuery = { _count: String(numberOfRessourceByPage), _getpagesoffset: String(offset), identifier: 'mDog94gBYFmz7rt1cy93' }

      // WHEN
      const query = researchStudyQueryToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<SearchBodyType>({
        from: offset,
        query: { bool: { must: [{ match: { _id: 'mDog94gBYFmz7rt1cy93' } }] } },
        size: numberOfResourceByPageByDefault,
      })
    })

    it('with a given size', () => {
      // GIVEN
      const numberOfRessourceByPage = 10
      const offset = numberOfRessourceByPage
      const researchStudyQuery = { _count: String(numberOfRessourceByPage), _getpagesoffset: String(offset), identifier: 'mDog94gBYFmz7rt1cy93' }

      // WHEN
      const query = researchStudyQueryToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<SearchBodyType>({
        from: offset,
        query: { bool: { must: [{ match: { _id: 'mDog94gBYFmz7rt1cy93' } }] } },
        size: numberOfResourceByPage,
      })
    })

    it('with a count limit to 5000', () => {
      // GIVEN
      const numberOfRessourceByPage = 5001
      const offset = numberOfRessourceByPage * 9
      const researchStudyQuery = { _count: String(numberOfRessourceByPage), _getpagesoffset: String(offset), identifier: 'mDog94gBYFmz7rt1cy93' }

      // WHEN
      const query = researchStudyQueryToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<SearchBodyType>({
        from: offset,
        query: { bool: { must: [{ match: { _id: 'mDog94gBYFmz7rt1cy93' } }] } },
        size: numberOfResourceByPageByDefault,
      })
    })

    it('with a count limit to 5000', () => {
      // GIVEN
      const numberOfRessourceByPage = 5001
      const offset = numberOfRessourceByPage * 9
      const researchStudyQuery = { _count: String(numberOfRessourceByPage), _getpagesoffset: String(offset), identifier: 'mDog94gBYFmz7rt1cy93' }

      // WHEN
      const query = researchStudyQueryToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<SearchBodyType>({
        from: offset,
        query: { bool: { must: [{ match: { _id: 'mDog94gBYFmz7rt1cy93' } }] } },
        size: numberOfResourceByPageByDefault,
      })
    })
  })

  it('should return all the resources when filters are empty', () => {
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
