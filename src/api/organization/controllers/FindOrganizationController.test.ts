import Server from 'http'
import supertest from 'supertest'

import { getHttpServer } from '../../../shared/test/helpers/controllerHelper'

const SNAPSHOT_PATH = '../../../shared/test/snapshots/FindOrganization.snap.json'
const BASE_URL = '/R4/Organization/'

describe('#FindOrganizationController - e2e', () => {
  let app: Server.Server<typeof Server.IncomingMessage, typeof Server.ServerResponse>

  beforeEach(async () => {
    app = await getHttpServer()
  })

  afterAll(() => {
    app.close()
  })

  it('should retrieve one organization', async () => {
    // WHEN
    const response = await supertest(app)
      .get(BASE_URL + 'ctis')

    // THEN
    expect(response.statusCode).toBe(200)
    expect(response.get('content-type')).toBe('application/fhir+json; charset=utf-8')
    await expect(response.text).toMatchFileSnapshot(SNAPSHOT_PATH)
  })

  it('should retrieve none', async () => {
    // WHEN
    const response = await supertest(app)
      .get(BASE_URL + 'unavailable_id')

    // THEN
    expect(response.statusCode).toBe(404)
    expect(response.get('content-type')).toBe('application/fhir+json; charset=utf-8')
    expect(response.text).toMatchInlineSnapshot('"{"issue":[{"code":"processing","diagnostics":"No organization fund","severity":"error"}],"resourceType":"OperationOutcome"}"')
  })
})
