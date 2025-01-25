import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBookInput {
  @Field()
  authorId: string;

  @Field(() => GraphQLISODateTime)
  publicationDate: Date;

  @Field()
  title: string;
}
