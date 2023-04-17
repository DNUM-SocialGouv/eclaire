import { ClinicalTrial } from './ClinicalTrial'
import { Recruitment } from './Recruitment'
import { StudyType } from './StudyType'
import { Title } from './Title'
import { Gender } from '../Gender'
import { RecruitmentStatus } from '../RecruitmentStatus'

describe('clinical trial', () => {
  it('should build a clinical trial', () => {
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
    const recruitment = new Recruitment(RecruitmentStatus.RECRUITING, [Gender.MALE])
    const studyType = new StudyType('Human Pharmacology (Phase I)- First administration to humans', '', '')
    const lastRevisionDate = new Date().toString()

    // WHEN
    const clinicalTrial = new ClinicalTrial(
      publicTitle,
      scientificTitle,
      recruitment,
      studyType,
      lastRevisionDate
    )

    // THEN
    expect(clinicalTrial.public_title.acronym).toBe('AGADIR')
    expect(clinicalTrial.public_title.value).toBe('Circuler l’ADN pour améliorer le résultat de l’oncologie Patient. Une étude randomisée')
    expect(clinicalTrial.scientific_title.acronym).toBe('AGADIR')
    expect(clinicalTrial.scientific_title.value).toBe('le meme titre mais en scientifique')
    expect(clinicalTrial.recruitment.genders).toStrictEqual([Gender.MALE])
    expect(clinicalTrial.recruitment.status).toBe(RecruitmentStatus.RECRUITING)
    expect(clinicalTrial.study_type.phase).toBe('Human Pharmacology (Phase I)- First administration to humans')
    expect(clinicalTrial.study_type.study_design).toBe('')
    expect(clinicalTrial.study_type.study_type).toBe('')
    expect(clinicalTrial.last_revision_date).toBe(lastRevisionDate)
  })

  it.each(
    [
      [RecruitmentStatus.SCHEDULED],
      [RecruitmentStatus.COMPLETED],
      [RecruitmentStatus.UNAVAILABLE],
      [RecruitmentStatus.PENDING],
      [RecruitmentStatus.SUSPENDED],
    ]
  )('should build a clinical trial with a %s status', (recruitmentStatus: RecruitmentStatus) => {
    // GIVEN
    jest.spyOn(Date, 'now').mockReturnValue(1643566484898)
    const publicTitle = new Title('', '')
    const scientificTitle = new Title('', '')
    const studyType = new StudyType('', '', '')
    const lastRevisionDate = new Date().toString()
    const recruitment = new Recruitment(recruitmentStatus, [])

    // WHEN
    const clinicalTrial = new ClinicalTrial(
      publicTitle,
      scientificTitle,
      recruitment,
      studyType,
      lastRevisionDate
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
  )('should build a clinical trial with a %s gender', (genders: Array<Gender>) => {
    // GIVEN
    jest.spyOn(Date, 'now').mockReturnValue(1643566484898)
    const publicTitle = new Title('', '')
    const scientificTitle = new Title('', '')
    const studyType = new StudyType('', '', '')
    const lastRevisionDate = new Date().toString()
    const recruitment = new Recruitment('', genders)

    // WHEN
    const clinicalTrial = new ClinicalTrial(
      publicTitle,
      scientificTitle,
      recruitment,
      studyType,
      lastRevisionDate
    )

    // THEN
    expect(clinicalTrial.recruitment.genders).toStrictEqual(recruitment.genders)
  })
})
