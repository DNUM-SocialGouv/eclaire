import { ClinicalTrial } from './ClinicalTrial'
import { Contact } from './Contact'
import { ContactDetails } from './ContactDetails'
import { Criteria } from './Criteria'
import { Recruitment } from './Recruitment'
import { StudyType } from './StudyType'
import { TherapeuticArea } from './TherapeuticArea'
import { Title } from './Title'

describe('clinical trial', () => {
  it('should have a clinical trial', () => {
    // GIVEN
    jest.spyOn(Date, 'now').mockReturnValue(1643566484898)
    const publicTitle = new Title('', '')
    const scientificTitle = new Title('', '')
    const recruitment = new Recruitment('en cours', '', [], [], [], 0, new Criteria('', '', ''), new Criteria('', '', ''), '', [])
    const studyType = new StudyType('', '', '', '')
    const lastRevisionDate = new Date().toString()
    const updatedAt = new Date().toString()
    const universalTrialNumber = 'NTC5492179625'
    const secondariesTrialNumbers = {
      AFR_number: 'AFRXXXXXXXX',
      national_number: '2011-006209-83',
    }
    const contact = new Contact(
      new ContactDetails('', '', '', '', '', '', '', '', '', '', '', '', ''),
      new ContactDetails('', '', '', '', '', '', '', '', '', '', '', '', '')
    )
    const primarySponsor = new ContactDetails('', '', '', '', '', '', '', '', '', '', '', '', '')
    const medicalCondition = 'Cancer des poumons'
    const medicalConditionMeddra = ['10060929', '10072818']
    const therapeuticAreas = [new TherapeuticArea('', '')]
    const trialSites = [new ContactDetails('', '', '', '', '', '', '', '', '', '', '', '', '')]
    const summary = 'Le contexte des cette étude est le suivant, les gens addicts aux dragibus.'

    // WHEN
    const clinicalTrial = createClinicalTrial({
      contact: contact,
      last_revision_date: lastRevisionDate,
      medical_condition: medicalCondition,
      medical_condition_meddra: medicalConditionMeddra,
      primary_sponsor: primarySponsor,
      public_title: publicTitle,
      recruitment: recruitment,
      scientific_title: scientificTitle,
      secondaries_trial_numbers: secondariesTrialNumbers,
      study_type: studyType,
      summary: summary,
      therapeutic_areas: therapeuticAreas,
      trial_sites: trialSites,
      universal_trial_number: universalTrialNumber,
      updated_at: updatedAt,
    })

    // THEN
    expect(clinicalTrial.universal_trial_number).toBe(universalTrialNumber)
    expect(clinicalTrial.secondaries_trial_numbers).toBe(secondariesTrialNumbers)
    expect(clinicalTrial.public_title).toBeInstanceOf(Title)
    expect(clinicalTrial.scientific_title).toBeInstanceOf(Title)
    expect(clinicalTrial.recruitment).toBeInstanceOf(Recruitment)
    expect(clinicalTrial.study_type).toBeInstanceOf(StudyType)
    expect(clinicalTrial.last_revision_date).toBe(new Date().toString())
    expect(clinicalTrial.updated_at).toBe(new Date().toString())
    expect(clinicalTrial.contact).toBeInstanceOf(Contact)
    expect(clinicalTrial.medical_condition).toBe('Cancer des poumons')
    expect(clinicalTrial.medical_condition_meddra).toStrictEqual(['10060929', '10072818'])
    expect(clinicalTrial.primary_sponsor).toBeInstanceOf(ContactDetails)
    expect(clinicalTrial.trial_sites[0]).toBeInstanceOf(ContactDetails)
    expect(clinicalTrial.summary).toBe('Le contexte des cette étude est le suivant, les gens addicts aux dragibus.')

  })
})

function createClinicalTrial(partial: Partial<ClinicalTrial>): ClinicalTrial {
  const universalTrialNumber = partial.universal_trial_number ?? ''
  const secondariesTrialNumbers = partial.secondaries_trial_numbers ?? {}
  const publicTitle = partial.public_title ?? new Title('', '')
  const scientificTitle = partial.scientific_title ?? new Title('', '')
  const studyType = partial.study_type ?? new StudyType('', '', '', '')
  const lastRevisionDate = partial.last_revision_date ?? new Date().toString()
  const updatedAt = partial.updated_at ?? new Date().toString()
  const recruitment = partial.recruitment ?? new Recruitment('en cours', '', [], [], [], 0, new Criteria('', '', ''), new Criteria('', '', ''), '', [])
  const contact = partial.contact ?? new Contact(
    new ContactDetails('', '', '', '', '', '', '', '', '', '', '', '', ''),
    new ContactDetails('', '', '', '', '', '', '', '', '', '', '', '', '')
  )
  const medicalCondition = partial.medical_condition ?? ''
  const medicalConditionMeddra: Array<string> = partial.medical_condition_meddra ?? []
  const therapeuticAreas: Array<TherapeuticArea> = partial.therapeutic_areas ?? []
  const primarySponsor = partial.primary_sponsor ?? new ContactDetails('', '', '', '', '', '', '', '', '', '', '', '', '')
  const trialSites = partial.trial_sites ?? [new ContactDetails('', '', '', '', '', '', '', '', '', '', '', '', '')]
  const summary = partial.summary ?? ''

  return new ClinicalTrial(
    universalTrialNumber,
    secondariesTrialNumbers,
    publicTitle,
    scientificTitle,
    recruitment,
    studyType,
    lastRevisionDate,
    updatedAt,
    contact,
    medicalCondition,
    medicalConditionMeddra,
    therapeuticAreas,
    primarySponsor,
    trialSites,
    summary
  )
}
