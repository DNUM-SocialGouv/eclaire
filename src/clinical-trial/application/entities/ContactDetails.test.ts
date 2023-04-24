import { ContactDetails } from './ContactDetails'

describe('contact details', () => {
  it('should have a contact details', () => {
    // WHEN
    const contactDetails = new ContactDetails(
      'John Doe',
      'John',
      'Doe',
      '123 rue de la cabosse',
      'Saint-François-sur-Seine',
      'France',
      '01234',
      '(+33)1 23 45 67 89',
      'johndoe@example.com',
      'Ministère de la Santé',
      '748 320 708 00024'
    )

    // THEN
    expect(contactDetails.name).toBe('John Doe')
    expect(contactDetails.firstname).toBe('John')
    expect(contactDetails.lastname).toBe('Doe')
    expect(contactDetails.address).toBe('123 rue de la cabosse')
    expect(contactDetails.city).toBe('Saint-François-sur-Seine')
    expect(contactDetails.country).toBe('France')
    expect(contactDetails.zip).toBe('01234')
    expect(contactDetails.telephone).toBe('(+33)1 23 45 67 89')
    expect(contactDetails.email).toBe('johndoe@example.com')
    expect(contactDetails.organization).toBe('Ministère de la Santé')
    expect(contactDetails.siret).toBe('748 320 708 00024')
  })
})
