import { Criteria } from './Criteria'
import { Recruitment } from './Recruitment'
import { Gender } from '../Gender'
import { PrimaryAge } from '../PrimaryAge'
import { RecruitmentStatus } from '../RecruitmentStatus'
import { SecondaryAge } from '../SecondaryAge'

describe('recruitment', () => {
  it('should have a recruitment', () => {
    // WHEN
    const recruitment = new Recruitment(
      RecruitmentStatus.RECRUITING,
      [Gender.MALE],
      [PrimaryAge.IN_UTERO, PrimaryAge.SIXTY_FIVE_PLUS_YEARS],
      [SecondaryAge.PRETERM_NEWBORN, SecondaryAge.EIGHTY_FIVE_PLUS_YEARS],
      400,
      new Criteria('', '', ''),
      new Criteria('', '', ''),
      'patient',
      'pregnant women'
    )

    // THEN
    expect(recruitment.genders).toStrictEqual([Gender.MALE])
    expect(recruitment.status).toBe(RecruitmentStatus.RECRUITING)
    expect(recruitment.ages_range).toStrictEqual(['IN_UTERO', '65_PLUS_YEARS'])
    expect(recruitment.ages_range_secondary_identifiers).toStrictEqual(['PRETERM_NEWBORN', '85_PLUS_YEARS'])
    expect(recruitment.target_number).toBe(400)
    expect(recruitment.exclusion_criteria).toBeInstanceOf(Criteria)
    expect(recruitment.inclusion_criteria).toBeInstanceOf(Criteria)
    expect(recruitment.clinical_trial_group).toBe('patient')
    expect(recruitment.vulnerable_population).toBe('pregnant women')
  })
})
