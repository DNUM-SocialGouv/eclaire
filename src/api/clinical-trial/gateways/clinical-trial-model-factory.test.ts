import { ClinicalTrialFactory } from './clinical-trial-factory'
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

describe('clinical trial model factory', () => {
  it('should have a clinical trial model', () => {
    // GIVEN
    jest.spyOn(Date, 'now').mockReturnValue(1643566484898)
    const payload = {
      uuid: '123',
      universal_trial_number: 'NCT51265816',
      secondaries_trial_numbers: { AFR_number: 'AFRXXXXXXXX', national_number: '2011-006209-83' },
      public_title: { acronym: 'AGADIR', value: 'Circuler l’ADN pour améliorer le résultat de l’oncologie Patient. Une étude randomisée' },
      scientific_title: {
        acronym: 'AGADIR',
        value: 'le meme titre mais en scientifique',
      },
      recruitment: {
        status: 'RECRUITING',
        date_recruiting_status: '2022-02-06T18:25:43.511Z',
        genders: ['MALE'],
        ages_range: ['IN_UTERO', 'SIXTY_FIVE_PLUS_YEARS'],
        ages_range_secondary_identifiers: ['PRETERM_NEWBORN', 'EIGHTY_FIVE_PLUS_YEARS'],
        target_number: 400,
        exclusion_criteria: { id: '1', value: 'femme porteuse d’un cancer du sein stade terminal', value_language: 'women with breast cancer terminal phase' },
        inclusion_criteria: { id: '1', value: 'femme porteuse d’un cancer du sein stade benin', value_language: 'women with only a benine breast cancer' },
        clinical_trial_group: 'patient',
        vulnerable_population: 'pregnant women',
      },
      study_type: {
        phase: 'Human Pharmacology (Phase I)- First administration to humans',
        study_type: 'Cum bromium mori, omnes nixuses captis noster, teres mortemes.',
        study_design: 'Cur compater cadunt?',
      },
      last_revision_date: new Date().toString(),
      contact: {
        public_query: {
          name: 'Institut Bergognié',
          firstname: 'Antoine',
          lastname: 'Italiano',
          address: '5 avenue de l’opera',
          city: 'bordeaux',
          country: 'France',
          zip: '33076',
          telephone: '01 23 45 67 89',
          email: 'aitaliona@example',
          organization: 'Ministère de la santé',
          organization_id: '2039',
          title: 'Agent de Santé',
          department: 'Administration',
        },
        scientific_query: {
          name: 'John Doe',
          firstname: 'John',
          lastname: 'Doe',
          address: '123 rue de la cabosse',
          city: 'Saint-François-sur-Seine',
          country: 'France',
          zip: '01234',
          telephone: '(+33)1 23 45 67 89',
          email: 'johndoe@example.com',
          organization: 'Ministère de la Santé',
          organization_id: '2040',
          title: 'Agent de Santé',
          department: 'Laboratoire',
        },
      },
      medical_condition: 'Cancer des poumons',
      medical_condition_meddra: ['10060929', '10072818'],
      therapeutic_areas: [{ value: 'Circulatory and Respiratory Physiological Phenomena', code: 'G' }],
      primary_sponsor: {
        name: 'Urbss ridetis!',
        firstname: 'Flavum uria recte experientias byssus est.',
        lastname: 'Pol.',
        address: '123 You have to lure, and absorb silence by your flying.',
        city: 'Ubi est talis contencio?',
        country: 'Domesticus, primus lamias hic desiderium de dexter, germanus mensa.',
        zip: '01234',
        telephone: '(+33)5 89 65 47 12',
        email: 'johndoe@example.com',
        organization: 'Ministère de la Santé',
        organization_id: '2039',
        title: 'Agent de Santé',
        department: 'Laboratoire',
      },
      trial_sites: [
        {
          name: 'Urbss ridetis!',
          firstname: 'Flavum uria recte experientias byssus est.',
          lastname: 'Pol.',
          address: '123 You have to lure, and absorb silence by your flying.',
          city: 'Ubi est talis contencio?',
          country: 'Domesticus, primus lamias hic desiderium de dexter, germanus mensa.',
          zip: '01234',
          telephone: '(+33)5 89 65 47 12',
          email: 'johndoe@example.com',
          organization: 'Ministère de la Santé',
          organization_id: '2040',
          title: 'Agent de Santé',
          department: 'Laboratoire',
        },
      ],
      summary: 'Le contexte des cette étude est le suivant, les gens addicts aux dragibus.',
      clinical_trial_type: 'Recherche impliquant la personne humaine',
      clinical_trial_category: 'Catégorie 1',
    }

    // WHEN
    const clinicalTrial = ClinicalTrialFactory.create(payload)

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
