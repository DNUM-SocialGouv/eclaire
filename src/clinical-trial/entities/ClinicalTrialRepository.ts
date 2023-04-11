import { ClinicalTrial } from './ClinicalTrial'

export interface ClinicalTrialRepository {
  findOne(uuid: string): ClinicalTrial
}
