import { UsersService } from '@app/application/services/users.service';
import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';

@Module({
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
