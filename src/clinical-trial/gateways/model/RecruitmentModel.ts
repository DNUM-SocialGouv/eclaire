import { RecruitmentStatus } from '../../application/RecruitmentStatus'

export class RecruitmentModel {
  constructor(recruitmentModel?: Partial<RecruitmentModel>) {
    if (recruitmentModel) {
      Object.assign(this, recruitmentModel)
    }
  }

  readonly status: string = RecruitmentStatus.UNAVAILABLE
  readonly genders: string = ''
}
