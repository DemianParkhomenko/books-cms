import { UsersService } from '@app/application/services/users.service';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(private userService: UsersService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    console.log('createUserInput.name', createUserInput.name);
    return await this.userService.create(createUserInput);
  }
}
