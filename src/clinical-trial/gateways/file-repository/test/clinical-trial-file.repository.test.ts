import { NotFoundException } from '@nestjs/common'

import { ClinicalTrialModelTestingFactory } from './clinical-trial-model-testing-factory'
import { ClinicalTrial } from '../../../application/entities/ClinicalTrial'
import { Recruitment } from '../../../application/entities/Recruitment'
import { StudyType } from '../../../application/entities/StudyType'
import { Title } from '../../../application/entities/Title'
import { RecruitmentStatus } from '../../../application/RecruitmentStatus'
import { RecruitmentModel } from '../../model/RecruitmentModel'
import { StudyTypeModel } from '../../model/StudyTypeModel'
import { TitleModel } from '../../model/TitleModel'

describe('clinical trial file repository', () => {
  it('should retrieve one clinical trial', async () => {
    // GIVEN
    const publicTitleModel = new TitleModel(
      'AGADIR',
      'Circuler l’ADN pour améliorer le résultat de l’oncologie Patient. Une étude randomisée'
    )
    const scientificTitleModel = new TitleModel(
      'AGADIR',
      'le meme titre mais en scientifique'
    )
    const recruitmentModel = new RecruitmentModel({ status: RecruitmentStatus.RECRUITING })
    const studyTypeModel = new StudyTypeModel('Human Pharmacology (Phase I)- First administration to humans', '', '')
    const lastRevisionDateModel = new Date().toString()

    const clinicalTrialModel = ClinicalTrialModelTestingFactory.create({
      last_revision_date: lastRevisionDateModel,
      public_title: publicTitleModel,
      recruitment: recruitmentModel,
      scientific_title: scientificTitleModel,
      study_type: studyTypeModel,
    })
    const repository = await ClinicalTrialModelTestingFactory.createRepository([clinicalTrialModel])

    // WHEN
    const clinicalTrial = repository.findOne('123')

    // THEN
    expect(clinicalTrial).toStrictEqual(new ClinicalTrial(
      new Title(
        'AGADIR',
        'Circuler l’ADN pour améliorer le résultat de l’oncologie Patient. Une étude randomisée'
      ),
      new Title(
        'AGADIR',
        'le meme titre mais en scientifique'
      ),
      new Recruitment({ status: RecruitmentStatus.RECRUITING }),
      new StudyType('Human Pharmacology (Phase I)- First administration to humans', '', ''),
      new Date().toString()
    ))
  })

  it('should return a 404 error if no clinical trial exist', async () => {
    // GIVEN
    const unknownUuid = '0fc962d4-705f-4c7f-9fe1-6ecbfc58187d'
    const clinicalTrialModel = ClinicalTrialModelTestingFactory.create()
    const repository = await ClinicalTrialModelTestingFactory.createRepository([clinicalTrialModel])

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
