import { Test, TestingModule } from '@nestjs/testing'

import { RecruitmentStatus } from '../../../application/RecruitmentStatus'
import { ClinicalTrialModel } from '../../model/ClinicalTrialModel'
import { RecruitmentModel } from '../../model/RecruitmentModel'
import { StudyTypeModel } from '../../model/StudyTypeModel'
import { TitleModel } from '../../model/TitleModel'
import { ClinicalTrialFileRepository } from '../clinical-trial-file.repository'

export class ClinicalTrialModelTestingFactory {
  private static clincialTrialModel = new ClinicalTrialModel(
    '123',
    new TitleModel('', ''),
    new TitleModel('', ''),
    new RecruitmentModel({
      genders: '',
      status: 'UNAVAILABLE' as RecruitmentStatus,
    }),
    new StudyTypeModel('', '', ''),
    ''

  )

  static create(overridedFields?: Partial<ClinicalTrialModel>): ClinicalTrialModel {
    return {
      ...this.clincialTrialModel,
      ...overridedFields,
    }
  }

  static async createRepository(clinicalTrialsModel: ClinicalTrialModel[]) {
    jest.spyOn(Date, 'now').mockReturnValue(1643566484898)

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ClinicalTrialFileRepository,
          useFactory: () => {
            return new ClinicalTrialFileRepository(clinicalTrialsModel)
          },
        },
      ],
    }).compile()

    return module.get<ClinicalTrialFileRepository>(ClinicalTrialFileRepository)
  }
}
