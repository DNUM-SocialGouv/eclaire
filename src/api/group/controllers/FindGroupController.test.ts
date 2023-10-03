import supertest from 'supertest'

import { getHttpServer } from '../../../shared/test/helpers/controllerHelper'

const BASE_URL = '/R4/Group/'

describe('#FindGroupController - e2e', () => {
  it('should retrieve one group', async () => {
    // WHEN
    const response = await supertest(await getHttpServer())
      .get(BASE_URL + '2022-500014-26-00-enrollment-group-id')

    // THEN
    expect(response.statusCode).toBe(200)
    expect(response.get('content-type')).toBe('application/fhir+json; charset=utf-8')
    expect(response.text).toMatchInlineSnapshot('"{"actual":true,"characteristic":[{"exclude":false,"valueCodeableConcept":{"coding":[{"code":"male","display":"Male","system":"http://hl7.org/fhir/administrative-gender","version":"5.0.0"},{"code":"female","display":"Female","system":"http://hl7.org/fhir/administrative-gender","version":"5.0.0"}],"text":"Genders"}},{"exclude":false,"valueRange":{"low":{"unit":"years","value":65}}},{"exclude":false,"valueRange":{"high":{"unit":"years","value":64},"low":{"unit":"years","value":18}}},{"exclude":false,"valueCodeableConcept":{"coding":[{"display":"Données non disponible"}],"text":"Research Study Group Category"}},{"exclude":false,"valueCodeableConcept":{"coding":[{"display":"Femmes en âge de procréer n’utilisant pas de contraception"},{"display":"Femmes en âge de procréer utilisant une méthode de contraception"}],"text":"Study Population"}},{"exclude":false,"valueCodeableConcept":{"coding":[{"display":"INDISPONIBLE"}],"text":"Study Inclusion Criteria"}},{"exclude":true,"valueCodeableConcept":{"coding":[{"display":"INDISPONIBLE"}],"text":"Study Exclusion Criteria"}}],"id":"2022-500014-26-00-enrollment-group-id","quantity":21,"type":"person","resourceType":"Group"}"')
  })

  it('should retrieve none', async () => {
    // WHEN
    const response = await supertest(await getHttpServer())
      .get(BASE_URL + 'unavailable_id')

    // THEN
    expect(response.statusCode).toBe(404)
    expect(response.get('content-type')).toBe('application/fhir+json; charset=utf-8')
    expect(response.text).toMatchInlineSnapshot('"{"issue":[{"code":"processing","diagnostics":"No enrollment group fund","severity":"error"}],"resourceType":"OperationOutcome"}"')
  })
})
