import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateBookInput {
  @Field()
  authorId: string;

  @Field(() => Int)
  publicizedAt: number;

  @Field()
  title: string;
}
