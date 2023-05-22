import { ClinicalTrial } from '../entities/ClinicalTrial'

export interface ClinicalTrialRepository {
  findOne(id: string): Promise<ClinicalTrial>
}
