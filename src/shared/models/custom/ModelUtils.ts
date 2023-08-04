import { AssignerForSecondaryIdentifier } from '../fhir/SpecialPurposeDataType/ReferenceModel'

export class ModelUtils {
  static UNAVAILABLE = 'INDISPONIBLE'

  static emptyIfNull(value: string): string {
    return value ?? ''
  }

  static emptyNumberIfNull(value: number): number {
    return value ?? undefined
  }

  static generateEnrollmentGroupId(value: string): string {
    return `${value}-enrollment-group-id`
  }

  static generatePrimarySponsorOrganizationId(value: string) {
    return `${value}-primary-sponsor`
  }

  static generateSecondarySponsorOrganizationId(value: string) {
    return `${value}-secondary-sponsor`
  }

  static generateIdWithSuffix(value: string, suffix: string) {
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
}
