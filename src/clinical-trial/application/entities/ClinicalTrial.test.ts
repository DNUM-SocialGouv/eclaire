import { ClinicalTrial } from './ClinicalTrial'
import { Contact } from './Contact'
import { ContactDetails } from './ContactDetails'
import { Recruitment } from './Recruitment'
import { StudyType } from './StudyType'
import { TherapeuticArea } from './TherapeuticArea'
import { Title } from './Title'
import { Gender } from '../Gender'
import { PrimaryAge } from '../PrimaryAge'
import { RecruitmentStatus } from '../RecruitmentStatus'
import { SecondaryAge } from '../SecondaryAge'

describe('clinical trial', () => {
  it('should have a clinical trial', () => {
    // GIVEN
    jest.spyOn(Date, 'now').mockReturnValue(1643566484898)
    const publicTitle = new Title(
      'AGADIR',
      'Circuler l’ADN pour améliorer le résultat de l’oncologie Patient. Une étude randomisée'
    )
    const scientificTitle = new Title(
      'AGADIR',
      'le meme titre mais en scientifique'
    )
    const recruitment = new Recruitment(
      RecruitmentStatus.RECRUITING,
      [Gender.MALE],
      [PrimaryAge.IN_UTERO, PrimaryAge.SIXTY_FIVE_PLUS_YEARS],
      [SecondaryAge.PRETERM_NEWBORN, SecondaryAge.EIGHTY_FIVE_PLUS_YEARS],
      400
    )
    const studyType = new StudyType(
      'Human Pharmacology (Phase I)- First administration to humans',
      '',
      ''
    )
    const lastRevisionDate = new Date().toString()
    const universalTrialNumber = 'NTC5492179625'
    const secondariesTrialNumbers = {
      AFR_number: 'AFRXXXXXXXX',
      national_number: '2011-006209-83',
    }
    const contact = new Contact(
      new ContactDetails('', '', '', '', '', '', '', '', '', '', '', '', '', ''),
      new ContactDetails('', '', '', '', '', '', '', '', '', '', '', '', '', '')
    )
    const primarySponsor = new ContactDetails('', '', '', '', '', '', '', '', '', '', '', '', '', '')
    const medicalCondition = 'Cancer des poumons'
    const medicalConditionMeddra = ['10060929', '10072818']
    const therapeuticAreas = [new TherapeuticArea('', '')]
    const trialSites = [new ContactDetails('', '', '', '', '', '', '', '', '', '', '', '', '', '')]
    const summary = 'Le contexte des cette étude est le suivant, les gens addicts aux dragibus.'

    // WHEN
    const clinicalTrial = new ClinicalTrial(
      universalTrialNumber,
      secondariesTrialNumbers,
      publicTitle,
      scientificTitle,
      recruitment,
      studyType,
      lastRevisionDate,
      contact,
      medicalCondition,
      medicalConditionMeddra,
      therapeuticAreas,
      primarySponsor,
      trialSites,
      summary
    )

    // THEN
    expect(clinicalTrial.universal_trial_number).toBe(universalTrialNumber)
    expect(clinicalTrial.secondaries_trial_numbers).toBe(secondariesTrialNumbers)
    expect(clinicalTrial.public_title.acronym).toBe('AGADIR')
    expect(clinicalTrial.public_title.value).toBe('Circuler l’ADN pour améliorer le résultat de l’oncologie Patient. Une étude randomisée')
    expect(clinicalTrial.scientific_title.acronym).toBe('AGADIR')
    expect(clinicalTrial.scientific_title.value).toBe('le meme titre mais en scientifique')
    expect(clinicalTrial.recruitment.genders).toStrictEqual([Gender.MALE])
    expect(clinicalTrial.recruitment.status).toBe(RecruitmentStatus.RECRUITING)
    expect(clinicalTrial.recruitment.ages_range).toStrictEqual(['IN_UTERO', '65_PLUS_YEARS'])
    expect(clinicalTrial.recruitment.ages_range_secondary_identifiers).toStrictEqual(['PRETERM_NEWBORN', '85_PLUS_YEARS'])
    expect(clinicalTrial.recruitment.target_number).toBe(400)
    expect(clinicalTrial.study_type.phase).toBe('Human Pharmacology (Phase I)- First administration to humans')
    expect(clinicalTrial.study_type.study_design).toBe('')
    expect(clinicalTrial.study_type.study_type).toBe('')
    expect(clinicalTrial.last_revision_date).toBe(new Date().toString())
    expect(clinicalTrial.contact).toBeInstanceOf(Contact)
    expect(clinicalTrial.medical_condition).toBe('Cancer des poumons')
    expect(clinicalTrial.medical_condition_meddra).toStrictEqual(['10060929', '10072818'])
    expect(clinicalTrial.primary_sponsor).toBeInstanceOf(ContactDetails)
    expect(clinicalTrial.trial_sites[0]).toBeInstanceOf(ContactDetails)
    expect(clinicalTrial.summary).toBe('Le contexte des cette étude est le suivant, les gens addicts aux dragibus.')
  })

  it.each(
    [
      [RecruitmentStatus.SCHEDULED],
      [RecruitmentStatus.COMPLETED],
      [RecruitmentStatus.UNAVAILABLE],
      [RecruitmentStatus.PENDING],
      [RecruitmentStatus.SUSPENDED],
    ]
  )('should have a clinical trial with a %s status', (recruitmentStatus: RecruitmentStatus) => {
    // GIVEN
    jest.spyOn(Date, 'now').mockReturnValue(1643566484898)
    const publicTitle = new Title('', '')
    const scientificTitle = new Title('', '')
    const studyType = new StudyType('', '', '')
    const lastRevisionDate = new Date().toString()
    const recruitment = new Recruitment(recruitmentStatus, [], [], [], 0)
    const universalTrialNumber = ''
    const secondariesTrialNumbers = {}
    const contact = new Contact(
      new ContactDetails('', '', '', '', '', '', '', '', '', '', '', '', '', ''),
      new ContactDetails('', '', '', '', '', '', '', '', '', '', '', '', '', '')
    )
    const medicalCondition = ''
    const medicalConditionMeddra: Array<string> = []
    const therapeuticAreas: Array<TherapeuticArea> = []
    const primarySponsor = new ContactDetails('', '', '', '', '', '', '', '', '', '', '', '', '', '')
    const trialSites = [new ContactDetails('', '', '', '', '', '', '', '', '', '', '', '', '', '')]
    const summary = ''

    // WHEN
    const clinicalTrial = new ClinicalTrial(
      universalTrialNumber,
      secondariesTrialNumbers,
      publicTitle,
      scientificTitle,
      recruitment,
      studyType,
      lastRevisionDate,
      contact,
      medicalCondition,
      medicalConditionMeddra,
      therapeuticAreas,
      primarySponsor,
      trialSites,
      summary
    )

    // THEN
    expect(clinicalTrial.recruitment.status).toBe(recruitment.status)
  })

  it.each(
    [
      [[Gender.MALE]],
      [[Gender.FEMALE]],
      [[Gender.MALE, Gender.FEMALE]],
      [[]],
    ]
  )('should have a clinical trial with a %s gender', (genders: Array<Gender>) => {
    // GIVEN
    jest.spyOn(Date, 'now').mockReturnValue(1643566484898)
    const universalTrialNumber = ''
    const secondariesTrialNumbers = {}
    const publicTitle = new Title('', '')
    const scientificTitle = new Title('', '')
    const studyType = new StudyType('', '', '')
    const lastRevisionDate = new Date().toString()
    const recruitment = new Recruitment('', genders, [], [], 0)
    const contact = new Contact(
      new ContactDetails('', '', '', '', '', '', '', '', '', '', '', '', '', ''),
      new ContactDetails('', '', '', '', '', '', '', '', '', '', '', '', '', '')
    )
    const medicalCondition = ''
    const medicalConditionMeddra: Array<string> = []
    const therapeuticAreas: Array<TherapeuticArea> = []
    const primarySponsor = new ContactDetails('', '', '', '', '', '', '', '', '', '', '', '', '', '')
    const trialSites = [new ContactDetails('', '', '', '', '', '', '', '', '', '', '', '', '', '')]
    const summary = ''

    // WHEN
    const clinicalTrial = new ClinicalTrial(
      universalTrialNumber,
      secondariesTrialNumbers,
      publicTitle,
      scientificTitle,
      recruitment,
      studyType,
      lastRevisionDate,
      contact,
      medicalCondition,
      medicalConditionMeddra,
      therapeuticAreas,
      primarySponsor,
      trialSites,
      summary
    )

    // THEN
    expect(clinicalTrial.recruitment.genders).toStrictEqual(recruitment.genders)
  })
})
