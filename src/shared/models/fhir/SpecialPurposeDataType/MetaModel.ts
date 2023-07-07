import { Coding, Meta } from 'fhir/r4'

export class MetaModel implements Meta {
  constructor(
    readonly id: string | undefined,
    readonly lastUpdated: string | undefined,
    readonly profile: string[] | undefined,
    readonly security: Coding[] | undefined,
    readonly source: string | undefined,
    readonly tag: Coding[] | undefined,
    readonly versionId: string | undefined
  ) {}

  static createWithMostRecentDateWithoutTime(
    historique: string,
    dates_avis_favorable_ms_mns: string
  ) {
    return new MetaModel(
      undefined,
      this.getMostRecentDateWithoutTime(historique, dates_avis_favorable_ms_mns),
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    )
  }

  private static getMostRecentDateWithoutTime(datesOfHistory: string, datesOfApproval: string): string {
    if (datesOfHistory === '' && datesOfApproval === '') return ''

    const sortBy = (a: string, b: string) => {
      const valueA = a
      const valueB = b

      return valueB < valueA ? -1 : valueB > valueA ? 1 : 0
    }
    const dates: string[] = []
    if (datesOfHistory !== '') {
      datesOfHistory.split(', ').forEach((dateOfHistory) => {
        const date = dateOfHistory.split(':')

        dates.push(date[0])
      })
    }

    if (datesOfApproval !== '') {
      datesOfApproval.split(', ').forEach((dateOfApproval) => {
        const date = dateOfApproval.split(':')

        dates.push(date[1])
      })
    }

    const mostRecentDate = new Date(dates.sort(sortBy)[0])
    return mostRecentDate.toISOString().split('T')[0]
  }
}
