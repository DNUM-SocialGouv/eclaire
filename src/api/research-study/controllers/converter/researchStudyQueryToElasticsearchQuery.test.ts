import { researchStudyQueryToElasticsearchQuery } from './researchStudyQueryToElasticsearchQuery'
import { ElasticsearchBodyType } from '../../application/entities/ElasticsearchBody'
import { ResearchStudyQueryModel } from '../ResearchStudyQueryModel'

describe('research study query to elasticsearch query', () => {
  const numberOfResourcesByPageByDefault = 20
  process.env.NUMBER_OF_RESOURCES_BY_PAGE = String(numberOfResourcesByPageByDefault)

  describe('should filter', () => {
    it('just by identifier', () => {
      // GIVEN
      const researchStudyQuery: Partial<ResearchStudyQueryModel> = { identifier: 'mDog94gBYFmz7rt1cy93' }

      // WHEN
      const query = researchStudyQueryToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: 0,
        query: { bool: { must: [{ match: { _id: 'mDog94gBYFmz7rt1cy93' } }] } },
        size: numberOfResourcesByPageByDefault,
      })
    })

    it('just by the last updated date', () => {
      // GIVEN
      const researchStudyQuery: Partial<ResearchStudyQueryModel> = { _lastUpdated: '12/04/2023' }

      // WHEN
      const query = researchStudyQueryToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: 0,
        query: { bool: { must: [{ match: { 'meta.lastUpdated': '12/04/2023' } }] } },
        size: numberOfResourcesByPageByDefault,
      })
    })

    it('just by the last updated date with "eq" prefix', () => {
      // GIVEN
      const researchStudyQuery: Partial<ResearchStudyQueryModel> = { _lastUpdated: 'eq12/04/2023' }

      // WHEN
      const query = researchStudyQueryToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: 0,
        query: { bool: { must: [{ match: { 'meta.lastUpdated': '12/04/2023' } }] } },
        size: numberOfResourcesByPageByDefault,
      })
    })

    it('just by a non equivalent last updated date', () => {
      // GIVEN
      const researchStudyQuery: Partial<ResearchStudyQueryModel> = { _lastUpdated: 'ne12/04/2023' }

      // WHEN
      const query = researchStudyQueryToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: 0,
        query: { bool: { must: [{ range: { 'meta.lastUpdated': { gt: '12/04/2023', lt: '12/04/2023' } } }] } },
        size: numberOfResourcesByPageByDefault,
      })
    })

    it('just by lesser than the last updated date', () => {
      // GIVEN
      const researchStudyQuery: Partial<ResearchStudyQueryModel> = { _lastUpdated: 'lt12/04/2023' }

      // WHEN
      const query = researchStudyQueryToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: 0,
        query: { bool: { must: [{ range: { 'meta.lastUpdated': { lt: '12/04/2023' } } }] } },
        size: numberOfResourcesByPageByDefault,
      })
    })

    it('just by lesser than or equal the last updated date', () => {
      // GIVEN
      const researchStudyQuery: Partial<ResearchStudyQueryModel> = { _lastUpdated: 'le12/04/2023' }

      // WHEN
      const query = researchStudyQueryToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: 0,
        query: { bool: { must: [{ range: { 'meta.lastUpdated': { lte: '12/04/2023' } } }] } },
        size: numberOfResourcesByPageByDefault,
      })
    })

    it('just by greater than the last updated date', () => {
      // GIVEN
      const researchStudyQuery: Partial<ResearchStudyQueryModel> = { _lastUpdated: 'gt12/04/2023' }

      // WHEN
      const query = researchStudyQueryToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: 0,
        query: { bool: { must: [{ range: { 'meta.lastUpdated': { gt: '12/04/2023' } } }] } },
        size: numberOfResourcesByPageByDefault,
      })
    })

    it('just by greater than or equal the last updated date', () => {
      // GIVEN
      const researchStudyQuery: Partial<ResearchStudyQueryModel> = { _lastUpdated: 'ge12/04/2023' }

      // WHEN
      const query = researchStudyQueryToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: 0,
        query: { bool: { must: [{ range: { 'meta.lastUpdated': { gte: '12/04/2023' } } }] } },
        size: numberOfResourcesByPageByDefault,
      })
    })

    it('by identifier and the last updated date', () => {
      // GIVEN
      const researchStudyQuery: Partial<ResearchStudyQueryModel> = { _lastUpdated: '12/04/2023', identifier: 'mDog94gBYFmz7rt1cy93' }

      // WHEN
      const query = researchStudyQueryToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: 0,
        query: {
          bool: {
            must: [
              { match: { 'meta.lastUpdated': '12/04/2023' } },
              { match: { _id: 'mDog94gBYFmz7rt1cy93' } },
            ],
          },
        },
        size: numberOfResourcesByPageByDefault,
      })
    })

    it('just by text', () => {
      // GIVEN
      const researchStudyQuery: Partial<ResearchStudyQueryModel> = { _text: 'elastic AND (lucene OR solr)' }

      // WHEN
      const query = researchStudyQueryToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: 0,
        query: { query_string: { query: 'elastic AND (lucene OR solr)' } },
        size: numberOfResourcesByPageByDefault,
      })
    })

    it('just by content (like text)', () => {
      // GIVEN
      const researchStudyQuery: Partial<ResearchStudyQueryModel> = { _content: 'elastic AND (lucene OR solr)' }

      // WHEN
      const query = researchStudyQueryToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: 0,
        query: { query_string: { query: 'elastic AND (lucene OR solr)' } },
        size: numberOfResourcesByPageByDefault,
      })
    })

    it('just by token', () => {
      // GIVEN
      const researchStudyQuery: Partial<ResearchStudyQueryModel> = { status: 'active' }

      // WHEN
      const query = researchStudyQueryToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: 0,
        query: { bool: { must: [{ match: { status: 'active' } }] } },
        size: numberOfResourcesByPageByDefault,
      })
    })
  })

  describe('should sort', () => {
    it('just by one field by ascendant', () => {
      // GIVEN
      const researchStudyQuery: Partial<ResearchStudyQueryModel> = { _sort: 'meta.lastUpdated', identifier: 'mDog94gBYFmz7rt1cy93' }

      // WHEN
      const query = researchStudyQueryToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: 0,
        query: { bool: { must: [{ match: { _id: 'mDog94gBYFmz7rt1cy93' } }] } },
        size: numberOfResourcesByPageByDefault,
        sort: [{ 'meta.lastUpdated': { order: 'asc' } }],
      })
    })

    it('just by one field by descendant', () => {
      // GIVEN
      const researchStudyQuery: Partial<ResearchStudyQueryModel> = { _sort: '-meta.lastUpdated', identifier: 'mDog94gBYFmz7rt1cy93' }

      // WHEN
      const query = researchStudyQueryToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: 0,
        query: { bool: { must: [{ match: { _id: 'mDog94gBYFmz7rt1cy93' } }] } },
        size: numberOfResourcesByPageByDefault,
        sort: [{ 'meta.lastUpdated': { order: 'desc' } }],
      })
    })

    it('just by multi fields', () => {
      // GIVEN
      const researchStudyQuery: Partial<ResearchStudyQueryModel> = { _sort: '_id,-meta.lastUpdated', identifier: 'mDog94gBYFmz7rt1cy93' }

      // WHEN
      const query = researchStudyQueryToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: 0,
        query: { bool: { must: [{ match: { _id: 'mDog94gBYFmz7rt1cy93' } }] } },
        size: numberOfResourcesByPageByDefault,
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
      const offset = numberOfResourcesByPageByDefault * 9
      const researchStudyQuery: Partial<ResearchStudyQueryModel> = { _getpagesoffset: String(offset), identifier: 'mDog94gBYFmz7rt1cy93' }

      // WHEN
      const query = researchStudyQueryToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: offset,
        query: { bool: { must: [{ match: { _id: 'mDog94gBYFmz7rt1cy93' } }] } },
        size: numberOfResourcesByPageByDefault,
      })
    })

    it('with a given size', () => {
      // GIVEN
      const numberOfResourcesByPage = 10
      const offset = numberOfResourcesByPage
      const researchStudyQuery: Partial<ResearchStudyQueryModel> = { _count: String(numberOfResourcesByPage), _getpagesoffset: String(offset), identifier: 'mDog94gBYFmz7rt1cy93' }

      // WHEN
      const query = researchStudyQueryToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: offset,
        query: { bool: { must: [{ match: { _id: 'mDog94gBYFmz7rt1cy93' } }] } },
        size: numberOfResourcesByPage,
      })
    })

    it('with a count limit to 5000', () => {
      // GIVEN
      const numberOfResourcesByPage = 5001
      const offset = numberOfResourcesByPage * 9
      const researchStudyQuery: Partial<ResearchStudyQueryModel> = { _count: String(numberOfResourcesByPage), _getpagesoffset: String(offset), identifier: 'mDog94gBYFmz7rt1cy93' }

      // WHEN
      const query = researchStudyQueryToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: offset,
        query: { bool: { must: [{ match: { _id: 'mDog94gBYFmz7rt1cy93' } }] } },
        size: numberOfResourcesByPageByDefault,
      })
    })

    it('from "search after" param and sorts when there is at least 10 000 results', () => {
      // GIVEN
      const searchAfter = '1631232000000,2019-A00427-50'
      const researchStudyQuery: Partial<ResearchStudyQueryModel> = { _sort: 'meta.lastUpdated,_id', search_after: searchAfter }

      // WHEN
      const query = researchStudyQueryToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: 0,
        query: { bool: { must: [] } },
        search_after: [1631232000000, '2019-A00427-50'],
        size: numberOfResourcesByPageByDefault,
        sort: [
          { 'meta.lastUpdated': { order: 'asc' } },
          { _id: { order: 'asc' } },
        ],
      })
    })
  })

  it('should return all the resources when filters are empty', () => {
    // GIVEN
    const researchStudyQuery: Partial<ResearchStudyQueryModel> = { _lastUpdated: '', identifier: '' }

    // WHEN
    const query = researchStudyQueryToElasticsearchQuery(researchStudyQuery)

    // THEN
    expect(query).toStrictEqual<ElasticsearchBodyType>({
      from: 0,
      query: { bool: { must: [] } },
      size: numberOfResourcesByPageByDefault,
    })
  })
})
