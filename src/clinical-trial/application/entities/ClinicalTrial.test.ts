import { ClinicalTrial } from './ClinicalTrial'
import { StudyType } from './StudyType'
import { Title } from './Title'
import { RecruitmentStatus } from '../RecruitmentStatus'

describe('clinical trial', () => {
  it('should instantiate default values', () => {
    // GIVEN
    jest.spyOn(Date, 'now').mockReturnValue(1643566484898)

    // WHEN
    const clinicalTrial = new ClinicalTrial()

    // THEN
    expect(clinicalTrial).toStrictEqual(new ClinicalTrial({
      last_revision_date: '',
      public_title: new Title(),
      recruitment_status: RecruitmentStatus.UNAVAILABLE,
      scientific_title: new Title(),
      study_type: new StudyType(),
    }))
  })
})
