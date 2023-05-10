import { ApiProperty } from '@nestjs/swagger'

export class ContactDetails {
  constructor(
    name: string,
    firstname: string,
    lastname: string,
    address: string,
    city: string,
    country: string,
    zip: string,
    telephone: string,
    email: string,
    organization: string,
    organization_id: string,
    title: string,
    department: string
  ) {
    this.name = name
    this.firstname = firstname
    this.lastname = lastname
    this.address = address
    this.city = city
    this.country = country
    this.zip = zip
    this.telephone = telephone
    this.email = email
    this.organization = organization
    this.organization_id = organization_id
    this.title = title
    this.department = department
  }

  @ApiProperty({ description: 'Le nom du contact.', example: 'John Fitzgerald Doe' })
  readonly name: string

  @ApiProperty({ description: 'Le prénom du contact.', example: 'John' })
  readonly firstname: string

  @ApiProperty({ description: 'Le nom de famille du contact.', example: 'Doe' })
  readonly lastname: string

  @ApiProperty({ description: 'L’adresse du contact.', example: '123 rue de France' })
  readonly address: string

  @ApiProperty({ description: 'La ville du contact.', example: 'Paris' })
  readonly city: string

  @ApiProperty({ description: 'Le pays du contact.', example: 'France' })
  readonly country: string

  @ApiProperty({ description: 'Le code postal du contact.', example: '75001' })
  readonly zip: string

  @ApiProperty({ description: 'Le téléphone du contact.', example: '(+33)1 23 45 67 89' })
  readonly telephone: string

  @ApiProperty({ description: 'L’email du contact.', example: 'john@doe.com' })
  readonly email: string

  @ApiProperty({ description: 'L’organisme que le contact représente.', example: 'Ministère de la santé' })
  readonly organization: string

  @ApiProperty({
    description: 'Numéro d’identification de l’organisation.',
    example: '2040',
  })
  readonly organization_id: string

  @ApiProperty({
    description: 'Titre du contact dans l’organisaton. ',
    example: '552 178 639 00132',
  })
  readonly title: string

  @ApiProperty({
    description: 'Service du contact dans l’organisaton.',
    example: 'laboratorium',
  })
  readonly department: string
}
