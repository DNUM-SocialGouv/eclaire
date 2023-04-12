import { StudyType } from './StudyType'
import { Title } from './Title'
import { RecruitmentStatus } from '../enum/RecruitmentStatus.enum'

export class ClinicalTrial {
  constructor(
    readonly public_title: Title,
    readonly scientific_title: Title,
    readonly recruitment_status: RecruitmentStatus,
    readonly study_type: StudyType
  ) {}
}
