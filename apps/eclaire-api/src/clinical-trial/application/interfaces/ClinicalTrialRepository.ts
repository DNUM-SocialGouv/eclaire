import { ClinicalTrial } from '../entities/ClinicalTrial'

export interface ClinicalTrialRepository {
  findOne(uuid: string): ClinicalTrial
}
