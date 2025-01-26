import { AuthService } from '@app/application/services/auth/auth.service';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthInput } from './dto/auth.input';
import { AuthResponse } from './dto/auth.response';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, {
    description: 'Login with email and password',
  })
  async login(@Args('authInput') authInput: AuthInput) {
    const user = await this.authService.validateUser(
      authInput.email,
      authInput.password,
    );
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return this.authService.login(user);
  }
}
