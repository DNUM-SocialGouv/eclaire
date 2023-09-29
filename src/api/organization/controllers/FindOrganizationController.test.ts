import supertest from 'supertest'

import { getHttpServer } from '../../../shared/test/helpers/controllerHelper'

const BASE_URL = '/R4/Organization/'
const SNAPSHOT_PATH = '../../../shared/test/snapshots/Organization.snap.json'

describe('#GetOneResearchStudyController - e2e', () => {
  it('should retrieve one research study', async () => {
    // WHEN
    const response = await supertest(await getHttpServer())
      .get(BASE_URL + 'blah')

    // THEN
    expect(response.statusCode).toBe(200)
    expect(response.get('content-type')).toBe('application/fhir+json; charset=utf-8')
    await expect(response.text).toMatchFileSnapshot(SNAPSHOT_PATH)
  })
})
