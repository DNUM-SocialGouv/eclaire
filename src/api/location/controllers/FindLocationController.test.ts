import Server from 'http'
import supertest from 'supertest'

import { CONTROLLER_DOCUMENT_ID, getHttpServer } from '../../../shared/test/helpers/controllerHelper'

const BASE_URL = '/R4/Location/'

describe('#FindLocationController - e2e', () => {
  let app: Server.Server<typeof Server.IncomingMessage, typeof Server.ServerResponse>

  beforeEach(async () => {
    app = await getHttpServer()
  })

  afterAll(() => {
    app.close()
  })

  it('should retrieve one location', async () => {
    // WHEN
    const response = await supertest(app)
      .get(BASE_URL + CONTROLLER_DOCUMENT_ID + '-0-site')

    // THEN
    expect(response.statusCode).toBe(200)
    expect(response.get('content-type')).toBe('application/fhir+json; charset=utf-8')
    expect(response.text).toMatchInlineSnapshot('"{"id":"2022-500014-26-00-0-site","address":{"city":"Lille","line":["Avenue Eugene Avinee","Gastroenterology Hepatology and Nutrition Unit Paediatric clinic, Child Unit"],"type":"physical","use":"work"},"identifier":[{"use":"official","value":"2022-500014-26-00-0-site"}],"name":"Donnée non disponible","telecom":[{"extension":[{"url":"https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-site-contact-name","valueHumanName":{"family":"Aumar","given":["Madeleine"],"prefix":["Dr."],"use":"official"}}],"use":"work"}],"resourceType":"Location"}"')
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
