import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'

import { ClinicalTrialFileRepository } from './clinical-trial-file.repository'
import { ClinicalTrialModelTestingFactory } from './clinical-trial-model-testing-factory'
import { ClinicalTrial } from '../../application/entities/ClinicalTrial'
import { StudyType } from '../../application/entities/StudyType'
import { Title } from '../../application/entities/Title'
import { RecruitmentStatus } from '../../application/RecruitmentStatus'
import { ClinicalTrialModel } from '../model/ClinicalTrialModel'
import { StudyTypeModel } from '../model/StudyTypeModel'
import { TitleModel } from '../model/TitleModel'

describe('clinical trial file repository', () => {
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
      last_revision_date: new Date().toString(),
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
      last_revision_date: new Date().toString(),
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

  it('should retrieve a phase', async () => {
    // GIVEN
    const clinicalTrialModel = ClinicalTrialModelTestingFactory.create({ study_type: new StudyTypeModel({ phase: 'Human Pharmacology (Phase I)- First administration to humans' }) })
    const repository = await createRepository([clinicalTrialModel])

    // WHEN
    const expectedClinicalTrial = repository.findOne('123')

    // THEN
    const clinicalTrial = new ClinicalTrial({
      last_revision_date: new Date().toString(),
      public_title: new Title({ acronym: 'RSC', value: 'Resist, scotty, core!' }),
      recruitment_status: RecruitmentStatus.RECRUITING,
      scientific_title: new Title({ acronym: 'RSC', value: 'Try draining rhubarb fritters flavored with bourbon.' }),
      study_type: new StudyType({ phase: 'Human Pharmacology (Phase I)- First administration to humans' }),
    })
    expect(expectedClinicalTrial).toStrictEqual(clinicalTrial)
  })

  it('should retrieve an empty phase', async () => {
    // GIVEN
    const clinicalTrialModel = ClinicalTrialModelTestingFactory.create({ study_type: new StudyType() })
    const repository = await createRepository([clinicalTrialModel])

    // WHEN
    const expectedClinicalTrial = repository.findOne('123')

    // THEN
    const clinicalTrial = new ClinicalTrial({
      last_revision_date: new Date().toString(),
      public_title: new Title({ acronym: 'RSC', value: 'Resist, scotty, core!' }),
      recruitment_status: RecruitmentStatus.RECRUITING,
      scientific_title: new Title({ acronym: 'RSC', value: 'Try draining rhubarb fritters flavored with bourbon.' }),
      study_type: new StudyType({}),
    })

    expect(expectedClinicalTrial).toStrictEqual(clinicalTrial)
  })

  it.each([
    [new Date().toString(), new Date().toString()],
    ['', ''],
  ])('should retrieve a revision date', async (lastRevisionDateModel: string, lastRevisionDate: string) => {
    // GIVEN
    const clinicalTrialModel = ClinicalTrialModelTestingFactory.create({ last_revision_date: lastRevisionDateModel })
    const repository = await createRepository([clinicalTrialModel])

    // WHEN
    const expectedClinicalTrial = repository.findOne('123')

    // THEN
    const clinicalTrial = new ClinicalTrial({
      last_revision_date: lastRevisionDate,
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
