export class OperationOutcome {
  readonly message: {
    resourceType: string
    issue: [
      {
        severity: string
        code: string
        diagnostics: string
      }
    ]
  }

  constructor(diagnostics: string) {
    this.message = {
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
