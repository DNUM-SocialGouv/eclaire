import { Title } from './Title'

export class ClinicalTrial {
  constructor(
    readonly public_title: Title,
    readonly scientific_title: Title
  ) {}
}
