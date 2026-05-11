import Server from 'http'
import supertest from 'supertest'

import { getHttpServer } from '../../../shared/test/helpers/controllerHelper'

const SNAPSHOT_PATH = '../../../shared/test/snapshots/FindGroup.snap.json'
const BASE_URL = '/R4/Group/'

describe('#FindGroupController - e2e', () => {
  let app: Server.Server<typeof Server.IncomingMessage, typeof Server.ServerResponse>

  beforeEach(async () => {
    app = await getHttpServer()
  })

  afterAll(() => {
    app.close()
  })

  it('should retrieve one group', async () => {
    // WHEN
    const response = await supertest(app)
      .get(BASE_URL + '2022-500014-26-00-enrollment-group')

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
    expect(JSON.parse(response.text)).toEqual({
      resourceType: 'OperationOutcome',
      text: {
        status: 'generated',
        div: '<div xmlns="http://www.w3.org/1999/xhtml">No enrollment group found</div>',
      },
      issue: [
        {
          severity: 'error',
          code: 'not-found',
          diagnostics: 'Enrollment group not found',
        },
      ],
    })
  })
})
