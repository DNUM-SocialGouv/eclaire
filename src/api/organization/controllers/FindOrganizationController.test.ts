import supertest from 'supertest'

import { getHttpServer } from '../../../shared/test/helpers/controllerHelper'

const BASE_URL = '/R4/Organization/'

describe('#FindOrganizationController - e2e', () => {
  it('should retrieve one organization', async () => {
    // WHEN
    const response = await supertest(await getHttpServer())
      .get(BASE_URL + 'ctis')

    // THEN
    expect(response.statusCode).toBe(200)
    expect(response.get('content-type')).toBe('application/fhir+json; charset=utf-8')
    expect(response.text).toMatchInlineSnapshot('"{"id":"ctis","name":"Clinical Trials Information System","telecom":[{"system":"url","use":"work","value":"https://euclinicaltrials.eu/"}],"resourceType":"Organization"}"')
  })
})
