export class ModelUtils {
  static UNAVAILABLE = 'INDISPONIBLE'

  static emptyIfNull(value: string): string {
    return value ?? ''
  }

  static emptyNumberIfNull(value: number): number {
    return value ?? -1
  }

  static generateEnrollmentGroupId(value: string): string {
    return `${value}-enrollment-group-id`
  }

  static generatePrimarySponsorOrganizationId(value: string) {
    return `${value}-primary-sponsor`
  }
}
