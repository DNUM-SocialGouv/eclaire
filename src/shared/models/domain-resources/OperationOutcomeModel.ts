import { OperationOutcome } from 'fhir/r4'

export class OperationOutcomeModel {
  static create(diagnostics: string): OperationOutcome {
    return {
      issue: [
        {
          code: 'processing',
          diagnostics,
          severity: 'error',
        },
      ],
      resourceType: 'OperationOutcome',
    }
  }
}
