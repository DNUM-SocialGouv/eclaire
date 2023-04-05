import { Title } from './Title'

export class ClinicalTrial {
  constructor(
    readonly uuid: string,
    readonly public_title: Title,
    readonly scientific_title: Title
  ) {}
}
