import { ConfigModule } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import supertest from 'supertest'

import { AppModule } from '../AppModule'
import { ElasticsearchService } from '../shared/elasticsearch/ElasticsearchService'
import { RiphCtisResearchStudyModelFactory } from 'src/etl/RiphCtisResearchStudyModelFactory'
import { deleteElasticsearchIndice, riphCtisDto } from 'src/shared/test/helpers/elasticsearchHelper'

describe('app', () => {
  it('should retrieve one research study with an authentification', async () => {
    // GIVEN
    const token = await getToken()

    // WHEN
    const response = await supertest(await getHttpServer())
      .get('/R4/ResearchStudy/fakeId1')
      .set('Authorization', `Bearer ${token.access_token}`)

    // THEN
    expect(response.statusCode).toBe(200)
    expect(response.get('content-type')).toBe('application/fhir+json; charset=utf-8')
    expect(response.text).toBe('{"category":[{"text":"REG536"}],"condition":[{"coding":[{"code":"Locally-Advanced or Metastatic breast cancer (MBC)","display":"Disease Condition"}],"text":"Disease Condition"},{"coding":[{"code":"10070575","display":"MedDRA","system":"http://terminology.hl7.org/CodeSystem/mdr","version":"2.0.1"},{"code":"10065430","display":"MedDRA","system":"http://terminology.hl7.org/CodeSystem/mdr","version":"2.0.1"}],"text":"MedDRA Condition"}],"contact":[{"name":"Head of EU, Trial Information Support Line-TISL, Switzerland","telecom":[{"system":"phone","use":"work","value":"0041616881111"},{"system":"email","use":"work","value":"global.rochegenentechtrials@roche.com"}]}],"contained":[{"actual":true,"characteristic":[{"exclude":false,"valueCodeableConcept":{"coding":[{"code":"male","display":"Male","system":"http://hl7.org/fhir/administrative-gender","version":"5.0.0"},{"code":"female","display":"Female","system":"http://hl7.org/fhir/administrative-gender","version":"5.0.0"}],"text":"Genders"}},{"exclude":false,"valueCodeableConcept":{"coding":[{"display":"65+ years"},{"display":"18-64 years"}],"text":"Age range"}},{"exclude":false,"valueCodeableConcept":{"coding":[{"display":"21"}],"text":"Study Size"}},{"exclude":false,"valueCodeableConcept":{"coding":[{"display":"Données non disponible"}],"text":"Study Category"}},{"exclude":false,"valueCodeableConcept":{"coding":[{"display":"Women of child bearing potential not using contraception, Women of child bearing potential using contraception"}],"text":"Study Population"}}],"type":"person","resourceType":"Group"}],"description":"INDISPONIBLE","enrollment":[{"type":"Group"}],"identifier":[{"assigner":{"display":"euclinicaltrials.eu","reference":"https://euclinicaltrials.eu/app/#/view/2022-500014-26-00"},"use":"usual","value":"2022-500014-26-00"}],"meta":{"lastUpdated":"2023-04-12"},"phase":{"coding":[{"code":"phase-3","display":"Phase 3","system":"http://terminology.hl7.org/CodeSystem/research-study-phase","version":"4.0.1"}],"text":"Therapeutic confirmatory  (Phase III)"},"status":"active","title":"A PHASE III, RANDOMIZED, OPEN-LABEL STUDY EVALUATING THE EFFICACY AND SAFETY OF GIREDESTRANT IN COMBINATION WITH PHESGO VERSUS PHESGO AFTER INDUCTION THERAPY WITH PHESGO+TAXANE IN PATIENTS WITH PREVIOUSLY UNTREATED HER2-POSITIVE, ESTROGEN RECEPTOR-POSITIVE LOCALLY-ADVANCED OR METASTATIC BREAST CANCER","resourceType":"ResearchStudy"}')
  })

  it('should not retrieve one research study when an unknown id is given', async () => {
    // GIVEN
    const token = await getToken()

    // WHEN
    const response = await supertest(await getHttpServer())
      .get('/R4/ResearchStudy/999999')
      .set('Authorization', `Bearer ${token.access_token}`)

    // THEN
    expect(response.statusCode).toBe(404)
    expect(response.text).toBe('{"message":{"issue":[{"code":"processing","diagnostics":"Response Error","severity":"error"}],"resourceType":"OperationOutcome"}}')
  })

  it('should retrieve researches study when good filter is given', async () => {
    // GIVEN
    const token = await getToken()

    // WHEN
    const response = await supertest(await getHttpServer())
      .get('/R4/ResearchStudy?_lastUpdated=2023-04-12')
      .set('Authorization', `Bearer ${token.access_token}`)

    // THEN
    expect(response.statusCode).toBe(200)
    expect(response.get('content-type')).toBe('application/fhir+json; charset=utf-8')
    expect(response.text).toBe('{"entry":[{"category":[{"text":"REG536"}],"condition":[{"coding":[{"code":"Locally-Advanced or Metastatic breast cancer (MBC)","display":"Disease Condition"}],"text":"Disease Condition"},{"coding":[{"code":"10070575","display":"MedDRA","system":"http://terminology.hl7.org/CodeSystem/mdr","version":"2.0.1"},{"code":"10065430","display":"MedDRA","system":"http://terminology.hl7.org/CodeSystem/mdr","version":"2.0.1"}],"text":"MedDRA Condition"}],"contact":[{"name":"Head of EU, Trial Information Support Line-TISL, Switzerland","telecom":[{"system":"phone","use":"work","value":"0041616881111"},{"system":"email","use":"work","value":"global.rochegenentechtrials@roche.com"}]}],"contained":[{"actual":true,"characteristic":[{"exclude":false,"valueCodeableConcept":{"coding":[{"code":"male","display":"Male","system":"http://hl7.org/fhir/administrative-gender","version":"5.0.0"},{"code":"female","display":"Female","system":"http://hl7.org/fhir/administrative-gender","version":"5.0.0"}],"text":"Genders"}},{"exclude":false,"valueCodeableConcept":{"coding":[{"display":"65+ years"},{"display":"18-64 years"}],"text":"Age range"}},{"exclude":false,"valueCodeableConcept":{"coding":[{"display":"21"}],"text":"Study Size"}},{"exclude":false,"valueCodeableConcept":{"coding":[{"display":"Données non disponible"}],"text":"Study Category"}},{"exclude":false,"valueCodeableConcept":{"coding":[{"display":"Women of child bearing potential not using contraception, Women of child bearing potential using contraception"}],"text":"Study Population"}}],"type":"person","resourceType":"Group"}],"description":"INDISPONIBLE","enrollment":[{"type":"Group"}],"identifier":[{"assigner":{"display":"euclinicaltrials.eu","reference":"https://euclinicaltrials.eu/app/#/view/2022-500014-26-00"},"use":"usual","value":"2022-500014-26-00"}],"meta":{"lastUpdated":"2023-04-12"},"phase":{"coding":[{"code":"phase-3","display":"Phase 3","system":"http://terminology.hl7.org/CodeSystem/research-study-phase","version":"4.0.1"}],"text":"Therapeutic confirmatory  (Phase III)"},"status":"active","title":"A PHASE III, RANDOMIZED, OPEN-LABEL STUDY EVALUATING THE EFFICACY AND SAFETY OF GIREDESTRANT IN COMBINATION WITH PHESGO VERSUS PHESGO AFTER INDUCTION THERAPY WITH PHESGO+TAXANE IN PATIENTS WITH PREVIOUSLY UNTREATED HER2-POSITIVE, ESTROGEN RECEPTOR-POSITIVE LOCALLY-ADVANCED OR METASTATIC BREAST CANCER","resourceType":"ResearchStudy"}],"link":[{"relation":"self","url":"http://localhost:3000/R4/ResearchStudy?_getpagesoffset=0"},{"relation":"next","url":"http://localhost:3000/R4/ResearchStudy?_getpagesoffset=2"}],"resourceType":"Bundle","total":1,"type":"searchset"}')
  })

  it('should not retrieve researches study when wrong filter is given', async () => {
    // GIVEN
    const token = await getToken()

    // WHEN
    const response = await supertest(await getHttpServer())
      .get('/R4/ResearchStudy?_lastUpdated=d')
      .set('Authorization', `Bearer ${token.access_token}`)

    // THEN
    expect(response.statusCode).toBe(400)
    expect(response.text).toBe('{"message":{"issue":[{"code":"processing","diagnostics":"failed to parse date field [d] with format [strict_date_optional_time||epoch_millis]: [failed to parse date field [d] with format [strict_date_optional_time||epoch_millis]]","severity":"error"}],"resourceType":"OperationOutcome"}}')
  })

  it('should retrieve one user with an authentification', async () => {
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

  it('should not retrieve one user without an authentification', async () => {
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
  await deleteElasticsearchIndice()

  const moduleFixture = await Test.createTestingModule({
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
    RiphCtisResearchStudyModelFactory.create(riphCtisDto[0]),
    { index: { _id: 'fakeId2' } },
    RiphCtisResearchStudyModelFactory.create(riphCtisDto[1]),
  ])

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return app.getHttpServer()
}
