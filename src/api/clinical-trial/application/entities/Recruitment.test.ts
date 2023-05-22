import { Criteria } from './Criteria'
import { Recruitment } from './Recruitment'

describe('recruitment', () => {
  it('should have a recruitment', () => {
    // WHEN
    const recruitment = new Recruitment(
      'en cours',
      '2022-02-06T18:25:43.511Z',
      ['homme'],
      ['0-17 ans', '65 ans et +'],
      ['85 ans et +'],
      400,
      new Criteria('', '', ''),
      new Criteria('', '', ''),
      'patient',
      ['pregnant women']
    )

    // THEN
    expect(recruitment.status).toBe('en cours')
    expect(recruitment.date_recruiting_status).toBe('2022-02-06T18:25:43.511Z')
    expect(recruitment.genders).toStrictEqual(['homme'])
    expect(recruitment.ages_range).toStrictEqual(['0-17 ans', '65 ans et +'])
    expect(recruitment.ages_range_secondary_identifiers).toStrictEqual(['85 ans et +'])
    expect(recruitment.target_number).toBe(400)
    expect(recruitment.exclusion_criteria).toBeInstanceOf(Criteria)
    expect(recruitment.inclusion_criteria).toBeInstanceOf(Criteria)
    expect(recruitment.clinical_trial_group).toBe('patient')
    expect(recruitment.vulnerable_population).toStrictEqual(['pregnant women'])
  })
})
