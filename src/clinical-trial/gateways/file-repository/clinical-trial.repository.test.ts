import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'

import { ClinicalTrialModelTestingFactory } from './clinical-trial-model-testing-factory'
import { DbClinicalTrialRepository } from './clinical-trial.repository'
import { ClinicalTrial } from '../../application/entities/ClinicalTrial'
import { StudyType } from '../../application/entities/StudyType'
import { Title } from '../../application/entities/Title'
import { Phase } from '../../application/Phase'
import { RecruitmentStatus } from '../../application/RecruitmentStatus'
import { ClinicalTrialModel } from '../model/ClinicalTrialModel'
import { StudyTypeModel } from '../model/StudyTypeModel'
import { TitleModel } from '../model/TitleModel'

describe('clinical trial repository', () => {
  it('should retrieve one clinical trial with a public title and a scientific title', async () => {
    // GIVEN
    const clinicalTrialModel = ClinicalTrialModelTestingFactory.create({
      public_title: new TitleModel({
        acronym: 'RSC',
        value: 'Resist, scotty, core!',
      }),
      scientific_title: new TitleModel({
        acronym: 'RSC',
        value: 'Try draining rhubarb fritters flavored with bourbon.',
      }),
    })
    const repository = await createRepository([clinicalTrialModel])

    // WHEN
    const expectedClinicalTrial = repository.findOne('123')

    // THEN
    const clinicalTrial = new ClinicalTrial({
      public_title: new Title({
        acronym: 'RSC',
        value: 'Resist, scotty, core!',
      }),
      recruitment_status: RecruitmentStatus.RECRUITING,
      scientific_title: new Title({
        acronym: 'RSC',
        value: 'Try draining rhubarb fritters flavored with bourbon.',
      }),
      study_type: new StudyType(),
    })
    expect(expectedClinicalTrial).toStrictEqual(clinicalTrial)
  })

  it.each(
    [
      ['RECRUITING', RecruitmentStatus.RECRUITING],
      ['SCHEDULED', RecruitmentStatus.SCHEDULED],
      ['COMPLETED', RecruitmentStatus.COMPLETED],
      ['UNAVAILABLE', RecruitmentStatus.UNAVAILABLE],
      ['PENDING', RecruitmentStatus.PENDING],
      ['SUSPENDED', RecruitmentStatus.SUSPENDED],
    ]
  )('should retrieve one clinical trial with a %s status', async (recruitmentStatusModel, recruitmentStatus) => {
    // GIVEN
    const clinicalTrialModel = ClinicalTrialModelTestingFactory.create({ recruitment_status: recruitmentStatusModel })
    const repository = await createRepository([clinicalTrialModel])

    // WHEN
    const expectedClinicalTrial = repository.findOne('123')

    // THEN
    const clinicalTrial = new ClinicalTrial({
      public_title: new Title({
        acronym: 'RSC',
        value: 'Resist, scotty, core!',
      }),
      recruitment_status: recruitmentStatus,
      scientific_title: new Title({
        acronym: 'RSC',
        value: 'Try draining rhubarb fritters flavored with bourbon.',
      }),
      study_type: new StudyType(),
    })
    expect(expectedClinicalTrial).toStrictEqual(clinicalTrial)
  })

  it('should retrieve a Phase I', async () => {
    // GIVEN
    const clinicalTrialModel = ClinicalTrialModelTestingFactory.create({ study_type: new StudyTypeModel({ phase: Phase.PHASE_1_a }) })
    const repository = await createRepository([clinicalTrialModel])

    // WHEN
    const expectedClinicalTrial = repository.findOne('123')

    // THEN
    const clinicalTrial = new ClinicalTrial({
      public_title: new Title({ acronym: 'RSC', value: 'Resist, scotty, core!' }),
      recruitment_status: RecruitmentStatus.RECRUITING,
      scientific_title: new Title({ acronym: 'RSC', value: 'Try draining rhubarb fritters flavored with bourbon.' }),
      study_type: new StudyType({ phase: 'Human Pharmacology (Phase I)- First administration to humans' }),
    })

    expect(expectedClinicalTrial).toStrictEqual(clinicalTrial)
  })

  it('should retrieve an Phase II/PhaseIII', async () => {
    // GIVEN
    const clinicalTrialModel = ClinicalTrialModelTestingFactory.create({ study_type: new StudyType({ phase: Phase.PHASE_2_3 }) })
    const repository = await createRepository([clinicalTrialModel])

    // WHEN
    const expectedClinicalTrial = repository.findOne('123')

    // THEN
    const clinicalTrial = new ClinicalTrial({
      public_title: new Title({ acronym: 'RSC', value: 'Resist, scotty, core!' }),
      recruitment_status: RecruitmentStatus.RECRUITING,
      scientific_title: new Title({ acronym: 'RSC', value: 'Try draining rhubarb fritters flavored with bourbon.' }),
      study_type: new StudyType({ phase: 'Phase II and Phase III (Integrated)' }),
    })

    expect(expectedClinicalTrial).toStrictEqual(clinicalTrial)
  })

  it('should retrieve a empty phase', async () => {
    // GIVEN
    const clinicalTrialModel = ClinicalTrialModelTestingFactory.create({ study_type: new StudyType() })
    const repository = await createRepository([clinicalTrialModel])

    // WHEN
    const expectedClinicalTrial = repository.findOne('123')

    // THEN
    const clinicalTrial = new ClinicalTrial({
      public_title: new Title({ acronym: 'RSC', value: 'Resist, scotty, core!' }),
      recruitment_status: RecruitmentStatus.RECRUITING,
      scientific_title: new Title({ acronym: 'RSC', value: 'Try draining rhubarb fritters flavored with bourbon.' }),
      study_type: new StudyType({}),
    })

    expect(expectedClinicalTrial).toStrictEqual(clinicalTrial)
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
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      {
        provide: DbClinicalTrialRepository,
        useFactory: () => {
          return new DbClinicalTrialRepository(clinicalTrialsModel)
        },
      },
    ],
  }).compile()

  return module.get<DbClinicalTrialRepository>(DbClinicalTrialRepository)
}
