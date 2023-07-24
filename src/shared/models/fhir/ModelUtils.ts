export class
ModelUtils {
  static UNAVAILABLE = 'INDISPONIBLE'

  static emptyIfNull(value: string): string {
    return value ?? ''
  }

  static emptyNumberIfNull(value: number): number {
    return value ?? -1
  }
}
