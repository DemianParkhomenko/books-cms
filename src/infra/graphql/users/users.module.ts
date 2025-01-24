import { CreateUserUseCase } from '@app/application/books-cms/use-case/create-user';
import { GetUserUseCase } from '@app/application/books-cms/use-case/get-user';
import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';

@Module({
  providers: [UsersResolver, GetUserUseCase, CreateUserUseCase],
})
export class UsersModule {}
