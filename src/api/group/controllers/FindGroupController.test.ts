import supertest from 'supertest'

import { getHttpServer } from '../../../shared/test/helpers/controllerHelper'

const BASE_URL = '/R4/Group/'

describe('#FindGroupController - e2e', async () => {
  const app = await getHttpServer()

  it('should retrieve one group', async () => {
    // WHEN
    const response = await supertest(app)
      .get(BASE_URL + '2022-500014-26-00-enrollment-group')

    // THEN
    expect(response.statusCode).toBe(200)
    expect(response.get('content-type')).toBe('application/fhir+json; charset=utf-8')
    expect(response.text).toMatchInlineSnapshot('"{"actual":true,"quantity":21,"id":"2022-500014-26-00-enrollment-group","type":"person","characteristic":[{"valueCodeableConcept":{"coding":[{"code":"male","system":"http://hl7.org/fhir/administrative-gender","display":"Male","version":"5.0.0"},{"code":"female","system":"http://hl7.org/fhir/administrative-gender","display":"Female","version":"5.0.0"}],"text":"Genders"},"exclude":false},{"valueRange":{"low":{"unit":"years","value":65}},"exclude":false},{"valueRange":{"high":{"unit":"years","value":64},"low":{"unit":"years","value":18}},"exclude":false},{"valueCodeableConcept":{"coding":[{"display":"Données non disponible"}],"text":"Research Study Group Category"},"exclude":false},{"valueCodeableConcept":{"coding":[{"code":"no-using-contraception","system":"https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-study-population-code-system","display":"Women of child bearing potential not using contraception (Femmes en âge de procréer n\'utilisant pas de contraception)","version":"0.2.0"},{"code":"using-contraception","system":"https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-study-population-code-system","display":"Women of child bearing potential using contraception (Femmes en âge de procréer utilisant une méthode de contraception)","version":"0.2.0"}],"text":"Study Population"},"exclude":false},{"valueCodeableConcept":{"coding":[{"display":"INDISPONIBLE"}],"text":"Study Inclusion Criteria"},"exclude":false},{"valueCodeableConcept":{"coding":[{"display":"INDISPONIBLE"}],"text":"Study Exclusion Criteria"},"exclude":true}],"resourceType":"Group"}"')
  })

  it('should retrieve none', async () => {
    // WHEN
    const response = await supertest(app)
      .get(BASE_URL + 'unavailable_id')

    // THEN
    expect(response.statusCode).toBe(404)
    expect(response.get('content-type')).toBe('application/fhir+json; charset=utf-8')
    expect(response.text).toMatchInlineSnapshot('"{"issue":[{"code":"processing","diagnostics":"No enrollment group fund","severity":"error"}],"resourceType":"OperationOutcome"}"')
  })
})
