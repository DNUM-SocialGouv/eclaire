import { decode } from 'he'

import { AssignerForPrimaryIdentifier } from '../special-purpose-data-types/ReferenceModel'

export class ModelUtils {
  static UNAVAILABLE = 'INDISPONIBLE'
  static EMPTY_ARRAY_IN_SOURCE: Array<never> = []

  static decodeHtmlString(text: string = ''): string {
    if (typeof text !== 'string') return text

    let decoded = decode(text.trim())

    // If it still contains HTML entities, decode again
    if (/&[#A-Za-z0-9]+;/.test(decoded)) {
      decoded = decode(decoded)
    }

    return decoded
  }

  static undefinedIfNull(value: string): string {
    return value ?? undefined
  }

  static isNotNull(value: unknown): boolean {
    return value !== null
  }

  static isNotDefinedOrFalse(value: unknown): boolean {
    return value === undefined || value === null || value === false
  }

  static generateEnrollmentGroupId(value: string): string {
    return this.generateIdWithSuffix(value, 'enrollment-group')
  }

  static generatePrimarySponsorOrganizationId(value: string): string {
    return this.generateIdWithSuffix(value, 'primary-sponsor')
  }

  static generateSiteId(value: string): string {
    return this.generateIdWithSuffix(value, 'site')
  }

  static generateIdWithSuffix(value: string, suffix: string): string {
    return `${value}-${suffix}`
  }

  static identifyAssigner(regulationCode: string, qualification?: string): AssignerForPrimaryIdentifier {
    enum REGULATION_CODES {
      CTIS = 'REG536',
      DM = 'REG745',
      DMDIV = 'REG746',
      JARDE = 'JARDE',
    }

    switch (regulationCode) {
      case REGULATION_CODES.CTIS:
        return AssignerForPrimaryIdentifier.CTIS
      case REGULATION_CODES.JARDE:
        return AssignerForPrimaryIdentifier.ANSM
      case REGULATION_CODES.DM:
      case REGULATION_CODES.DMDIV:
        return qualification === 'Catégorie 1'
          ? AssignerForPrimaryIdentifier.EUDRACT
          : AssignerForPrimaryIdentifier.ANSM
      default:
        throw new Error('A regulation is always given. So, the assigner cannot be unknown')
    }
  }

  static getMostRecentIsoDate(datesOfHistory: string, datesOfApproval: string, theoreticalDateOfApproval: string): string {
    if (datesOfHistory === undefined && datesOfApproval === undefined) return new Date(theoreticalDateOfApproval).toISOString()

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

    const sortedDates = [...dates].sort(this.sortBy)
    const mostRecentRaw = sortedDates[0]
    const mostRecentDate = new Date(mostRecentRaw)
    // Check if date is valid
    if (isNaN(mostRecentDate.getTime())) {
      return new Date(theoreticalDateOfApproval).toISOString()
    }

    return mostRecentDate.toISOString()
  }

  static getDateOfYesterdayInIsoFormatAndWithoutTime(): string {
    const date: Date = new Date()
    const yesterdayDate = date.getDate() - 1
    date.setDate(yesterdayDate)
    return this.convertDateToIsoFormatWithoutTime(date)
  }

  static convertDateToIsoFormatWithoutTime(date: Date): string {
    return date.toISOString().split('T')[0]
  }

  private static sortBy = (valueA: string, valueB: string) => {
    return valueB < valueA ? -1 : 1
  }
}
