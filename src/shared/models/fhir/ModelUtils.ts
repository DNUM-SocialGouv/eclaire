export class ModelUtils {
  static UNAVAILABLE = 'INDISPONIBLE'

  static emptyIfNull(value: string): string {
    return value === null ? '' : value
  }

  static emptyNumberIfNull(value: number): number {
    return value === null ? -1 : value
  }
}
