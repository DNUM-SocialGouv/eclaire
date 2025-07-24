import Server from 'http'
import supertest from 'supertest'

import { getHttpServer } from '../../../shared/test/helpers/controllerHelper'

const BASE_URL = '/R4/ResearchStudy/'
const SNAPSHOT_WITH_ALL_STUDIES = '../../../shared/test/snapshots/BundleWithAllStudies.snap.json'
const SNAPSHOT_WITH_FILTER = '../../../shared/test/snapshots/BundleWithFilter.snap.json'
const SNAPSHOT_WITH_INCLUDE = '../../../shared/test/snapshots/BundleWithInclude.snap.json'

describe('#SearchResearchStudyController - e2e', () => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date(2022, 0, 1))
  let app: Server.Server<typeof Server.IncomingMessage, typeof Server.ServerResponse>

  beforeEach(async () => {
    app = await getHttpServer()
  })

  afterAll(() => {
    vi.useRealTimers()
    app.close()
  })

  it('should retrieve all researches studies without related resource content when no filter is given', async () => {
    // GIVEN
    const filter = ''

    // WHEN
    const response = await supertest(app)
      .get(BASE_URL + filter)

    // THEN
    expect(response.statusCode).toBe(200)
    expect(response.get('content-type')).toBe('application/fhir+json; charset=utf-8')
    await expect(response.text).toMatchFileSnapshot(SNAPSHOT_WITH_ALL_STUDIES)
  })

  it('should retrieve researches study when good filter is given', async () => {
    // GIVEN
    const filter = '?_lastUpdated=2023-04-12'

    // WHEN
    const response = await supertest(app)
      .get(BASE_URL + filter)

    // THEN
    expect(response.statusCode).toBe(200)
    expect(response.get('content-type')).toBe('application/fhir+json; charset=utf-8')
    await expect(response.text).toMatchFileSnapshot(SNAPSHOT_WITH_FILTER)
  })

  it('should retrieve researches study with related resource content when corresponding filter is given', async () => {
    // GIVEN
    const filter = '?_include=*'

    // WHEN
    const response = await supertest(app)
      .get(BASE_URL + filter)

    // THEN
    expect(response.statusCode).toBe(200)
    expect(response.get('content-type')).toBe('application/fhir+json; charset=utf-8')
    await expect(response.text).toMatchFileSnapshot(SNAPSHOT_WITH_INCLUDE)
  })

  it('should not retrieve researches study when wrong filter is given', async () => {
    // GIVEN
    const wrongFilter = '?_lastUpdated=d'

    // WHEN
    const response = await supertest(app)
      .get(BASE_URL + wrongFilter)

    // THEN
    expect(response.statusCode).toBe(400)
    expect(response.text).toBe('{"issue":[{"code":"processing","diagnostics":"failed to parse date field [d] with format [strict_date_time_no_millis||strict_date_optional_time||epoch_millis]: [failed to parse date field [d] with format [strict_date_time_no_millis||strict_date_optional_time||epoch_millis]]","severity":"error"}],"resourceType":"OperationOutcome"}')
  })

  it('should not retrieve one research study when an unknown id is given', async () => {
    // GIVEN
    const unknownDocumentId = '999999'

    // WHEN
    const response = await supertest(app)
      .get(BASE_URL + unknownDocumentId)

    // THEN
    expect(response.statusCode).toBe(404)
    expect(response.text).toMatchInlineSnapshot('"{"issue":[{"code":"processing","diagnostics":{"_index":"eclaire","_id":"999999","found":false},"severity":"error"}],"resourceType":"OperationOutcome"}"')
  })

  it('should return 429 Too Many Requests after exceeding the limit when api requests are valid but there is too many consecutive api calls', async () => {
    // GIVEN
    const filter = ''
    const maxRequests = 1
    app.close()
    const appWithApiRateLimit: Server.Server<typeof Server.IncomingMessage, typeof Server.ServerResponse> = await getHttpServer(true)

    // WHEN
    for (let i = 0; i < maxRequests; i++) {
      await supertest(appWithApiRateLimit).get(BASE_URL + filter).expect(200)
    }
    const response = await supertest(appWithApiRateLimit).get(BASE_URL + filter)

    // THEN
    expect(response.statusCode).toBe(429)
    expect(response.get('content-type')).toBe('application/json; charset=utf-8')
    expect(response.text).toMatchInlineSnapshot('"{"statusCode":429,"message":"ThrottlerException: Too Many Requests"}"')

    appWithApiRateLimit.close()
  })
})
