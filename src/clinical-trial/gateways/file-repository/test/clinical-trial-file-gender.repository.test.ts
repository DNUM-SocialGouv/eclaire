import { ClinicalTrialModelTestingFactory } from './clinical-trial-model-testing-factory'
import { ClinicalTrial } from '../../../application/entities/ClinicalTrial'
import { Recruitment } from '../../../application/entities/Recruitment'
import { StudyType } from '../../../application/entities/StudyType'
import { Title } from '../../../application/entities/Title'
import { Gender } from '../../../application/Gender'
import { RecruitmentStatus } from '../../../application/RecruitmentStatus'
import { RecruitmentModel } from '../../model/RecruitmentModel'
import { StudyTypeModel } from '../../model/StudyTypeModel'
import { TitleModel } from '../../model/TitleModel'

describe('clinical trial file repository', () => {
  it.each([
    ['', []],
    ['FEMALE', [Gender.FEMALE]],
    ['MALE', [Gender.MALE]],
    ['FEMALE,MALE', [Gender.FEMALE, Gender.MALE]],
  ])('should retrieve a recruitment gender', async (genderModel: string, genders: Array<Gender>) => {
    // GIVEN
    const publicTitleModel = new TitleModel(
      'AGADIR',
      'Circuler l’ADN pour améliorer le résultat de l’oncologie Patient. Une étude randomisée'
    )
    const scientificTitleModel = new TitleModel(
      'AGADIR',
      'le meme titre mais en scientifique'
    )
    const recruitmentModel = new RecruitmentModel({ genders: genderModel, status: RecruitmentStatus.UNAVAILABLE })
    const studyTypeModel = new StudyTypeModel('Human Pharmacology (Phase I)- First administration to humans', '', '')
    const lastRevisionDateModel = new Date().toString()

    const clinicalTrialModel = ClinicalTrialModelTestingFactory.create({
      last_revision_date: lastRevisionDateModel,
      public_title: publicTitleModel,
      recruitment: recruitmentModel,
      scientific_title: scientificTitleModel,
      study_type: studyTypeModel,
    })
    const repository= await ClinicalTrialModelTestingFactory.createRepository([clinicalTrialModel])

    // WHEN
    const finalClinicalTrial = repository.findOne('123')

    // THEN
    expect(finalClinicalTrial).toStrictEqual(new ClinicalTrial(
      new Title(
        'AGADIR',
        'Circuler l’ADN pour améliorer le résultat de l’oncologie Patient. Une étude randomisée'
      ),
      new Title(
        'AGADIR',
        'le meme titre mais en scientifique'
      ),
      new Recruitment({ genders: genders, status: RecruitmentStatus.UNAVAILABLE }),
      new StudyType('Human Pharmacology (Phase I)- First administration to humans', '', ''),
      new Date().toString()
    ))
  })
})
