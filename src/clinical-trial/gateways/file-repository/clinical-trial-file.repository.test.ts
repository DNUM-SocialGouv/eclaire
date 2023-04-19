import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'

import { ClinicalTrialFileRepository } from './clinical-trial-file.repository'
import { ClinicalTrialModelTestingFactory } from './clinical-trial-model-testing-factory'
import { ClinicalTrial } from '../../application/entities/ClinicalTrial'
import { Contact } from '../../application/entities/Contact'
import { ContactDetails } from '../../application/entities/ContactDetails'
import { Recruitment } from '../../application/entities/Recruitment'
import { StudyType } from '../../application/entities/StudyType'
import { TherapeuticArea } from '../../application/entities/TherapeuticArea'
import { Title } from '../../application/entities/Title'
import { Gender } from '../../application/Gender'
import { PrimaryAge } from '../../application/PrimaryAge'
import { RecruitmentStatus } from '../../application/RecruitmentStatus'
import { SecondaryAge } from '../../application/SecondaryAge'
import { ClinicalTrialModel } from '../model/ClinicalTrialModel'
import { ContactDetailsModel } from '../model/ContactDetailsModel'
import { ContactModel } from '../model/ContactModel'
import { RecruitmentModel } from '../model/RecruitmentModel'
import { StudyTypeModel } from '../model/StudyTypeModel'
import { TherapeuticAreaModel } from '../model/TherapeuticAreaModel'
import { TitleModel } from '../model/TitleModel'

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
    const recruitmentModel = new RecruitmentModel(
      'RECRUITING',
      ['MALE'],
      ['IN_UTERO', 'SIXTY_FIVE_PLUS_YEARS'],
      ['PRETERM_NEWBORN', 'EIGHTY_FIVE_PLUS_YEARS'],
      400
    )
    const studyTypeModel = new StudyTypeModel(
      'Human Pharmacology (Phase I)- First administration to humans',
      '',
      ''
    )
    const lastRevisionDateModel = new Date().toString()
    const universalTrialNumberModel = 'NCT51265816'
    const secondariesTrialNumbersModel = {
      AFR_number:  'AFRXXXXXXXX',
      national_number: '2011-006209-83',
    }
    const medicalCondition = 'Cancer des poumons'
    const medicalConditionMedDRA = ['10060929', '10072818']
    const therapeuticAreas = [new TherapeuticAreaModel('Circulatory and Respiratory Physiological Phenomena', 'G')]

    const contactModel = new ContactModel(
      new ContactDetailsModel(
        'Institut Bergognié',
        'Antoine',
        'Italiano',
        '5 avenue de l’opera',
        'bordeaux',
        'France',
        '33076',
        '01 23 45 67 89 ',
        'aitaliona@example',
        'Ministère de la santé',
        '552 178 639 00132'
      ),
      new ContactDetailsModel(
        'John Doe',
        'John',
        'Doe',
        '123 rue de la cabosse',
        'Saint-François-sur-Seine',
        'France',
        '01234',
        '(+33)1 23 45 67 89',
        'johndoe@ministere.com',
        'Ministère de la Santé',
        ''
      )
    )

    const clinicalTrialModel = ClinicalTrialModelTestingFactory.create({
      contact: contactModel,
      last_revision_date: lastRevisionDateModel,
      medical_condition: medicalCondition,
      medical_condition_meddra: medicalConditionMedDRA,
      public_title: publicTitleModel,
      recruitment: recruitmentModel,
      scientific_title: scientificTitleModel,
      secondaries_trial_numbers: secondariesTrialNumbersModel,
      study_type: studyTypeModel,
      therapeutic_areas: therapeuticAreas,
      universal_trial_number: universalTrialNumberModel,
    })
    const repository = await createRepository([clinicalTrialModel])

    // WHEN
    const clinicalTrial = repository.findOne('123')

    // THEN
    expect(clinicalTrial).toStrictEqual(new ClinicalTrial(
      'NCT51265816',
      {
        AFR_number:  'AFRXXXXXXXX',
        national_number: '2011-006209-83',
      },
      new Title(
        'AGADIR',
        'Circuler l’ADN pour améliorer le résultat de l’oncologie Patient. Une étude randomisée'
      ),
      new Title(
        'AGADIR',
        'le meme titre mais en scientifique'
      ),
      new Recruitment(
        RecruitmentStatus.RECRUITING,
        [Gender.MALE],
        [PrimaryAge.IN_UTERO, PrimaryAge.SIXTY_FIVE_PLUS_YEARS],
        [SecondaryAge.PRETERM_NEWBORN, SecondaryAge.EIGHTY_FIVE_PLUS_YEARS],
        400
      ),
      new StudyType(
        'Human Pharmacology (Phase I)- First administration to humans',
        '',
        ''
      ),
      new Date().toString(),
      new Contact(
        new ContactDetails(
          'Institut Bergognié',
          'Antoine',
          'Italiano',
          '5 avenue de l’opera',
          'bordeaux',
          'France',
          '33076',
          '01 23 45 67 89 ',
          'aitaliona@example',
          'Ministère de la santé',
          '552 178 639 00132'
        ),
        new ContactDetails(
          'John Doe',
          'John',
          'Doe',
          '123 rue de la cabosse',
          'Saint-François-sur-Seine',
          'France',
          '01234',
          '(+33)1 23 45 67 89',
          'johndoe@ministere.com',
          'Ministère de la Santé',
          ''
        )
      ),
      'Cancer des poumons',
      ['10060929', '10072818'],
      [new TherapeuticArea('Circulatory and Respiratory Physiological Phenomena', 'G')]
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
