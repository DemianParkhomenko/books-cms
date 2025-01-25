import { UsersService } from '@app/application/services/users.service';
import { UsersResolver } from '@app/infra/graphql/users/users.resolver';
import { Module } from '@nestjs/common';

@Module({
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
