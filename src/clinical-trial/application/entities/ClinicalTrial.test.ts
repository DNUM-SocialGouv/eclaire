import { ClinicalTrial } from './ClinicalTrial'
import { StudyType } from './StudyType'
import { Title } from './Title'
import { RecruitmentStatus } from '../RecruitmentStatus'

describe('clinical trial entity testing', () => {
  it('should instantiate default values', () => {
    // WHEN
    const clinicalTrial = new ClinicalTrial()

    // THEN
    expect(clinicalTrial).toStrictEqual(new ClinicalTrial({
      public_title: new Title(),
      recruitment_status: RecruitmentStatus.UNAVAILABLE,
      scientific_title: new Title(),
      study_type: new StudyType(),
    }))
  })
})
