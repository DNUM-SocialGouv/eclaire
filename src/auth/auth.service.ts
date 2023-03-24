import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async encryptPassword(password: string): Promise<object> {
    const hash = await argon2.hash(password);
    return { hash: hash };
  }

  async comparePassword(password: string, user: User): Promise<boolean> {
    return await argon2.verify(user.password, password);
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user: User = await this.usersService.findOne(email);
    const isSamePassword = user
      ? await this.comparePassword(pass, user)
      : false;

    if (isSamePassword) {
      const { password, ...result } = user;
      return result;
    }
  }

  async login(user: User) {
    return {
      access_token: this.jwtService.sign({ email: user.email, sub: user.id }),
    };
  }
}
