import Server from 'http'
import supertest from 'supertest'

import { getHttpServer } from '../../../shared/test/helpers/controllerHelper'

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
    expect(response.text).toMatchInlineSnapshot('"{"actual":true,"characteristic":[{"code":{"coding":[{"code":"grp-gender","display":"Gender (Genre)","system":"https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-group-characteristic-kind-code-system","version":"0.2.1"}]},"exclude":false,"valueCodeableConcept":{"coding":[{"code":"male","display":"Male","system":"http://hl7.org/fhir/administrative-gender","version":"5.0.0"},{"code":"female","display":"Female","system":"http://hl7.org/fhir/administrative-gender","version":"5.0.0"}]}},{"code":{"coding":[{"code":"grp-age","display":"Age (Age)","system":"https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-group-characteristic-kind-code-system","version":"0.2.1"}]},"exclude":false,"valueRange":{"low":{"unit":"years","value":65}}},{"code":{"coding":[{"code":"grp-age","display":"Age (Age)","system":"https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-group-characteristic-kind-code-system","version":"0.2.1"}]},"exclude":false,"valueRange":{"high":{"unit":"years","value":64},"low":{"unit":"years","value":18}}},{"code":{"coding":[{"code":"grp-category","display":"Research Study Group Category (Catégorie du groupe d\'étude)","system":"https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-group-characteristic-kind-code-system","version":"0.2.1"}]},"exclude":false,"valueCodeableConcept":{"coding":[{"display":"Données non disponible"}]}},{"code":{"coding":[{"code":"grp-studypop","display":"Study Population (Population de l\'étude)","system":"https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-group-characteristic-kind-code-system","version":"0.2.1"}]},"exclude":false,"valueCodeableConcept":{"coding":[{"code":"no-using-contraception","display":"Women of child bearing potential not using contraception (Femmes en âge de procréer n\'utilisant pas de contraception)","system":"https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-study-population-code-system","version":"0.2.0"},{"code":"using-contraception","display":"Women of child bearing potential using contraception (Femmes en âge de procréer utilisant une méthode de contraception)","system":"https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-study-population-code-system","version":"0.2.0"}]}},{"code":{"coding":[{"code":"grp-other","display":"Other (Autre)","system":"https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-group-characteristic-kind-code-system","version":"0.2.1"}]},"exclude":false,"valueCodeableConcept":{"coding":[{"display":"TEST INCLUSION"}]}},{"code":{"coding":[{"code":"grp-other","display":"Other (Autre)","system":"https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-group-characteristic-kind-code-system","version":"0.2.1"}]},"exclude":true,"valueCodeableConcept":{"coding":[{"display":"TEST EXCLUSION"}]}},{"code":{"coding":[{"code":"grp-other","display":"Other (Autre)","system":"https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-group-characteristic-kind-code-system","version":"0.2.1"}]},"exclude":false,"valueCodeableConcept":{"coding":[{"display":"TEST PRINCIPAL"}]}},{"code":{"coding":[{"code":"grp-other","display":"Other (Autre)","system":"https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-group-characteristic-kind-code-system","version":"0.2.1"}]},"exclude":false,"valueCodeableConcept":{"coding":[{"display":"TEST SECONDAIRE"}]}}],"id":"2022-500014-26-00-enrollment-group","quantity":21,"type":"person","resourceType":"Group"}"')
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
