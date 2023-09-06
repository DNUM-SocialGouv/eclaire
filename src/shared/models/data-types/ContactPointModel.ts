import { ContactPoint, Extension } from 'fhir/r4'

import { ExtensionModel } from '../special-purpose-data-types/ExtensionModel'

export class ContactPointModel implements ContactPoint {
  private constructor(
    readonly extension: Extension[] | undefined,
    readonly system:
      | 'phone'
      | 'fax'
      | 'email'
      | 'pager'
      | 'url'
      | 'sms'
      | 'other'
      | undefined,
    readonly use: 'home' | 'work' | 'temp' | 'old' | 'mobile' | undefined,
    readonly value: string | undefined
  ) {}

  static createPhone(phone: string): ContactPoint {
    return new ContactPointModel(
      undefined,
      'phone',
      'work',
      phone
    )
  }

  static createEmail(email: string): ContactPoint {
    return new ContactPointModel(
      undefined,
      'email',
      'work',
      email
    )
  }

  static createUrl(url: string): ContactPoint {
    return new ContactPointModel(
      undefined,
      'url',
      'work',
      url
    )
  }

  static createSiteContactName(firstname: string, name: string, title: string): ContactPoint {
    return new ContactPointModel(
      [ExtensionModel.createEclaireSiteContactName(firstname, name, title)],
      undefined,
      'work',
      undefined
    )
  }
}
