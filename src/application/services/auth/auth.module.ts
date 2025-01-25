import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from '@app/infra/graphql/auth/auth.resolver';
import { UsersModule } from '../users.module';
import { PassportModule } from '@nestjs/passport';
import { EnvModule } from '@app/infra/env';
import { JwtStrategy } from './jwt.strategy';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [EnvModule, UsersModule, PassportModule],
  providers: [AuthResolver, AuthService, JwtService, JwtStrategy],
})
export class AuthModule {}
