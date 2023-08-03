import { ContactPoint, Period } from 'fhir/r4'

export class ContactPointModel implements ContactPoint {
  constructor(
    readonly id: string | undefined,
    readonly period: Period | undefined,
    readonly rank: number | undefined,
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

  static createPhone(phone: string): ContactPointModel {
    return new ContactPointModel(
      undefined,
      undefined,
      undefined,
      'phone',
      'work',
      phone
    )
  }

  static createEmail(email: string): ContactPointModel {
    return new ContactPointModel(
      undefined,
      undefined,
      undefined,
      'email',
      'work',
      email
    )
  }

  static createUrl(url: string) {
    return new ContactPointModel(
      undefined,
      undefined,
      undefined,
      'url',
      'work',
      url
    )
  }
}
