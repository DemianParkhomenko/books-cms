import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users.service';
import { verifyPassword } from './utils';
import { EnvService } from '@app/infra/env';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private envService: EnvService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      return null;
    }
    const verified = await verifyPassword({
      storedHash: user.password,
      password,
    });
    if (!verified) {
      return null;
    }
    return user;
  }

  async login(user: any) {
    const payload = { sub: user.id };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.envService.get('JWT_SECRET'),
        expiresIn: this.envService.get('JWT_EXPIRES_IN'),
      }),
    };
  }
}
