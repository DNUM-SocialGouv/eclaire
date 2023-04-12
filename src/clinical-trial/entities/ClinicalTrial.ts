import { RecruitmentStatus } from './RecruitmentStatus'
import { Title } from './Title'

export class ClinicalTrial {
  constructor(
    readonly public_title: Title,
    readonly scientific_title: Title,
    readonly recruitment_status: RecruitmentStatus
  ) {}
}
