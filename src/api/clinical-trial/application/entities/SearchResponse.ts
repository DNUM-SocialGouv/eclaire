import { ClinicalTrial } from './ClinicalTrial'

export class SearchResponse {
  readonly hits: ClinicalTrial[]
  readonly total: number
}
