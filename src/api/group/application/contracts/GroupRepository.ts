import { Group } from 'fhir/r4'

export interface GroupRepository {
  find(id: string): Promise<Group>
}
