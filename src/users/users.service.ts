import { Injectable } from '@nestjs/common'
import { readFileSync } from 'fs'
import * as yaml from 'js-yaml'
import { join } from 'path'

import { User } from './user'

const USERS_CONFIG_PATH = join(__dirname, '../../config/users.yaml')

@Injectable()
export class UsersService {
  private users: Partial<User>[] = []

  constructor() {
    this.loadUsers()
  }

  //Todo: Migrate this in configuration.ts
  private loadUsers(): void {
    const accountsConfig = yaml.load(
      readFileSync(USERS_CONFIG_PATH, 'utf8')
    ) as Record<string, string>

    if (
      Array.isArray(accountsConfig.accounts) &&
      accountsConfig.accounts.length
    ) {
      accountsConfig.accounts.forEach((user: Partial<User>) => {
        this.users.push(new User(user))
      })
    }
  }

  findAll(): object {
    return this.users
  }

  findOne(email: string): Partial<User> | undefined {
    return this.users.find((user: Partial<User>) => user.email === email)
  }
}
