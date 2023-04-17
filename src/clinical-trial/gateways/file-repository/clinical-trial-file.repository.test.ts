import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'

import { ClinicalTrialFileRepository } from './clinical-trial-file.repository'
import { ClinicalTrialModelTestingFactory } from './clinical-trial-model-testing-factory'
import { ClinicalTrial } from '../../application/entities/ClinicalTrial'
import { StudyType } from '../../application/entities/StudyType'
import { Title } from '../../application/entities/Title'
import { RecruitmentStatus } from '../../application/RecruitmentStatus'
import { ClinicalTrialModel } from '../model/ClinicalTrialModel'

describe('clinical trial file repository', () => {
  it('should retrieve one clinical trial', async () => {
    // GIVEN
    const publicTitle = new Title(
      'AGADIR',
      'Circuler l’ADN pour améliorer le résultat de l’oncologie Patient. Une étude randomisée'
    )
    const scientificTitle = new Title(
      'AGADIR',
      'le meme titre mais en scientifique'
    )
    const recruitmentStatus = RecruitmentStatus.RECRUITING
    const studyType = new StudyType('Human Pharmacology (Phase I)- First administration to humans', '', '')
    const lastRevisionDate = new Date().toString()

    const clinicalTrialModel = ClinicalTrialModelTestingFactory.create({
      last_revision_date: lastRevisionDate,
      public_title: publicTitle,
      recruitment_status: recruitmentStatus,
      scientific_title: scientificTitle,
      study_type: studyType,
    })
    const repository = await createRepository([clinicalTrialModel])

    // WHEN
    const clinicalTrial = repository.findOne('123')

    // THEN
    expect(clinicalTrial).toStrictEqual(new ClinicalTrial(
      publicTitle,
      scientificTitle,
      recruitmentStatus,
      studyType,
      lastRevisionDate
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
