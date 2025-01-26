import { Field, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @Length(2, 20)
  name: string;

  @Field(() => String)
  email: string;

  @Length(12, 20)
  @Field(() => String)
  password: string;
}
