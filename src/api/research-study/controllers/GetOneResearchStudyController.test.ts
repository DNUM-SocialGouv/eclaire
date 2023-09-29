import supertest from 'supertest'

import { CONTROLLER_DOCUMENT_ID, getHttpServer } from '../../../shared/test/helpers/controllerHelper'

const BASE_URL = '/R4/ResearchStudy/'
const SNAPSHOT_PATH = '../../../shared/test/snapshots/ResearchStudy.snap.json'

describe('#GetOneResearchStudyController - e2e', () => {
  it('should retrieve one research study', async () => {
    // WHEN
    const response = await supertest(await getHttpServer())
      .get(BASE_URL + CONTROLLER_DOCUMENT_ID)

    // THEN
    expect(response.statusCode).toBe(200)
    expect(response.get('content-type')).toBe('application/fhir+json; charset=utf-8')
    await expect(response.text).toMatchFileSnapshot(SNAPSHOT_PATH)
  })
})
