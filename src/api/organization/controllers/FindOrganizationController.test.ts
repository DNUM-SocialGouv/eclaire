import supertest from 'supertest'

import { getHttpServer } from '../../../shared/test/helpers/controllerHelper'

const BASE_URL = '/R4/Organization/'

describe('#FindOrganizationController - e2e', async () => {
  const app = await getHttpServer()

  it('should retrieve one organization', async () => {
    // WHEN
    const response = await supertest(app)
      .get(BASE_URL + 'ctis')

    // THEN
    expect(response.statusCode).toBe(200)
    expect(response.get('content-type')).toBe('application/fhir+json; charset=utf-8')
    expect(response.text).toMatchInlineSnapshot('"{"name":"Clinical Trials Information System","telecom":[{"system":"url","use":"work","value":"https://euclinicaltrials.eu/"}],"id":"ctis","resourceType":"Organization"}"')
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
