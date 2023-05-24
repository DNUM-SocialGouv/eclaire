export class NotFoundClinicalTrialError extends Error {
  constructor(id: string) {
    super(`L’essai clinique ${id} n’a pas été trouvé`)
  }
}
