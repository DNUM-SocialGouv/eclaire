import { Injectable } from '@nestjs/common';
import { User } from './user';

import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const USERS_CONFIG_PATH = join(__dirname, '../../config/users.yaml');

@Injectable()
export class UsersService {
  private users = [];

  constructor() {
    this.loadUsers();
  }

  //Todo: Migrate this in configuration.ts
  private loadUsers(): void {
    const accountsConfig = yaml.load(
      readFileSync(USERS_CONFIG_PATH, 'utf8'),
    ) as Record<string, any>;

    if (
      Array.isArray(accountsConfig.accounts) &&
      accountsConfig.accounts.length
    ) {
      accountsConfig.accounts.forEach((user) => {
        this.users.push(new User(user));
      });
    }
  }

  findAll(): object {
    return this.users;
  }

  findOne(email: string): User | undefined {
    return this.users.find((user: User) => user.email === email);
  }
}
