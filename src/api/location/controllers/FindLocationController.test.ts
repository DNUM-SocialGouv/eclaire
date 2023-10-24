import supertest from 'supertest'

import { CONTROLLER_DOCUMENT_ID, getHttpServer } from '../../../shared/test/helpers/controllerHelper'

const BASE_URL = '/R4/Location/'

describe('#FindLocationController - e2e', async () => {
  const app = await getHttpServer()

  it('should retrieve one location', async () => {
    // WHEN
    const response = await supertest(app)
      .get(BASE_URL + CONTROLLER_DOCUMENT_ID + '-0-site')

    // THEN
    expect(response.statusCode).toBe(200)
    expect(response.get('content-type')).toBe('application/fhir+json; charset=utf-8')
    expect(response.text).toMatchInlineSnapshot('"{"identifier":[{"use":"official","value":"2022-500014-26-00-0-site"}],"address":{"city":"Lille","line":["Avenue Eugene Avinee","Gastroenterology Hepatology and Nutrition Unit Paediatric clinic, Child Unit"],"use":"work","type":"physical"},"name":"Donnée non disponible","telecom":[{"extension":[{"valueHumanName":{"given":["Madeleine"],"prefix":["Dr."],"use":"official","family":"Aumar"},"url":"https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-site-contact-name"}],"use":"work"}],"id":"2022-500014-26-00-0-site","resourceType":"Location"}"')
  })

  it('should retrieve none', async () => {
    // WHEN
    const response = await supertest(app)
      .get(BASE_URL + 'unavailable_id')

    // THEN
    expect(response.statusCode).toBe(404)
    expect(response.get('content-type')).toBe('application/fhir+json; charset=utf-8')
    expect(response.text).toMatchInlineSnapshot('"{"issue":[{"code":"processing","diagnostics":"No location fund","severity":"error"}],"resourceType":"OperationOutcome"}"')
  })
})
