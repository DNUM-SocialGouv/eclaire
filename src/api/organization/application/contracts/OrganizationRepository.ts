export interface OrganizationRepository {
  findOne(id: string): Promise<unknown>
}
