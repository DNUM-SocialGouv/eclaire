import { Location } from 'fhir/r4'

export interface LocationRepository {
  find(id: string): Promise<Location[]>
}
