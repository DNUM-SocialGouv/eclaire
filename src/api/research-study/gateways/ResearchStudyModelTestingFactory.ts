import { ClinicalTrialModel } from '../../../shared/models/ClinicalTrialModel'
import { ContactDetailsModel } from '../../../shared/models/ContactDetailsModel'
import { ContactModel } from '../../../shared/models/ContactModel'
import { CriteriaModel } from '../../../shared/models/CriteriaModel'
import { RecruitmentModel } from '../../../shared/models/RecruitmentModel'
import { StudyTypeModel } from '../../../shared/models/StudyTypeModel'
import { TherapeuticAreaModel } from '../../../shared/models/TherapeuticAreaModel'
import { TitleModel } from '../../../shared/models/TitleModel'

export class ResearchStudyModelTestingFactory {
  private static readonly researchStudyModel = new ClinicalTrialModel(
    'NCT51265816',
    {
      AFR_number: 'AFRXXXXXXXX',
      national_number: '2011-006209-83',
    },
    new TitleModel('AGADIR', 'Circuler l’ADN pour améliorer le résultat de l’oncologie Patient. Une étude randomisée'),
    new TitleModel('AGADIR', 'le meme titre mais en scientifique'),
    new RecruitmentModel(
      'en cours',
      '06/02/2022',
      ['homme'],
      ['0-17 ans', '65 ans et +'],
      ['85 ans et +'],
      400,
      new CriteriaModel('1', 'femme porteuse d’un cancer du sein stade terminal', 'women with breast cancer terminal phase'),
      new CriteriaModel('1', 'femme porteuse d’un cancer du sein stade benin', 'women with only a benine breast cancer'),
      'patient',
      ['pregnant women']
    ),
    new StudyTypeModel(
      'Human Pharmacology (Phase I)- First administration to humans',
      'JARDE',
      'Cur compater cadunt?',
      'Catégorie 1'
    ),
    '06/02/2020',
    '06/02/2020',
    new ContactModel(
      new ContactDetailsModel(
        'Institut Bergognié',
        'Antoine',
        'Italiano',
        '5 avenue de l’opera',
        'bordeaux',
        'France',
        '33076',
        '01 23 45 67 89',
        'aitaliona@example',
        'Ministère de la santé',
        '2039',
        'Agent de Santé',
        'Administration'
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
        'johndoe@example.com',
        'Ministère de la Santé',
        '2040',
        'Agent de Santé',
        'Laboratoire'
      )
    ),
    'Cancer des poumons',
    ['10060929', '10072818'],
    [new TherapeuticAreaModel('Circulatory and Respiratory Physiological Phenomena', 'G')],
    new ContactDetailsModel(
      'Urbss ridetis!',
      'Flavum uria recte experientias byssus est.',
      'Pol.',
      '123 You have to lure, and absorb silence by your flying.',
      'Ubi est talis contencio?',
      'Domesticus, primus lamias hic desiderium de dexter, germanus mensa.',
      '01234',
      '(+33)5 89 65 47 12',
      'johndoe@example.com',
      'Ministère de la Santé',
      '2039',
      'Agent de Santé',
      'Laboratoire'
    ),
    [
      new ContactDetailsModel(
        'Urbss ridetis!',
        'Flavum uria recte experientias byssus est.',
        'Pol.',
        '123 You have to lure, and absorb silence by your flying.',
        'Ubi est talis contencio?',
        'Domesticus, primus lamias hic desiderium de dexter, germanus mensa.',
        '01234',
        '(+33)5 89 65 47 12',
        'johndoe@example.com',
        'Ministère de la Santé',
        '2040',
        'Agent de Santé',
        'Laboratoire'
      ),
    ],
    'Le contexte des cette étude est le suivant, les gens addicts aux dragibus.'
  )

  static create(overridedFields?: Partial<ClinicalTrialModel>): ClinicalTrialModel {
    return {
      ...this.researchStudyModel,
      ...overridedFields,
    }
  }
}
