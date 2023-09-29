export interface OrganizationRepository {
  find(id: string): Promise<unknown>
}
