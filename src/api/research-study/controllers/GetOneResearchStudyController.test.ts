import Server from 'http'
import supertest from 'supertest'

import { CONTROLLER_DOCUMENT_ID, getHttpServer } from '../../../shared/test/helpers/controllerHelper'

const BASE_URL = '/R4/ResearchStudy/'
const SNAPSHOT_PATH = '../../../shared/test/snapshots/ResearchStudy.snap.json'

describe('#GetOneResearchStudyController - e2e', () => {
  let app: Server.Server<typeof Server.IncomingMessage, typeof Server.ServerResponse>

  beforeEach(async () => {
    app = await getHttpServer()
  })

  afterAll(() => {
    app.close()
  })

  it('should retrieve one research study', async () => {
    // WHEN
    const response = await supertest(app)
      .get(BASE_URL + CONTROLLER_DOCUMENT_ID)

    // THEN
    expect(response.statusCode).toBe(200)
    expect(response.get('content-type')).toBe('application/fhir+json; charset=utf-8')
    await expect(response.text).toMatchFileSnapshot(SNAPSHOT_PATH)
  })

  it('should return 429 Too Many Requests after exceeding the limit when api requests are valid but there is too many consecutive api calls', async () => {
    // GIVEN
    const maxRequests = 1
    app.close()
    const appWithApiRateLimit: Server.Server<typeof Server.IncomingMessage, typeof Server.ServerResponse> = await getHttpServer(true)

    // WHEN
    for (let i = 0; i < maxRequests; i++) {
      await supertest(appWithApiRateLimit).get(BASE_URL + CONTROLLER_DOCUMENT_ID).expect(200)
    }
    const response = await supertest(appWithApiRateLimit).get(BASE_URL + CONTROLLER_DOCUMENT_ID)

    // THEN
    expect(response.statusCode).toBe(429)
    expect(response.get('content-type')).toBe('application/json; charset=utf-8')
    expect(response.text).toMatchInlineSnapshot('"{"statusCode":429,"message":"ThrottlerException: Too Many Requests"}"')

    appWithApiRateLimit.close()
  })
})
