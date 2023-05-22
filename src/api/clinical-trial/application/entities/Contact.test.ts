import { Contact } from './Contact'
import { ContactDetails } from './ContactDetails'

describe('contact', () => {
  it('should have a specific list of attribute set for public and scientific query', () => {
    // WHEN
    const contact = new Contact(
      new ContactDetails('', '', '', '', '', '', '', '', '', '', '', '', ''),
      new ContactDetails('', '', '', '', '', '', '', '', '', '', '', '', '')
    )

    // THEN
    expect(contact.public_query).toBeInstanceOf(ContactDetails)
    expect(contact.scientific_query).toBeInstanceOf(ContactDetails)
  })
})
