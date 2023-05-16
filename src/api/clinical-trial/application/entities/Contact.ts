import { ApiProperty } from '@nestjs/swagger'

import { ContactDetails } from './ContactDetails'

export class Contact {
  constructor(
    public_query: ContactDetails,
    scientific_query: ContactDetails
  ) {
    this.public_query = public_query
    this.scientific_query = scientific_query
  }

  @ApiProperty({ description: 'Regroupe les informations de contact pour les demandes publiques à thématique non scientifique.' })
  readonly public_query: ContactDetails

  @ApiProperty({ description: 'Regroupe les informations de contact pour les demandes scientifiques.' })
  readonly scientific_query: ContactDetails
}
