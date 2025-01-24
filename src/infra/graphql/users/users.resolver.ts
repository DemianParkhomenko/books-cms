import { CreateUserUseCase } from '@app/application/books-cms/use-case/create-user';
import { GetUserUseCase } from '@app/application/books-cms/use-case/get-user';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from '../dto/create-user.input';
import { User } from '../entities/user.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private getUserUseCase: GetUserUseCase,
    private createUserUseCase: CreateUserUseCase,
  ) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.createUserUseCase.execute(createUserInput);
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.getUserUseCase.execute({ id });
  }
}
