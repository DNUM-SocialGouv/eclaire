import { Test, TestingModule } from '@nestjs/testing'

import { User } from './user'
import { UsersService } from './users.service'

describe('users service', () => {
  let service: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({ providers: [UsersService] }).compile()

    service = module.get<UsersService>(UsersService)
  })

  it('should retrieve one user', () => {
    // WHEN
    const user = service.findOne('antoine.buzaud@octo.com')

    // THEN
    expect(user).toStrictEqual(
      new User({
        email: 'antoine.buzaud@octo.com',
        firstname: 'Antoine',
        id: 1,
        lastname: 'Buzaud',
        password: '$argon2id$v=19$m=65536,t=3,p=4$0dIK8qRTj8BfMFfTjJardA$WvhnKQQVNNMm4vaHADgXksCbhlOUz6GS8ua91zbegKc',
        roles: ['admin'],
      })
    )
  })

  it('should not retrieve one user', () => {
    // WHEN
    const user = service.findOne('fake@octo.com')

    // THEN
    expect(user).toBeUndefined()
  })

  it('should retrieve a user from a request', () => {
    // GIVEN
    const request = {
      user: {
        email: 'antoine.buzaud@octo.com',
        firstname: 'Antoine',
        id: 1,
        lastname: 'Buzaud',
        password: '$argon2id$v=19$m=65536,t=3,p=4$0dIK8qRTj8BfMFfTjJardA$WvhnKQQVNNMm4vaHADgXksCbhlOUz6GS8ua91zbegKc',
        roles: ['admin'],
      },
    }

    // WHEN
    // @ts-ignore
    const user = service.getFromRequest(request)

    // THEN
    expect(user).toStrictEqual(
      new User({
        email: 'antoine.buzaud@octo.com',
        firstname: 'Antoine',
        id: 1,
        lastname: 'Buzaud',
        password: '$argon2id$v=19$m=65536,t=3,p=4$0dIK8qRTj8BfMFfTjJardA$WvhnKQQVNNMm4vaHADgXksCbhlOUz6GS8ua91zbegKc',
        roles: ['admin'],
      })
    )
  })
})
