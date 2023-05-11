import { Test, TestingModule } from '@nestjs/testing'

import { EsClinicalTrialRepository } from './es-clinical-trial.repository'
import { ElasticsearchService } from '../../../../shared/elasticsearch/elasticsearch.service'
import { ElasticsearchServiceNotFound } from '../../../../shared/elasticsearch/ElasticsearchServiceNotFound'
import { fakeClient } from '../../../../shared/elasticsearch/fakeClient'
import { NotFoundClinicalTrialException } from '../../application/Exceptions/NotFoundClinicalTrialException'

describe('clinical trial file repository', () => {
  // it('should retrieve one clinical trial', async () => {
  //   // GIVEN
  //   // const payload = {
  //   //   clinical_trial_category: '',
  //   //   clinical_trial_type: '',
  //   //   contact: {
  //   //     public_query: {
  //   //       address: '',
  //   //       city: '',
  //   //       country: '',
  //   //       department: '',
  //   //       email: '',
  //   //       firstname: '',
  //   //       lastname: '',
  //   //       name: '',
  //   //       organization: '',
  //   //       organization_id: '',
  //   //       telephone: '',
  //   //       title: '',
  //   //       zip: '',
  //   //     },
  //   //     scientific_query: {
  //   //       address: '',
  //   //       city: '',
  //   //       country: '',
  //   //       department: '',
  //   //       email: '',
  //   //       firstname: '',
  //   //       lastname: '',
  //   //       name: '',
  //   //       organization: '',
  //   //       organization_id: '',
  //   //       telephone: '',
  //   //       title: '',
  //   //       zip: '',
  //   //     },
  //   //   },
  //   //   last_revision_date: '',
  //   //   medical_condition: '',
  //   //   medical_condition_meddra: [],
  //   //   primary_sponsor: {
  //   //     address: '',
  //   //     city: '',
  //   //     country: '',
  //   //     department: '',
  //   //     email: '',
  //   //     firstname: '',
  //   //     lastname: '',
  //   //     name: '',
  //   //     organization: '',
  //   //     organization_id: '',
  //   //     telephone: '',
  //   //     title: '',
  //   //     zip: '',
  //   //   },
  //   //   public_title: { acronym: '', value: '' },
  //   //   recruitment: {
  //   //     ages_range: [],
  //   //     ages_range_secondary_identifiers: [],
  //   //     clinical_trial_group: '',
  //   //     date_recruiting_status: '',
  //   //     exclusion_criteria: { id: '', value: '', value_language: '' },
  //   //     genders: [],
  //   //     inclusion_criteria: { id: '', value: '', value_language: '' },
  //   //     status: 'UNAVAILABLE',
  //   //     target_number: 0,
  //   //     vulnerable_population: '',
  //   //   },
  //   //   scientific_title: { acronym: '', value: '' },
  //   //   secondaries_trial_numbers: {},
  //   //   study_type: { phase: '', study_design: '', study_type: '' },
  //   //   summary: '',
  //   //   therapeutic_areas: [],
  //   //   trial_sites: [
  //   //     {
  //   //       address: '',
  //   //       city: '',
  //   //       country: '',
  //   //       department: '',
  //   //       email: '',
  //   //       firstname: '',
  //   //       lastname: '',
  //   //       name: '',
  //   //       organization: '',
  //   //       organization_id: '',
  //   //       telephone: '',
  //   //       title: '',
  //   //       zip: '',
  //   //     },
  //   //   ],
  //   //   universal_trial_number: '',
  //   //   uuid: '1',
  //   // }
  //   const repository = await createRepository()
  //
  //   // WHEN
  //   const clinicalTrial = repository.findOne('1')
  //
  //   // THEN
  //   expect(clinicalTrial).toStrictEqual(new ClinicalTrial(
  //     '',
  //     {},
  //     new Title('', ''),
  //     new Title('', ''),
  //     new Recruitment(
  //       RecruitmentStatus.UNAVAILABLE,
  //       '',
  //       [],
  //       [],
  //       [],
  //       0,
  //       new Criteria('', '', ''),
  //       new Criteria('', '', ''),
  //       '',
  //       ''
  //     ),
  //     new StudyType(
  //       '',
  //       '',
  //       ''
  //     ),
  //     '',
  //     new Contact(
  //       new ContactDetails('', '', '', '', '', '', '', '', '', '', '', '', ''),
  //       new ContactDetails('', '', '', '', '', '', '', '', '', '', '', '', '')
  //     ),
  //     '',
  //     [],
  //     [],
  //     new ContactDetails('', '', '', '', '', '', '', '', '', '', '', '', ''),
  //     [new ContactDetails('', '', '', '', '', '', '', '', '', '', '', '', '')],
  //     '',
  //     '',
  //     ''
  //   ))
  // })

  it('should return a 404 error if no clinical trial exist', async () => {
    // GIVEN
    const unknownUuid = '0fc962d4-705f-4c7f-9fe1-6ecbfc58187d'
    const service = new ElasticsearchService(fakeClient)
    jest.spyOn(service, 'findOneDocument').mockRejectedValue(new ElasticsearchServiceNotFound())

    const repository = await createRepository(service)

    try {
      // WHEN
      await repository.findOne(unknownUuid)
      throw new Error('Should not be triggered')
    } catch (error) {
      // THEN
      expect(error).toBeInstanceOf(NotFoundClinicalTrialException)
    }
  })
})

async function createRepository(service: ElasticsearchService): Promise<EsClinicalTrialRepository> {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      {
        provide: EsClinicalTrialRepository,
        useFactory: () => {
          return new EsClinicalTrialRepository(service)
        },
      },
    ],
  }).compile()

  return module.get<EsClinicalTrialRepository>(EsClinicalTrialRepository)
}
