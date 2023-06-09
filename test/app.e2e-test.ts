import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import supertest from 'supertest'

import { ClinicalTrialModelTestingFactory } from '../src/api/clinical-trial/gateways/ClinicalTrialModelTestingFactory'
import { AppModule } from '../src/AppModule'
import { ElasticsearchService } from '../src/shared/elasticsearch/ElasticsearchService'

describe('app', () => {
  it('get one clinical trial with an authentification', async () => {
    // GIVEN
    const token = await getToken()

    // WHEN
    const response = await supertest(await getHttpServer())
      .get('/clinical-trial/fakeId1')
      .set('Authorization', `Bearer ${token.access_token}`)

    // THEN
    expect(response.statusCode).toBe(200)
    expect(response.get('content-type')).toBe('application/json; charset=utf-8')
    expect(response.text).toBe('{"universal_trial_number":"NCT51265816","secondaries_trial_numbers":{"AFR_number":"AFRXXXXXXXX","national_number":"2011-006209-83"},"public_title":{"value":"Circuler l’ADN pour améliorer le résultat de l’oncologie Patient. Une étude randomisée","acronym":"AGADIR"},"scientific_title":{"value":"le meme titre mais en scientifique","acronym":"AGADIR"},"recruitment":{"status":"en cours","date_recruiting_status":"2022-02-06T18:25:43.511Z","genders":["homme"],"ages_range":["0-17 ans","65 ans et +"],"ages_range_secondary_identifiers":["85 ans et +"],"target_number":400,"exclusion_criteria":{"id":"1","value":"femme porteuse d’un cancer du sein stade terminal","value_language":"women with breast cancer terminal phase"},"inclusion_criteria":{"id":"1","value":"femme porteuse d’un cancer du sein stade benin","value_language":"women with only a benine breast cancer"},"clinical_trial_group":"patient","vulnerable_population":["pregnant women"]},"study_type":{"phase":"Human Pharmacology (Phase I)- First administration to humans","type":"JARDE","design":"Cur compater cadunt?","category":"Catégorie 1"},"last_revision_date":"2020-02-06T18:25:43.511Z","updated_at":"2020-02-06T18:25:43.511Z","contact":{"public_query":{"name":"Institut Bergognié","firstname":"Antoine","lastname":"Italiano","address":"5 avenue de l’opera","city":"bordeaux","country":"France","zip":"33076","telephone":"01 23 45 67 89","email":"aitaliona@example","organization":"Ministère de la santé","organization_id":"2039","type":"Agent de Santé","department":"Administration"},"scientific_query":{"name":"John Doe","firstname":"John","lastname":"Doe","address":"123 rue de la cabosse","city":"Saint-François-sur-Seine","country":"France","zip":"01234","telephone":"(+33)1 23 45 67 89","email":"johndoe@example.com","organization":"Ministère de la Santé","organization_id":"2040","type":"Agent de Santé","department":"Laboratoire"}},"medical_condition":"Cancer des poumons","medical_condition_meddra":["10060929","10072818"],"therapeutic_areas":[{"value":"Circulatory and Respiratory Physiological Phenomena","code":"G"}],"primary_sponsor":{"name":"Urbss ridetis!","firstname":"Flavum uria recte experientias byssus est.","lastname":"Pol.","address":"123 You have to lure, and absorb silence by your flying.","city":"Ubi est talis contencio?","country":"Domesticus, primus lamias hic desiderium de dexter, germanus mensa.","zip":"01234","telephone":"(+33)5 89 65 47 12","email":"johndoe@example.com","organization":"Ministère de la Santé","organization_id":"2039","type":"Agent de Santé","department":"Laboratoire"},"trial_sites":[{"name":"Urbss ridetis!","firstname":"Flavum uria recte experientias byssus est.","lastname":"Pol.","address":"123 You have to lure, and absorb silence by your flying.","city":"Ubi est talis contencio?","country":"Domesticus, primus lamias hic desiderium de dexter, germanus mensa.","zip":"01234","telephone":"(+33)5 89 65 47 12","email":"johndoe@example.com","organization":"Ministère de la Santé","organization_id":"2040","type":"Agent de Santé","department":"Laboratoire"}],"summary":"Le contexte des cette étude est le suivant, les gens addicts aux dragibus."}')
  })

  it('does not get one clinical trial with an unknown id', async () => {
    // GIVEN
    const token = await getToken()

    // WHEN
    const response = await supertest(await getHttpServer())
      .get('/clinical-trial/999999')
      .set('Authorization', `Bearer ${token.access_token}`)

    // THEN
    expect(response.statusCode).toBe(404)
    expect(response.text).toBe('{"statusCode":404,"message":"L’essai clinique 999999 n’a pas été trouvé","error":"Not Found"}')
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
      ConfigModule.forRoot({ envFilePath: ['.env.test'] }),
      AppModule,
    ],
  }).compile()

  const app = moduleFixture.createNestApplication()
  await app.init()

  const elasticsearchService = app.get<ElasticsearchService>(ElasticsearchService)
  await elasticsearchService.bulkDocuments([
    { index: { _id: 'fakeId1' } },
    ClinicalTrialModelTestingFactory.create(),
    { index: { _id: 'fakeId2' } },
    ClinicalTrialModelTestingFactory.create(),
  ])

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return app.getHttpServer()
}
