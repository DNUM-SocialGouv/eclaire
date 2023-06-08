import { ClinicalTrialFactory } from './ClinicalTrialFactory'
import { ClinicalTrialModelTestingFactory } from './ClinicalTrialModelTestingFactory'
import { ClinicalTrial } from '../application/entities/ClinicalTrial'
import { Contact } from '../application/entities/Contact'
import { ContactDetails } from '../application/entities/ContactDetails'
import { Criteria } from '../application/entities/Criteria'
import { Recruitment } from '../application/entities/Recruitment'
import { StudyType } from '../application/entities/StudyType'
import { TherapeuticArea } from '../application/entities/TherapeuticArea'
import { Title } from '../application/entities/Title'

describe('clinical trial factory', () => {
  it('should have a clinical trial', () => {
    // GIVEN
    const clinicalTrialModel = ClinicalTrialModelTestingFactory.create()

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
        'en cours',
        '2022-02-06T18:25:43.511Z',
        ['homme'],
        ['0-17 ans', '65 ans et +'],
        ['85 ans et +'],
        400,
        new Criteria('1', 'femme porteuse d’un cancer du sein stade terminal', 'women with breast cancer terminal phase'),
        new Criteria('1', 'femme porteuse d’un cancer du sein stade benin', 'women with only a benine breast cancer'),
        'patient',
        ['pregnant women']
      ),
      new StudyType(
        'Human Pharmacology (Phase I)- First administration to humans',
        'JARDE',
        'Cur compater cadunt?',
        'Catégorie 1'
      ),
      '2020-02-06T18:25:43.511Z',
      '2020-02-06T18:25:43.511Z',
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
      'Le contexte des cette étude est le suivant, les gens addicts aux dragibus.'
    ))
  })
})
