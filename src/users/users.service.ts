import { Injectable } from '@nestjs/common'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Request } from 'express'
import { readFileSync } from 'fs'
import * as yaml from 'js-yaml'
import { join } from 'path'

import { User } from './user'

const USERS_CONFIG_PATH = join(__dirname, '../../config/users.yaml')

@Injectable()
export class UsersService {
  private users: User[] = []

  constructor() {
    this.loadUsers()
  }

  private loadUsers() {
    const accountsConfig = yaml.load(
      readFileSync(USERS_CONFIG_PATH, 'utf8')
    ) as { accounts: [Record<string, string>] }

    accountsConfig.accounts.forEach((user) => {
      this.users.push(new User(user))
    })
  }

  findOne(email: string): User | undefined {
    return this.users.find((user) => user.email === email)
  }

  getFromRequest(request: Request): User | undefined {
    return new User(request.user)
  }
}
