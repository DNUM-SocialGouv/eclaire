import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'

import { DbClinicalTrialRepository } from './clinical-trial.repository'
import { ClinicalTrial } from './entities/ClinicalTrial'
import { Title } from './entities/Title'
import { ClinicalTrialModel } from './model/ClinicalTrialModel'
import { TitleModel } from './model/TitleModel'

describe('clinical trial service', () => {
  it('should retrieve one clinical trial', async () => {
    // GIVEN
    const service = await createService()
    const clinicalTrial = new ClinicalTrial(
      new Title(
        'Resist, scotty, core!',
        'RSC'
      ),
      new Title(
        'Try draining rhubarb fritters flavored with bourbon.',
        'RSC'
      )
    )

    // WHEN
    const expectedClinicalTrial = service.findOne('123')

    // THEN
    expect(expectedClinicalTrial).toStrictEqual(clinicalTrial)
  })

  it('should return a 404 error if no clinical trial exist', async () => {
    // GIVEN
    const service = await createService()
    const unknownUuid = '9'

    try {
      // WHEN
      service.findOne(unknownUuid)
      throw new Error('Should not be triggered')
    } catch (error) {
      // THEN
      expect(error).toBeInstanceOf(NotFoundException)
    }
  })
})

async function createService() {
  const clinicalTrialsModel = [
    new ClinicalTrialModel({
      public_title: new TitleModel({
        acronym: 'RSC',
        value: 'Resist, scotty, core!',
      }),
      scientific_title: new TitleModel({
        acronym: 'RSC',
        value: 'Try draining rhubarb fritters flavored with bourbon.',
      }),
      uuid: '123',
    }),
  ]

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
