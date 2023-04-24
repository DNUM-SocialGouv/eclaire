import { Contact } from './Contact'
import { ContactDetails } from './ContactDetails'

describe('contact', () => {
  it('should have a specific list of attribute set for public and scientific queries', () => {
    // WHEN
    const contact = new Contact(
      new ContactDetails('', '', '', '', '', '', '', '', '', '', ''),
      new ContactDetails('', '', '', '', '', '', '', '', '', '', '')
    )

    // THEN
    expect(contact.public_queries).toBeInstanceOf(ContactDetails)
    expect(contact.scientific_queries).toBeInstanceOf(ContactDetails)
  })
})
