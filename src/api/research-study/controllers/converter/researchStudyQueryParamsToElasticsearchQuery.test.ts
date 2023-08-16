import { ResearchStudyQueryParams } from './ResearchStudyQueryParams'
import { researchStudyQueryParamsToElasticsearchQuery } from './researchStudyQueryParamsToElasticsearchQuery'
import { ElasticsearchBodyType } from '../../application/entities/ElasticsearchBody'

describe('research study query to elasticsearch query', () => {
  const numberOfResourcesByPageByDefault = 20
  process.env.NUMBER_OF_RESOURCES_BY_PAGE = String(numberOfResourcesByPageByDefault)

  describe('should filter', () => {
    it('just by identifier', () => {
      // GIVEN
      const researchStudyQuery: ResearchStudyQueryParams[] = [{ name: 'identifier', value: 'mDog94gBYFmz7rt1cy93' }]

      // WHEN
      const query = researchStudyQueryParamsToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: 0,
        query: { bool: { must: [{ match: { _id: 'mDog94gBYFmz7rt1cy93' } }] } },
        size: numberOfResourcesByPageByDefault,
      })
    })

    it('just by the last updated date', () => {
      // GIVEN
      const researchStudyQuery: ResearchStudyQueryParams[] = [{ name: '_lastUpdated', value: '2023-04-12' }]

      // WHEN
      const query = researchStudyQueryParamsToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: 0,
        query: { bool: { must: [{ match: { 'meta.lastUpdated': '2023-04-12' } }] } },
        size: numberOfResourcesByPageByDefault,
      })
    })

    it('just by the last updated date with "eq" prefix', () => {
      // GIVEN
      const researchStudyQuery: ResearchStudyQueryParams[] = [{ name: '_lastUpdated', value: 'eq2023-04-12' }]

      // WHEN
      const query = researchStudyQueryParamsToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: 0,
        query: { bool: { must: [{ match: { 'meta.lastUpdated': '2023-04-12' } }] } },
        size: numberOfResourcesByPageByDefault,
      })
    })

    it('just by a non equivalent last updated date', () => {
      // GIVEN
      const researchStudyQuery: ResearchStudyQueryParams[] = [{ name: '_lastUpdated', value: 'ne2023-04-12' }]

      // WHEN
      const query = researchStudyQueryParamsToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: 0,
        query: { bool: { must: [{ range: { 'meta.lastUpdated': { gt: '2023-04-12', lt: '2023-04-12' } } }] } },
        size: numberOfResourcesByPageByDefault,
      })
    })

    it('just by lesser than the last updated date', () => {
      // GIVEN
      const researchStudyQuery: ResearchStudyQueryParams[] = [{ name: '_lastUpdated', value: 'lt2023-04-12' }]

      // WHEN
      const query = researchStudyQueryParamsToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: 0,
        query: { bool: { must: [{ range: { 'meta.lastUpdated': { lt: '2023-04-12' } } }] } },
        size: numberOfResourcesByPageByDefault,
      })
    })

    it('just by lesser than or equal the last updated date', () => {
      // GIVEN
      const researchStudyQuery: ResearchStudyQueryParams[] = [{ name: '_lastUpdated', value: 'le2023-04-12' }]

      // WHEN
      const query = researchStudyQueryParamsToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: 0,
        query: { bool: { must: [{ range: { 'meta.lastUpdated': { lte: '2023-04-12' } } }] } },
        size: numberOfResourcesByPageByDefault,
      })
    })

    it('just by greater than the last updated date', () => {
      // GIVEN
      const researchStudyQuery: ResearchStudyQueryParams[] = [{ name: '_lastUpdated', value: 'gt2023-04-12' }]

      // WHEN
      const query = researchStudyQueryParamsToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: 0,
        query: { bool: { must: [{ range: { 'meta.lastUpdated': { gt: '2023-04-12' } } }] } },
        size: numberOfResourcesByPageByDefault,
      })
    })

    it('just by greater than or equal the last updated date', () => {
      // GIVEN
      const researchStudyQuery: ResearchStudyQueryParams[] = [{ name: '_lastUpdated', value: 'ge2023-04-12' }]

      // WHEN
      const query = researchStudyQueryParamsToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: 0,
        query: { bool: { must: [{ range: { 'meta.lastUpdated': { gte: '2023-04-12' } } }] } },
        size: numberOfResourcesByPageByDefault,
      })
    })

    it('by identifier and the last updated date', () => {
      // GIVEN
      const researchStudyQuery: ResearchStudyQueryParams[] = [
        { name: '_lastUpdated', value: '2023-04-12' },
        { name: 'identifier', value: 'mDog94gBYFmz7rt1cy93' },
      ]

      // WHEN
      const query = researchStudyQueryParamsToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: 0,
        query: {
          bool: {
            must: [
              { match: { 'meta.lastUpdated': '2023-04-12' } },
              { match: { _id: 'mDog94gBYFmz7rt1cy93' } },
            ],
          },
        },
        size: numberOfResourcesByPageByDefault,
      })
    })

    it('just by text', () => {
      // GIVEN
      const researchStudyQuery: ResearchStudyQueryParams[] = [{ name: '_text', value: 'elastic AND (lucene OR solr)' }]

      // WHEN
      const query = researchStudyQueryParamsToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: 0,
        query: { query_string: { query: 'elastic AND (lucene OR solr)' } },
        size: numberOfResourcesByPageByDefault,
      })
    })

    it('just by content (like text)', () => {
      // GIVEN
      const researchStudyQuery: ResearchStudyQueryParams[] = [{ name: '_content', value: 'elastic AND (lucene OR solr)' }]

      // WHEN
      const query = researchStudyQueryParamsToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: 0,
        query: { query_string: { query: 'elastic AND (lucene OR solr)' } },
        size: numberOfResourcesByPageByDefault,
      })
    })

    it('just by token', () => {
      // GIVEN
      const researchStudyQuery: ResearchStudyQueryParams[] = [{ name: 'status', value: 'active' }]

      // WHEN
      const query = researchStudyQueryParamsToElasticsearchQuery(researchStudyQuery)

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
      const researchStudyQuery: ResearchStudyQueryParams[] = [
        { name: '_sort', value: 'meta.lastUpdated' },
        { name: 'identifier', value: 'mDog94gBYFmz7rt1cy93' },
      ]

      // WHEN
      const query = researchStudyQueryParamsToElasticsearchQuery(researchStudyQuery)

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
      const researchStudyQuery: ResearchStudyQueryParams[] = [
        { name: '_sort', value: '-meta.lastUpdated' },
        { name: 'identifier', value: 'mDog94gBYFmz7rt1cy93' },
      ]

      // WHEN
      const query = researchStudyQueryParamsToElasticsearchQuery(researchStudyQuery)

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
      const researchStudyQuery: ResearchStudyQueryParams[] = [
        { name: '_sort', value: '_id,-meta.lastUpdated' },
        { name: 'identifier', value: 'mDog94gBYFmz7rt1cy93' },
      ]

      // WHEN
      const query = researchStudyQueryParamsToElasticsearchQuery(researchStudyQuery)

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
      const researchStudyQuery: ResearchStudyQueryParams[] = [
        { name: '_getpagesoffset', value: String(offset) },
        { name: 'identifier', value: 'mDog94gBYFmz7rt1cy93' },
      ]

      // WHEN
      const query = researchStudyQueryParamsToElasticsearchQuery(researchStudyQuery)

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
      const researchStudyQuery: ResearchStudyQueryParams[] = [
        { name: '_count', value: String(numberOfResourcesByPage) },
        { name: '_getpagesoffset', value: String(offset) },
        { name: 'identifier', value: 'mDog94gBYFmz7rt1cy93' },
      ]

      // WHEN
      const query = researchStudyQueryParamsToElasticsearchQuery(researchStudyQuery)

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
      const researchStudyQuery: ResearchStudyQueryParams[] = [
        { name: '_count', value: String(numberOfResourcesByPage) },
        { name: '_getpagesoffset', value: String(offset) },
        { name: 'identifier', value: 'mDog94gBYFmz7rt1cy93' },
      ]

      // WHEN
      const query = researchStudyQueryParamsToElasticsearchQuery(researchStudyQuery)

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
      const researchStudyQuery: ResearchStudyQueryParams[] = [
        { name: '_sort', value: 'meta.lastUpdated,_id' },
        { name: 'search_after', value: searchAfter },
      ]

      // WHEN
      const query = researchStudyQueryParamsToElasticsearchQuery(researchStudyQuery)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: 0,
        query: { bool: { must: [] } },
        search_after: ['1631232000000', '2019-A00427-50'],
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
    const researchStudyQuery: ResearchStudyQueryParams[] = [
      { name: '_lastUpdated', value: '' },
      { name: 'identifier', value: '' },
    ]

    // WHEN
    const query = researchStudyQueryParamsToElasticsearchQuery(researchStudyQuery)

    // THEN
    expect(query).toStrictEqual<ElasticsearchBodyType>({
      from: 0,
      query: { bool: { must: [] } },
      size: numberOfResourcesByPageByDefault,
    })
  })
})
