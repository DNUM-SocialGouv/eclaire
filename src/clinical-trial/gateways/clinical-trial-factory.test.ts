import { ClinicalTrialFactory } from './clinical-trial-factory'
import { ClinicalTrialModel } from './model/ClinicalTrialModel'
import { ContactDetailsModel } from './model/ContactDetailsModel'
import { ContactModel } from './model/ContactModel'
import { CriteriaModel } from './model/CriteriaModel'
import { RecruitmentModel } from './model/RecruitmentModel'
import { StudyTypeModel } from './model/StudyTypeModel'
import { TherapeuticAreaModel } from './model/TherapeuticAreaModel'
import { TitleModel } from './model/TitleModel'
import { ClinicalTrial } from '../application/entities/ClinicalTrial'
import { Contact } from '../application/entities/Contact'
import { ContactDetails } from '../application/entities/ContactDetails'
import { Criteria } from '../application/entities/Criteria'
import { Recruitment } from '../application/entities/Recruitment'
import { StudyType } from '../application/entities/StudyType'
import { TherapeuticArea } from '../application/entities/TherapeuticArea'
import { Title } from '../application/entities/Title'
import { Gender } from '../application/Gender'
import { PrimaryAge } from '../application/PrimaryAge'
import { RecruitmentStatus } from '../application/RecruitmentStatus'
import { SecondaryAge } from '../application/SecondaryAge'

describe('clinical trial factory', () => {
  it('should have a clinical trial', () => {
    // GIVEN
    jest.spyOn(Date, 'now').mockReturnValue(1643566484898)
    const clinicalTrialModel = new ClinicalTrialModel(
      '123',
      'NCT51265816',
      {
        AFR_number: 'AFRXXXXXXXX',
        national_number: '2011-006209-83',
      },
      new TitleModel(
        'AGADIR',
        'Circuler l’ADN pour améliorer le résultat de l’oncologie Patient. Une étude randomisée'
      ),
      new TitleModel(
        'AGADIR',
        'le meme titre mais en scientifique'
      ),
      new RecruitmentModel(
        'RECRUITING',
        '2022-02-06T18:25:43.511Z',
        ['MALE'],
        ['IN_UTERO', 'SIXTY_FIVE_PLUS_YEARS'],
        ['PRETERM_NEWBORN', 'EIGHTY_FIVE_PLUS_YEARS'],
        400,
        new CriteriaModel('1', 'femme porteuse d’un cancer du sein stade terminal', 'women with breast cancer terminal phase'),
        new CriteriaModel('1', 'femme porteuse d’un cancer du sein stade benin', 'women with only a benine breast cancer'),
        'patient',
        'pregnant women'
      ),
      new StudyTypeModel(
        'Human Pharmacology (Phase I)- First administration to humans',
        'Cum bromium mori, omnes nixuses captis noster, teres mortemes.',
        'Cur compater cadunt?'
      ),
      new Date().toString(),
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
      'Le contexte des cette étude est le suivant, les gens addicts aux dragibus.',
      'Recherche impliquant la personne humaine',
      'Catégorie 1'
    )

    // WHEN
    const clinicalTrial = ClinicalTrialFactory.create(clinicalTrialModel)

    // THEN
    expect(clinicalTrial).toStrictEqual(new ClinicalTrial(
      'NCT51265816',
      {
        AFR_number: 'AFRXXXXXXXX',
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
        '2022-02-06T18:25:43.511Z',
        [Gender.MALE],
        [PrimaryAge.IN_UTERO, PrimaryAge.SIXTY_FIVE_PLUS_YEARS],
        [SecondaryAge.PRETERM_NEWBORN, SecondaryAge.EIGHTY_FIVE_PLUS_YEARS],
        400,
        new Criteria('1', 'femme porteuse d’un cancer du sein stade terminal', 'women with breast cancer terminal phase'),
        new Criteria('1', 'femme porteuse d’un cancer du sein stade benin', 'women with only a benine breast cancer'),
        'patient',
        'pregnant women'
      ),
      new StudyType(
        'Human Pharmacology (Phase I)- First administration to humans',
        'Cum bromium mori, omnes nixuses captis noster, teres mortemes.',
        'Cur compater cadunt?'
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
          '01 23 45 67 89',
          'aitaliona@example',
          'Ministère de la santé',
          '2039',
          'Agent de Santé',
          'Administration'
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
          'johndoe@example.com',
          'Ministère de la Santé',
          '2040',
          'Agent de Santé',
          'Laboratoire'
        )
      ),
      'Cancer des poumons',
      ['10060929', '10072818'],
      [new TherapeuticArea('Circulatory and Respiratory Physiological Phenomena', 'G')],
      new ContactDetails(
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
        new ContactDetails(
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
      'Le contexte des cette étude est le suivant, les gens addicts aux dragibus.',
      'Recherche impliquant la personne humaine',
      'Catégorie 1'
    ))
  })
})