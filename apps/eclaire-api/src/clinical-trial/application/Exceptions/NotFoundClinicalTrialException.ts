export class NotFoundClinicalTrialException extends Error {
  constructor() {
    super('Aucun essai clinique n’a été trouvé')
  }
}
