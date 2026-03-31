import { OperationOutcome } from 'fhir/r4'

export class OperationOutcomeModel {
  static create(diagnostics: string, text?:string): OperationOutcome {
    /* eslint-disable sort-keys */
    return {
      resourceType: 'OperationOutcome',
      text: {
        status: 'generated',
        div: `<div xmlns="http://www.w3.org/1999/xhtml">${text ? text : diagnostics}</div>`,
      },
      issue: [
        {
          severity: 'error',
          code: 'not-found',
          diagnostics,
        },
      ],
    }
    /* eslint-enable sort-keys */
  }
}
