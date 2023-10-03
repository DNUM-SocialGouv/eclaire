import { AssignerForSecondaryIdentifier } from '../special-purpose-data-types/ReferenceModel'

export class ModelUtils {
  static UNAVAILABLE = 'INDISPONIBLE'
  static EMPTY_ARRAY_IN_SOURCE: Array<never> = []

  static undefinedIfNull(value: string): string {
    return value ?? undefined
  }

  static isNotNull(value: unknown): boolean {
    return value !== null
  }

  static generateEnrollmentGroupId(value: string): string {
    return this.generateIdWithSuffix(value, 'enrollment-group')
  }

  static generatePrimarySponsorOrganizationId(value: string): string {
    return this.generateIdWithSuffix(value, 'primary-sponsor')
  }

  static generateSecondarySponsorOrganizationId(value: string): string {
    return this.generateIdWithSuffix(value, 'secondary-sponsor')
  }

  static generateSiteId(value: string): string {
    return this.generateIdWithSuffix(value, 'site')
  }

  static generateIdWithSuffix(value: string, suffix: string): string {
    return `${value}-${suffix}`
  }

  static identifyAssigner(regulationCode: string, qualification?: string): AssignerForSecondaryIdentifier {
    enum REGULATION_CODES {
      CTIS = 'REG536',
      DM = 'REG745',
      DMDIV = 'REG746',
      JARDE = 'JARDE',
    }

    switch (regulationCode) {
      case REGULATION_CODES.CTIS:
        return AssignerForSecondaryIdentifier.CTIS
      case REGULATION_CODES.DM:
      case REGULATION_CODES.DMDIV:
      case REGULATION_CODES.JARDE:
        return qualification === 'Catégorie 1'
          ? AssignerForSecondaryIdentifier.EUDRACT
          : AssignerForSecondaryIdentifier.ANSM
      default:
        throw new Error('A regulation is always given. So, the assigner cannot be unknown')
    }
  }

  static getMostRecentIsoDate(datesOfHistory: string, datesOfApproval: string): string {
    if (datesOfHistory === undefined && datesOfApproval === undefined) return new Date().toISOString()

    const dates: string[] = []
    if (datesOfHistory !== undefined) {
      datesOfHistory.split(', ').forEach((dateOfHistory) => {
        const date = dateOfHistory.split(':')

        dates.push(date[0])
      })
    }

    if (datesOfApproval !== undefined) {
      datesOfApproval.split(', ').forEach((dateOfApproval) => {
        const date = dateOfApproval.split(':')

        dates.push(date[1])
      })
    }

    const mostRecentDate = new Date([...dates].sort(this.sortBy)[0])
    return mostRecentDate.toISOString()
  }

  private static sortBy = (valueA: string, valueB: string) => {
    return valueB < valueA ? -1 : 1
  }
}
