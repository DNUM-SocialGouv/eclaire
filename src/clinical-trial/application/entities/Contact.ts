import { ApiProperty } from '@nestjs/swagger'

import { ContactDetails } from './ContactDetails'

export class Contact {
  constructor(
    public_queries: ContactDetails,
    scientific_queries: ContactDetails
  ) {
    this.public_queries = public_queries
    this.scientific_queries = scientific_queries
  }

  @ApiProperty({ description: 'Regroupe les informations de contact pour les demandes publiques à thématique non scientifique.' })
  readonly public_queries?: ContactDetails

  @ApiProperty({ description: 'Regroupe les informations de contact pour les demandes scientifiques.' })
  readonly scientific_queries?: ContactDetails
}
