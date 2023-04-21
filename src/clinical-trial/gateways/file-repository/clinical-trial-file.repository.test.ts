import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'

import { ClinicalTrialFileRepository } from './clinical-trial-file.repository'
import { ClinicalTrialModelTestingFactory } from './clinical-trial-model-testing-factory'
import { ClinicalTrial } from '../../application/entities/ClinicalTrial'
import { Contact } from '../../application/entities/Contact'
import { ContactDetails } from '../../application/entities/ContactDetails'
import { Recruitment } from '../../application/entities/Recruitment'
import { StudyType } from '../../application/entities/StudyType'
import { Title } from '../../application/entities/Title'
import { RecruitmentStatus } from '../../application/RecruitmentStatus'
import { ClinicalTrialModel } from '../model/ClinicalTrialModel'

describe('clinical trial file repository', () => {
  it('should retrieve one clinical trial', async () => {
    // GIVEN
    const clinicalTrialFile = {
      contact: {
        public_queries: {
          address: '',
          city: '',
          country: '',
          email: '',
          firstname: '',
          lastname: '',
          name: '',
          organization: '',
          siret: '',
          telephone: '',
          zip: '',
        },
        scientific_queries: {
          address: '',
          city: '',
          country: '',
          email: '',
          firstname: '',
          lastname: '',
          name: '',
          organization: '',
          siret: '',
          telephone: '',
          zip: '',
        },
      },
      last_revision_date: '',
      medical_condition: '',
      medical_condition_meddra: [],
      primary_sponsor: {
        address: '',
        city: '',
        country: '',
        email: '',
        firstname: '',
        lastname: '',
        name: '',
        organization: '',
        siret: '',
        telephone: '',
        zip: '',
      },
      public_title: { acronym: '', value: '' },
      recruitment: {
        ages_range: [],
        ages_range_secondary_identifiers: [],
        genders: [],
        status: 'UNAVAILABLE',
        target_number: 0,
      },
      scientific_title: { acronym: '', value: '' },
      secondaries_trial_numbers: {},
      study_type: { phase: '', study_design: '', study_type: '' },
      therapeutic_areas: [],
      trial_sites: [
        {
          address: '',
          city: '',
          country: '',
          email: '',
          firstname: '',
          lastname: '',
          name: '',
          organization: '',
          siret: '',
          telephone: '',
          zip: '',
        },
      ],
      universal_trial_number: '',
      uuid: '1',
    }

    const repository = await createRepository([clinicalTrialFile as ClinicalTrialModel])

    // WHEN
    const clinicalTrial = repository.findOne('1')

    // THEN
    expect(clinicalTrial).toStrictEqual(new ClinicalTrial(
      '',
      {},
      new Title('', ''),
      new Title('', ''),
      new Recruitment(
        RecruitmentStatus.UNAVAILABLE,
        [],
        [],
        [],
        0
      ),
      new StudyType(
        '',
        '',
        ''
      ),
      '',
      new Contact(
        new ContactDetails('', '', '', '', '', '', '', '', '', '', ''),
        new ContactDetails('', '', '', '', '', '', '', '', '', '', '')
      ),
      '',
      [],
      [],
      new ContactDetails('', '', '', '', '', '', '', '', '', '', ''),
      [new ContactDetails('', '', '', '', '', '', '', '', '', '', '')]
    ))
  })

  it('should return a 404 error if no clinical trial exist', async () => {
    // GIVEN
    const unknownUuid = '0fc962d4-705f-4c7f-9fe1-6ecbfc58187d'
    const clinicalTrialModel = ClinicalTrialModelTestingFactory.create()
    const repository = await createRepository([clinicalTrialModel])

    try {
      // WHEN
      repository.findOne(unknownUuid)
      throw new Error('Should not be triggered')
    } catch (error) {
      // THEN
      expect(error).toBeInstanceOf(NotFoundException)
    }
  })
})

async function createRepository(clinicalTrialsModel: ClinicalTrialModel[]) {
  jest.spyOn(Date, 'now').mockReturnValue(1643566484898)

  const module: TestingModule = await Test.createTestingModule({
    providers: [
      {
        provide: ClinicalTrialFileRepository,
        useFactory: () => {
          return new ClinicalTrialFileRepository(clinicalTrialsModel)
        },
      },
    ],
  }).compile()

  return module.get<ClinicalTrialFileRepository>(ClinicalTrialFileRepository)
}
