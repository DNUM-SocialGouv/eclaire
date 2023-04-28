import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import supertest from 'supertest'

import { AppModule } from '../src/app.module'

describe('app', () => {
  it('get one clinical trial with an authentification', async () => {
    // GIVEN
    const token = await getToken()

    // WHEN
    const response = await supertest(await getHttpServer())
      .get('/clinical-trial/1')
      .set('Authorization', `Bearer ${token.access_token}`)

    // THEN
    expect(response.statusCode).toBe(200)
    expect(response.get('content-type')).toBe('application/json; charset=utf-8')
    expect(response.text).toBe('{"universal_trial_number":"NCT00000419","secondaries_trial_numbers":{"national_number":"2011-006209-83","pactr_number":"PACTR202302877569441"},"public_title":{"value":"Circuler l\'ADN pour améliorer le résultat de l\'oncologie Patient. Une étude randomisée","acronym":"AGADIR"},"scientific_title":{"value":"le meme titre mais en scientifique","acronym":"AGADIR"},"recruitment":{"status":"RECRUITING","date_recruiting_status":"2022-02-06T18:25:43.511Z","genders":["FEMALE"],"ages_range":["IN_UTERO","65_PLUS_YEARS"],"ages_range_secondary_identifiers":["PRETERM_NEWBORN","85_PLUS_YEARS"],"target_number":100,"exclusion_criteria":{"id":"2","value":"femme porteuse d\'un cancer du sein stade terminal","value_language":"women with breast cancer terminal phase"},"inclusion_criteria":{"id":"1","value":"femme porteuse d\'un cancer du sein stade benin","value_language":"women with only a benine breast cancer"},"clinical_trial_group":"patient","vulnerable_population":"pregnant women"},"study_type":{"phase":"Therapeutic use (Phase IV)","type":"","design":""},"last_revision_date":"2022-02-06T18:25:43.511Z","contact":{"public_query":{"name":"Institut Bergognié","firstname":"Antoine","lastname":"Italiano","address":"5 avenue de l’opera","city":"bordeaux","country":"France","zip":"33076","telephone":"01 23 45 67 89","email":"aitaliona@example.fr","organization":"Ministère de la santé","organization_id":"","title":"Agent de Santé","department":"Laboratoire"},"scientific_query":{"name":"","firstname":"","lastname":"","address":"","city":"","country":"","zip":"","telephone":"","email":"","organization":"","organization_id":"","title":"","department":""}},"medical_condition":"Lung cancer","medical_condition_meddra":["10060929","10072818"],"therapeutic_area":[{"value":"Circulatory and Respiratory Physiological Phenomena","code":"G"},{"value":"Physical Phenomena","code":"G01"}],"primary_sponsor":{"name":"Institut Bergognié","firstname":"Antoine","lastname":"Italiano","address":"5 avenue de l’opera","city":"bordeaux","country":"France","zip":"33076","telephone":"01 23 45 67 89","email":"aitaliona@example.fr","organization":"Ministère de la santé","organization_id":"","title":"Agent de Santé","department":"Laboratoire"},"trial_sites":[{"name":"Max Testman","firstname":"Max","lastname":"Testman","address":"Inrain 52","city":"Insbruck","country":"austria","zip":"6020","telephone":"+43010677","email":"max.testman@hotmail.fr","organization":"Insbruck medical university","organization_id":"2039","title":"","department":"laboratorium"}],"summary":"Le contexte des cette étude est le suivant, les gens addicts aux dragibus.","clinical_trial_type":"Recherche impliquant la personne humaine","clinical_trial_category":"Catégorie 1"}')
  })

  it('does not get one clinical trial with an unknow uuid', async () => {
    // GIVEN
    const token = await getToken()

    // WHEN
    const response = await supertest(await getHttpServer())
      .get('/clinical-trial/999999')
      .set('Authorization', `Bearer ${token.access_token}`)

    // THEN
    expect(response.statusCode).toBe(404)
    expect(response.text).toBe('{"statusCode":404,"message":"Aucun essai clinique n’a été trouvé","error":"Not Found"}')
  })

  it('get one user with an authentification', async () => {
    // GIVEN
    const token = await getToken()

    // WHEN
    const response = await supertest(await getHttpServer())
      .get('/user')
      .set('Authorization', `Bearer ${token.access_token}`)

    // THEN
    expect(response.statusCode).toBe(200)
    expect(response.get('content-type')).toBe('application/json; charset=utf-8')
    expect(response.text).toBe('{"email":"demo@demo.com"}')
  })

  it('does not get one user without an authentification', async () => {
    // WHEN
    const response = await supertest(await getHttpServer())
      .get('/user')

    // THEN
    expect(response.statusCode).toBe(401)
  })
})

async function getToken() {
  const authResponse = await supertest(await getHttpServer())
    .post('/auth/login')
    .send({ email: 'demo@demo.com', password: 'demo' })
  return JSON.parse(authResponse.text) as { access_token: string }
}

async function getHttpServer() {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({ envFilePath: ['.env'] }),
      AppModule,
    ],
  }).compile()

  const app = moduleFixture.createNestApplication()
  await app.init()

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return app.getHttpServer()
}
