export class NotFoundClinicalTrialError extends Error {
  constructor() {
    super('Aucun essai clinique n’a été trouvé')
  }
}
