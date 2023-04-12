import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'

import { DbClinicalTrialRepository } from './clinical-trial.repository'
import { ClinicalTrial } from './entities/ClinicalTrial'
import { RecruitmentStatus } from './entities/RecruitmentStatus'
import { Title } from './entities/Title'
import { ClinicalTrialModel } from './model/ClinicalTrialModel'
import { ClinicalTrialModelTestingFactory } from './model/ClinicalTrialModelTestingFactory'
import { TitleModel } from './model/TitleModel'

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
    const clinicalTrial = new ClinicalTrial(
      new Title(
        'Resist, scotty, core!',
        'RSC'
      ),
      new Title(
        'Try draining rhubarb fritters flavored with bourbon.',
        'RSC'
      ),
      RecruitmentStatus.RECRUITING
    )
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
    const clinicalTrial = new ClinicalTrial(
      new Title(
        'Resist, scotty, core!',
        'RSC'
      ),
      new Title(
        'Try draining rhubarb fritters flavored with bourbon.',
        'RSC'
      ),
      recruitmentStatus
    )
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
