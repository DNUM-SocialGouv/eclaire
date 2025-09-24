import { convertFhirParsedQueryParamsToElasticsearchQuery } from './convertFhirParsedQueryParamsToElasticsearchQuery'
import { ElasticsearchBodyType } from '../../../../shared/elasticsearch/ElasticsearchBody'
import { FhirParsedQueryParams } from '../../controllers/FhirQueryParams'

describe('research study query to elasticsearch query', () => {
  const numberOfResourcesByPageByDefault = 20

  describe('should filter', () => {
    it('just by identifier', () => {
      // GIVEN
      const researchStudyQuery: FhirParsedQueryParams[] = [{ name: 'identifier', value: 'mDog94gBYFmz7rt1cy93' }]

      // WHEN
      const query = convertFhirParsedQueryParamsToElasticsearchQuery(researchStudyQuery, numberOfResourcesByPageByDefault)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: 0,
        query: { bool: { filter: [], must: [{ match: { _id: 'mDog94gBYFmz7rt1cy93' } }] } },
        size: numberOfResourcesByPageByDefault,
        sort: [
          { 'meta.lastUpdated': { order: 'asc' } },
          { _id: { order: 'desc' } },
          { 'status.keyword': { order: 'asc' } },
        ],
      })
    })

    it('just by the last updated date', () => {
      // GIVEN
      const researchStudyQuery: FhirParsedQueryParams[] = [{ name: '_lastUpdated', value: '2023-04-12' }]

      // WHEN
      const query = convertFhirParsedQueryParamsToElasticsearchQuery(researchStudyQuery, numberOfResourcesByPageByDefault)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: 0,
        query: { bool: { filter: [], must: [{ match: { 'meta.lastUpdated': '2023-04-12' } }] } },
        size: numberOfResourcesByPageByDefault,
        sort: [
          { 'meta.lastUpdated': { order: 'asc' } },
          { _id: { order: 'desc' } },
          { 'status.keyword': { order: 'asc' } },
        ],
      })
    })

    it('just by the last updated date with "eq" prefix', () => {
      // GIVEN
      const researchStudyQuery: FhirParsedQueryParams[] = [{ name: '_lastUpdated', value: 'eq2023-04-12' }]

      // WHEN
      const query = convertFhirParsedQueryParamsToElasticsearchQuery(researchStudyQuery, numberOfResourcesByPageByDefault)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: 0,
        query: { bool: { filter: [], must: [{ match: { 'meta.lastUpdated': '2023-04-12' } }] } },
        size: numberOfResourcesByPageByDefault,
        sort: [
          { 'meta.lastUpdated': { order: 'asc' } },
          { _id: { order: 'desc' } },
          { 'status.keyword': { order: 'asc' } },
        ],
      })
    })

    it('just by a non equivalent last updated date', () => {
      // GIVEN
      const researchStudyQuery: FhirParsedQueryParams[] = [{ name: '_lastUpdated', value: 'ne2023-04-12' }]

      // WHEN
      const query = convertFhirParsedQueryParamsToElasticsearchQuery(researchStudyQuery, numberOfResourcesByPageByDefault)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: 0,
        query: { bool: { filter: [], must: [{ range: { 'meta.lastUpdated': { gt: '2023-04-12', lt: '2023-04-12' } } }] } },
        size: numberOfResourcesByPageByDefault,
        sort: [
          { 'meta.lastUpdated': { order: 'asc' } },
          { _id: { order: 'desc' } },
          { 'status.keyword': { order: 'asc' } },
        ],
      })
    })

    it('just by lesser than the last updated date', () => {
      // GIVEN
      const researchStudyQuery: FhirParsedQueryParams[] = [{ name: '_lastUpdated', value: 'lt2023-04-12' }]

      // WHEN
      const query = convertFhirParsedQueryParamsToElasticsearchQuery(researchStudyQuery, numberOfResourcesByPageByDefault)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: 0,
        query: { bool: { filter: [], must: [{ range: { 'meta.lastUpdated': { lt: '2023-04-12' } } }] } },
        size: numberOfResourcesByPageByDefault,
        sort: [
          { 'meta.lastUpdated': { order: 'asc' } },
          { _id: { order: 'desc' } },
          { 'status.keyword': { order: 'asc' } },
        ],
      })
    })

    it('just by lesser than or equal the last updated date', () => {
      // GIVEN
      const researchStudyQuery: FhirParsedQueryParams[] = [{ name: '_lastUpdated', value: 'le2023-04-12' }]

      // WHEN
      const query = convertFhirParsedQueryParamsToElasticsearchQuery(researchStudyQuery, numberOfResourcesByPageByDefault)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: 0,
        query: { bool: { filter: [], must: [{ range: { 'meta.lastUpdated': { lte: '2023-04-12' } } }] } },
        size: numberOfResourcesByPageByDefault,
        sort: [
          { 'meta.lastUpdated': { order: 'asc' } },
          { _id: { order: 'desc' } },
          { 'status.keyword': { order: 'asc' } },
        ],
      })
    })

    it('just by greater than the last updated date', () => {
      // GIVEN
      const researchStudyQuery: FhirParsedQueryParams[] = [{ name: '_lastUpdated', value: 'gt2023-04-12' }]

      // WHEN
      const query = convertFhirParsedQueryParamsToElasticsearchQuery(researchStudyQuery, numberOfResourcesByPageByDefault)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: 0,
        query: { bool: { filter: [], must: [{ range: { 'meta.lastUpdated': { gt: '2023-04-12' } } }] } },
        size: numberOfResourcesByPageByDefault,
        sort: [
          { 'meta.lastUpdated': { order: 'asc' } },
          { _id: { order: 'desc' } },
          { 'status.keyword': { order: 'asc' } },
        ],
      })
    })

    it('just by greater than or equal the last updated date', () => {
      // GIVEN
      const researchStudyQuery: FhirParsedQueryParams[] = [{ name: '_lastUpdated', value: 'ge2023-04-12' }]

      // WHEN
      const query = convertFhirParsedQueryParamsToElasticsearchQuery(researchStudyQuery, numberOfResourcesByPageByDefault)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: 0,
        query: { bool: { filter: [], must: [{ range: { 'meta.lastUpdated': { gte: '2023-04-12' } } }] } },
        size: numberOfResourcesByPageByDefault,
        sort: [
          { 'meta.lastUpdated': { order: 'asc' } },
          { _id: { order: 'desc' } },
          { 'status.keyword': { order: 'asc' } },
        ],
      })
    })

    it('by identifier and the last updated date', () => {
      // GIVEN
      const researchStudyQuery: FhirParsedQueryParams[] = [
        { name: '_lastUpdated', value: '2023-04-12' },
        { name: 'identifier', value: 'mDog94gBYFmz7rt1cy93' },
      ]

      // WHEN
      const query = convertFhirParsedQueryParamsToElasticsearchQuery(researchStudyQuery, numberOfResourcesByPageByDefault)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: 0,
        query: {
          bool: {
            filter: [],
            must: [
              { match: { 'meta.lastUpdated': '2023-04-12' } },
              { match: { _id: 'mDog94gBYFmz7rt1cy93' } },
            ],
          },
        },
        size: numberOfResourcesByPageByDefault,
        sort: [
          { 'meta.lastUpdated': { order: 'asc' } },
          { _id: { order: 'desc' } },
          { 'status.keyword': { order: 'asc' } },
        ],
      })
    })

    it('just by text', () => {
      // GIVEN
      const researchStudyQuery: FhirParsedQueryParams[] = [{ name: '_text', value: 'elastic AND (lucene OR solr)' }]

      // WHEN
      const query = convertFhirParsedQueryParamsToElasticsearchQuery(researchStudyQuery, numberOfResourcesByPageByDefault)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: 0,
        query: { bool: { filter: [], must: [{ query_string: { query: 'elastic AND (lucene OR solr)' } }] } },
        size: numberOfResourcesByPageByDefault,
        sort: [
          { 'meta.lastUpdated': { order: 'asc' } },
          { _id: { order: 'desc' } },
          { 'status.keyword': { order: 'asc' } },
        ],
      })
    })

    it('just by content (like text)', () => {
      // GIVEN
      const researchStudyQuery: FhirParsedQueryParams[] = [{ name: '_content', value: 'elastic AND (lucene OR solr)' }]

      // WHEN
      const query = convertFhirParsedQueryParamsToElasticsearchQuery(researchStudyQuery, numberOfResourcesByPageByDefault)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: 0,
        query: { bool: { filter: [], must: [{ query_string: { query: 'elastic AND (lucene OR solr)' } }] } },
        size: numberOfResourcesByPageByDefault,
        sort: [
          { 'meta.lastUpdated': { order: 'asc' } },
          { _id: { order: 'desc' } },
          { 'status.keyword': { order: 'asc' } },
        ],
      })
    })

    it('just by token', () => {
      // GIVEN
      const researchStudyQuery: FhirParsedQueryParams[] = [{ name: 'status', value: 'active' }]

      // WHEN
      const query = convertFhirParsedQueryParamsToElasticsearchQuery(researchStudyQuery, numberOfResourcesByPageByDefault)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: 0,
        query: { bool: { filter: [{ term: { 'status.keyword': 'active' } }], must: [] } },
        size: numberOfResourcesByPageByDefault,
        sort: [
          { 'meta.lastUpdated': { order: 'asc' } },
          { _id: { order: 'desc' } },
          { 'status.keyword': { order: 'asc' } },
        ],
      })
    })
  })

  describe('should sort', () => {
    it('just by one field by ascendant', () => {
      // GIVEN
      const researchStudyQuery: FhirParsedQueryParams[] = [
        { name: '_sort', value: 'meta.lastUpdated' },
        { name: 'identifier', value: 'mDog94gBYFmz7rt1cy93' },
      ]

      // WHEN
      const query = convertFhirParsedQueryParamsToElasticsearchQuery(researchStudyQuery, numberOfResourcesByPageByDefault)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: 0,
        query: { bool: { filter: [], must: [{ match: { _id: 'mDog94gBYFmz7rt1cy93' } }] } },
        size: numberOfResourcesByPageByDefault,
        sort: [
          { 'meta.lastUpdated': { order: 'asc' } },
          { _id: { order: 'desc' } },
          { 'status.keyword': { order: 'asc' } },
        ],
      })
    })

    it('just by one field by descendant', () => {
      // GIVEN
      const researchStudyQuery: FhirParsedQueryParams[] = [
        { name: '_sort', value: '-meta.lastUpdated' },
        { name: 'identifier', value: 'mDog94gBYFmz7rt1cy93' },
      ]

      // WHEN
      const query = convertFhirParsedQueryParamsToElasticsearchQuery(researchStudyQuery, numberOfResourcesByPageByDefault)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: 0,
        query: { bool: { filter: [], must: [{ match: { _id: 'mDog94gBYFmz7rt1cy93' } }] } },
        size: numberOfResourcesByPageByDefault,
        sort: [
          { 'meta.lastUpdated': { order: 'desc' } },
          { _id: { order: 'desc' } },
          { 'status.keyword': { order: 'asc' } },
        ],
      })
    })

    it('just by multi fields', () => {
      // GIVEN
      const researchStudyQuery: FhirParsedQueryParams[] = [
        { name: '_sort', value: '_id,-meta.lastUpdated' },
        { name: 'identifier', value: 'mDog94gBYFmz7rt1cy93' },
      ]

      // WHEN
      const query = convertFhirParsedQueryParamsToElasticsearchQuery(researchStudyQuery, numberOfResourcesByPageByDefault)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: 0,
        query: { bool: { filter: [], must: [{ match: { _id: 'mDog94gBYFmz7rt1cy93' } }] } },
        size: numberOfResourcesByPageByDefault,
        sort: [
          { 'meta.lastUpdated': { order: 'desc' } },
          { _id: { order: 'asc' } },
          { 'status.keyword': { order: 'asc' } },
        ],
      })
    })
  })

  describe('should paginate', () => {
    it('from page 10 and size by default', () => {
      // GIVEN
      const offset = numberOfResourcesByPageByDefault * 9
      const researchStudyQuery: FhirParsedQueryParams[] = [
        { name: '_getpagesoffset', value: String(offset) },
        { name: 'identifier', value: 'mDog94gBYFmz7rt1cy93' },
      ]

      // WHEN
      const query = convertFhirParsedQueryParamsToElasticsearchQuery(researchStudyQuery, numberOfResourcesByPageByDefault)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: offset,
        query: { bool: { filter: [], must: [{ match: { _id: 'mDog94gBYFmz7rt1cy93' } }] } },
        size: numberOfResourcesByPageByDefault,
        sort: [
          { 'meta.lastUpdated': { order: 'asc' } },
          { _id: { order: 'desc' } },
          { 'status.keyword': { order: 'asc' } },
        ],
      })
    })

    it('with a given size', () => {
      // GIVEN
      const numberOfResourcesByPage = 10
      const offset = numberOfResourcesByPage
      const researchStudyQuery: FhirParsedQueryParams[] = [
        { name: '_count', value: String(numberOfResourcesByPage) },
        { name: '_getpagesoffset', value: String(offset) },
        { name: 'identifier', value: 'mDog94gBYFmz7rt1cy93' },
      ]

      // WHEN
      const query = convertFhirParsedQueryParamsToElasticsearchQuery(researchStudyQuery, numberOfResourcesByPageByDefault)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: offset,
        query: { bool: { filter: [], must: [{ match: { _id: 'mDog94gBYFmz7rt1cy93' } }] } },
        size: numberOfResourcesByPage,
        sort: [
          { 'meta.lastUpdated': { order: 'asc' } },
          { _id: { order: 'desc' } },
          { 'status.keyword': { order: 'asc' } },
        ],
      })
    })

    it('with a count limit to 10000', () => {
      // GIVEN
      const numberOfResourcesByPage = 10001
      const offset = numberOfResourcesByPage * 9
      const researchStudyQuery: FhirParsedQueryParams[] = [
        { name: '_count', value: String(numberOfResourcesByPage) },
        { name: '_getpagesoffset', value: String(offset) },
        { name: 'identifier', value: 'mDog94gBYFmz7rt1cy93' },
      ]

      // WHEN
      const query = convertFhirParsedQueryParamsToElasticsearchQuery(researchStudyQuery, numberOfResourcesByPageByDefault)

      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: offset,
        query: { bool: { filter: [], must: [{ match: { _id: 'mDog94gBYFmz7rt1cy93' } }] } },
        size: numberOfResourcesByPageByDefault,
        sort: [
          { 'meta.lastUpdated': { order: 'asc' } },
          { _id: { order: 'desc' } },
          { 'status.keyword': { order: 'asc' } },
        ],
      })
    })

    it('from "search after" param and sorts when there is at least 10 000 results', () => {
      // GIVEN
      const searchAfter = '1631232000000,2019-A00427-50'
      const researchStudyQuery: FhirParsedQueryParams[] = [
        { name: '_sort', value: 'meta.lastUpdated,_id' },
        { name: 'search_after', value: searchAfter },
      ]
      // WHEN
      const query = convertFhirParsedQueryParamsToElasticsearchQuery(researchStudyQuery, numberOfResourcesByPageByDefault)
      // THEN
      expect(query).toStrictEqual<ElasticsearchBodyType>({
        from: 0,
        query: { bool: { filter: [], must: [] } },
        search_after: ['1631232000000', '2019-A00427-50'],
        size: numberOfResourcesByPageByDefault,
        sort: [
          { _id: { order: 'asc' } },
          { 'meta.lastUpdated': { order: 'asc' } },
          { 'status.keyword':{ order:'asc' } },
        ],
      })
    })
  })

  it('should return all the resources when filters are empty', () => {
    // GIVEN
    const researchStudyQuery: FhirParsedQueryParams[] = [
      { name: '_lastUpdated', value: '' },
      { name: 'identifier', value: '' },
    ]

    // WHEN
    const query = convertFhirParsedQueryParamsToElasticsearchQuery(researchStudyQuery, numberOfResourcesByPageByDefault)

    // THEN
    expect(query).toStrictEqual<ElasticsearchBodyType>({
      from: 0,
      query: { bool: { filter: [], must: [] } },
      size: numberOfResourcesByPageByDefault,
      sort: [
        { 'meta.lastUpdated': { order: 'asc' } },
        { _id: { order: 'desc' } },
        { 'status.keyword': { order: 'asc' } },
      ],
    })
  })
})
